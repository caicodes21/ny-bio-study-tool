import chainlit as cl
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage, ToolMessage
from llm_provider import LLMFactory
from time import sleep
from chainlit.input_widget import Select, Slider, Switch, TextInput
from mcp import ClientSession
from langchain_mcp_adapters.tools import load_mcp_tools

with open("./chainlit-chatbot/prompts/system_prompt.md") as file:
    system_prompt = file.read()

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
                    "claude-haiku-4-5-20251001",
                    "gpt-5.4",
                    "gpt-5.4-mini",
                    "gpt-5.4-nano"
                ],
                initial_value="claude-haiku-4-5-20251001",
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

    await cl.Message(content="Hi, I am a chatbot that helps design biology questions. Feel free to adjust my settings as needed using the ⚙️ icon.").send()
    llm = LLMFactory.create(model=settings["model"], temperature=settings["temperature"])
    cl.user_session.set("llm", llm)
    cl.user_session.set("history", [])
    cl.user_session.set("system_prompt", settings["system_prompt"])

@cl.on_settings_update
async def setup_agent(settings):
    llm = LLMFactory.create(model=settings["model"], temperature=settings["temperature"])
    cl.user_session.set("llm", llm)
    cl.user_session.set("history", [])
    cl.user_session.set("system_prompt", settings["system_prompt"])

@cl.on_message
async def on_message(message: cl.Message):

    if cl.user_session.get("history") == None:
        await cl.Message(content="Hi, I am a chatbot that helps design biology questions. Feel free to adjust my settings as needed using the ⚙️ icon.").send()
        return

    history = cl.user_session.get("history", [])
    history.append(HumanMessage(content=message.content))

    llm = cl.user_session.get("llm")
    mcp_session = cl.user_session.get("mcp_session")
    tools = await load_mcp_tools(mcp_session)
    llm_with_tools = llm.bind_tools(tools)

    msg = cl.Message(content="")
    await msg.send()

    response = await llm_with_tools.ainvoke(
        [SystemMessage(content=cl.user_session.get("system_prompt"))] + history
    )

    while response.tool_calls:
        history.append(response)
        for tool_call in response.tool_calls:
            tool = next(t for t in tools if t.name == tool_call["name"])
            result = await tool.ainvoke(tool_call["args"])
            history.append(ToolMessage(content = str(result), tool_call_id = tool_call["id"]))
        
        response = await llm_with_tools.ainvoke(
            [SystemMessage(content = cl.user_session.get("system_prompt"))] + history
        )

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

@cl.on_mcp_disconnect
async def on_mcp_disconnect(name: str, session: ClientSession):
    """Called when an MCP connection is terminated"""
    pass