from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_core.language_models.chat_models import BaseChatModel

class LLMFactory:

    ANTHROPIC_MODELS = [
        "claude-opus-4-6",
        "claude-sonnet-4-6",
        "claude-haiku-4-5-20251001"
    ]

    OPENAI_MODELS = [
        "gpt-5.4",
        "gpt-5.4-mini",
        "gpt-5.4-nano"
    ]

    @staticmethod
    def determine_llm_provider(
        model: str
    ) -> str:
        if model in LLMFactory.ANTHROPIC_MODELS:
            return "anthropic"
        elif model in LLMFactory.OPENAI_MODELS:
            return "openai"
        else:
            return "unavailable"

    @staticmethod
    def create(
        model: str,
        temperature: float = 0.1,
        max_tokens: int = 16384,
        **kwargs
    ) -> BaseChatModel:
        """
        Factory method to create an LLM instance.

        Args:
            model:       Model name
            temperature: Sampling temperature (0.0 - 1.0)
            max_tokens:  Maximum tokens in the response
            **kwargs:    Additional provider-specific parameters

        Returns:
            A LangChain BaseChatModel instance
        """

        provider = LLMFactory.determine_llm_provider(model)

        if provider == "anthropic":
            return ChatAnthropic(
                model=model,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs
            )

        elif provider == "openai":
            return ChatOpenAI(
                model=model,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs
            )

        else:
            supported = LLMFactory.ANTHROPIC_MODELS + LLMFactory.OPENAI_MODELS
            raise ValueError(f"Unsupported provider: {provider}. Supported: {", ".join(supported)}")