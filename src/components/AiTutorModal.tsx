import React, { useState } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  X
} from "lucide-react";
import { Course } from "../types";

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextCourse?: Course | null;
}

interface TutorMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  contextCourse,
}) => {
  if (!isOpen) return null;

  const [tutorMode, setTutorMode] = useState<"socratic" | "analogy" | "quiz">("socratic");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: contextCourse
        ? `Bonjour ! Je suis ton Tuteur Pédagogique personnel. Nous sommes actuellement sur le cours : "${contextCourse.title}". Quelle notion ou quel exercice souhaites-tu explorer ensemble ?`
        : "Bonjour ! Je suis ton Tuteur Pédagogique personnel. Sur quelle matière ou quelle notion souhaites-tu travailler aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: TutorMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText.trim();
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentInput,
          mode: tutorMode,
          context: contextCourse ? `${contextCourse.title} - ${contextCourse.summary}` : undefined,
          subject: contextCourse?.subject || "Général",
        }),
      });
      const data = await res.json();

      const aiMsg: TutorMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.answer || "Voici une piste pour t'aider à progresser : réfléchis à la définition des termes et aux hypothèses de départ.",
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      // Fallback response if network or server error
      const fallbackMsg: TutorMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: `Très bonne question ! En appliquant la méthode socratique : commence par repérer les données connues dans ton énoncé. Que cherches-tu à prouver ou calculer en premier lieu ?`,
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const setQuickQuestion = (q: string) => {
    setInputText(q);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[600px] animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Tuteur Pédagogique Bienveillant</h3>
              <p className="text-[11px] text-indigo-200">
                {contextCourse ? `Contexte : ${contextCourse.title}` : "Accompagnement méthodologique et révision"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Pedagogical Stance Selector */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs overflow-x-auto">
          <span className="text-slate-400 font-medium shrink-0 text-[11px]">Posture :</span>
          <button
            onClick={() => setTutorMode("socratic")}
            className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
              tutorMode === "socratic"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            💡 Socratique (Guider sans donner la solution)
          </button>
          <button
            onClick={() => setTutorMode("analogy")}
            className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
              tutorMode === "analogy"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            🌱 Exemple concret / Analogie simple
          </button>
          <button
            onClick={() => setTutorMode("quiz")}
            className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
              tutorMode === "quiz"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            🎯 Pose-moi une colle
          </button>
        </div>

        {/* Messages Stage */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-xl text-xs ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-[10px] ${
                  msg.sender === "user" ? "bg-indigo-600" : "bg-gradient-to-tr from-violet-600 to-indigo-700"
                }`}
              >
                {msg.sender === "user" ? <User size={13} /> : <Bot size={14} />}
              </div>

              <div
                className={`p-3.5 rounded-2xl space-y-1 ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs"
                }`}
              >
                <div className="leading-relaxed whitespace-pre-line">{msg.text}</div>
                <div
                  className={`text-[9px] text-right ${
                    msg.sender === "user" ? "text-indigo-200" : "text-slate-400"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold p-2">
              <Sparkles size={14} className="animate-spin" />
              <span>Le tuteur formule une explication pédagogique...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <span className="text-slate-400 shrink-0">Suggestions :</span>
          <button
            onClick={() => setQuickQuestion("Comment reconnaître facilement l'hypoténuse dans un triangle ?")}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 font-medium"
          >
            Identifier l'hypoténuse
          </button>
          <button
            onClick={() => setQuickQuestion("Donne-moi une astuce pour mémoriser les équations de photosynthèse.")}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 font-medium"
          >
            Astuce photosynthèse
          </button>
          <button
            onClick={() => setQuickQuestion("Peux-tu me donner un petit exercice avec sa solution cachée ?")}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 font-medium"
          >
            Petit exercice test
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendPrompt} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            required
            placeholder="Pose ta question au Tuteur..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Send size={13} />
            <span>Demander</span>
          </button>
        </form>
      </div>
    </div>
  );
};
