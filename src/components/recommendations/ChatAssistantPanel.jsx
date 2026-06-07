import { useEffect, useMemo, useRef, useState } from "react";
import { parseAssistantIntent } from "../../utils/parseAssistantIntent";
import { buildResultAwareAssistantReply } from "../../utils/buildResultAwareAssistantReply";
import { buildNextStepSuggestions } from "../../utils/buildNextStepSuggestions";

function ChatBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-violet-500 text-white"
            : "border border-white/10 bg-white/[0.04] text-zinc-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function ChatAssistantPanel({
  filters,
  flowMemory,
  onCopilotAction,
  loading,
  resultCount,
  topRecommendation,
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I can refine this flow conversationally. Try asking for something more relaxing, more energizing, broader, stronger, or closer to your usual taste.",
    },
  ]);

  const pendingActionRef = useRef(null);

  const endRef = useRef(null);

  const suggestions = useMemo(() => {
    return [
      "Make this more relaxing",
      "Show something more energizing",
      "Broaden the results",
      "Use my usual taste",
    ];
  }, []);

  const nextSuggestions = useMemo(() => {
    return buildNextStepSuggestions(filters);
  }, [filters]);

  function handleAction(action) {
    if (!action) return null;
    return onCopilotAction?.(action);
  }

  function handleSend(nextText) {
    const text = String(nextText ?? input).trim();
    if (!text) return;

    const parsed = parseAssistantIntent(text, filters, flowMemory);

    setMessages((prev) => [
        ...prev,
        { role: "user", text },
        {
            role: "assistant",
            text: parsed.action
            ? `${parsed.reply} Got it — updating your flow now.`
            : parsed.reply,
        },
    ]);

    if (parsed.action) {
        setMessages((prev) => [
            ...prev,
            { role: "assistant", text: "Got it — updating your flow..." },
        ]);

        pendingActionRef.current = {
            beforeCount: resultCount,
            beforeTop: topRecommendation,
        };

        const actionResult = handleAction(parsed.action);

        pendingActionRef.current = {
            ...pendingActionRef.current,
            actionResult,
    };
}

    setInput("");
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (loading) return;
    if (!pendingActionRef.current) return;

    const { beforeCount, beforeTop, actionResult } = pendingActionRef.current;

    const followUp = buildResultAwareAssistantReply({
      beforeCount,
      afterCount: resultCount,
      beforeTop,
      afterTop: topRecommendation,
      actionResult,
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: followUp },
    ]);

    pendingActionRef.current = null;
  }, [loading, resultCount, topRecommendation]);

  return (
    <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
            FlowTerp Assistant
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Refine your flow by chat
          </h2>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {messages.map((message, index) => (
          <ChatBubble
            key={`${message.role}-${index}`}
            role={message.role}
            text={message.text}
          />
        ))}
      </div>

      <div ref={endRef} />

      <div className="mt-4 flex flex-wrap gap-2">
        {nextSuggestions.map((suggestion) => (
            <button
            key={suggestion}
            type="button"
            onClick={() => handleSend(suggestion)}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/[0.08]"
            >
            {suggestion}
            </button>
        ))}
     </div>

      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask for a different vibe, stronger THC, broader results..."
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          className="rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          Send
        </button>
      </div>
    </section>
  );
}