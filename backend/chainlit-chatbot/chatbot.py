import chainlit as cl
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage, ToolMessage
from llm_provider import LLMFactory
from time import sleep
from chainlit.input_widget import Select, Slider, Switch, TextInput
from mcp import ClientSession
from langchain_mcp_adapters.tools import load_mcp_tools

def read_prompt(filepath):
    with open(filepath) as file:
        prompt = file.read()
    return prompt

system_prompt = read_prompt("./chainlit-chatbot/prompts/system_prompt.md")
cluster_prompt = read_prompt("./chainlit-chatbot/prompts/cluster_prompt.md")
general_review_prompt = read_prompt("./chainlit-chatbot/prompts/general_review_prompt.md")

greeting_message = "Hi, I am a chatbot that helps design general review questions or cluster questions. Feel free to adjust my settings as needed using the ⚙️ icon."

cl_actions = [
    cl.Action(name="make_questions", payload={"type": "general_review"}, icon="badge-question-mark", label="General Review", tooltip="Click to start making general review questions"),
    cl.Action(name="make_questions", payload={"type": "cluster"}, icon="notebook-pen", label="Cluster", tooltip="Click to start making cluster questions")
]

@cl.action_callback("make_questions")
async def on_general_review_action(action):

    question_type = action.payload.get("type")
    history = cl.user_session.get("history", [])

    if question_type == "general_review":
        msg = "I want to make general review questions. What do you need to get started?"
        history.append(HumanMessage(content=general_review_prompt))
    else:
        msg = "I want to make cluster questions. What do you need to get started?"
        history.append(HumanMessage(content=cluster_prompt))

    cl.user_session.set("history", history)
    user_msg = cl.Message(content=msg, type="user_message")
    await user_msg.send()
    await on_message(user_msg)
    await action.remove()


@cl.on_chat_start
async def on_chat_start():

    settings = await cl.ChatSettings(
        [
            Select(
                id="model",
                label="Model",
                values=[
                    "claude-opus-4-6",
                    "claude-sonnet-4-6",
                    "gpt-5.4"
                ],
                initial_value="claude-sonnet-4-6",
            ),
            Slider(
                id="temperature", 
                label="Temperature", 
                min=0, 
                max=1, 
                step=0.1, 
                initial=0.1
            ),
            TextInput(
                id="system_prompt", 
                label="System Prompt", 
                initial=system_prompt
            )
        ]
    ).send()

    await cl.Message(content=greeting_message, actions=cl_actions).send()
    llm = LLMFactory.create(model=settings["model"], temperature=settings["temperature"])
    cl.user_session.set("llm", llm)
    cl.user_session.set("history", [SystemMessage(content=settings["system_prompt"]), AIMessage(content=greeting_message)])
    cl.user_session.set("system_prompt", settings["system_prompt"])



@cl.on_settings_update
async def setup_agent(settings):
    for msg in cl.chat_context.get():
        await msg.remove()

    llm = LLMFactory.create(model=settings["model"], temperature=settings["temperature"])
    cl.user_session.set("llm", llm)
    cl.user_session.set("history", [SystemMessage(content=settings["system_prompt"]), AIMessage(content=greeting_message)])
    cl.user_session.set("system_prompt", settings["system_prompt"])
    await cl.Message(content=greeting_message, actions=cl_actions).send()


@cl.on_message
async def on_message(message: cl.Message):

    history = cl.user_session.get("history", [])

    if len(history) == 0:
        history.extend([SystemMessage(content=cl.user_session.get("system_prompt")), AIMessage(content=greeting_message)])
        cl.user_session.set("history", history)

    history.append(HumanMessage(content=message.content))

    msg = cl.Message(content="")
    await msg.send()

    llm = cl.user_session.get("llm")
    mcp_session = cl.user_session.get("mcp_session")

    if mcp_session is not None:
        tools = await load_mcp_tools(mcp_session)
        llm_with_tools = llm.bind_tools(tools)

        response = await llm_with_tools.ainvoke(history)

        while response.tool_calls:
            history.append(response)
            for tool_call in response.tool_calls:
                tool = next(t for t in tools if t.name == tool_call["name"])
                result = await tool.ainvoke(tool_call["args"])
                history.append(ToolMessage(content = str(result), tool_call_id = tool_call["id"]))
            
            response = await llm_with_tools.ainvoke(history)
    
    else:
        response = await llm.ainvoke(history)

    response_content = response.content
    for chunk in list(response_content):
        await msg.stream_token(chunk)
        sleep(0.01)
    
    await msg.update()

    history.append(AIMessage(content=response_content))
    cl.user_session.set("history", history)


@cl.on_mcp_connect
async def on_mcp_connect(connection, session: ClientSession):
    """Called when an MCP connection is established"""

    result = await session.list_tools()
    
    tools = [{
        "name": t.name,
        "description": t.description,
        "input_schema": t.inputSchema,
    } for t in result.tools]
    
    mcp_tools = cl.user_session.get("mcp_tools", {})
    mcp_tools[connection.name] = tools
    cl.user_session.set("mcp_tools", mcp_tools)
    cl.user_session.set("mcp_session", session)
