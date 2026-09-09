import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  Send, 
  Video, 
  Hand, 
  Users, 
  Mic, 
  MicOff, 
  VideoOff, 
  Paperclip, 
  Share2, 
  PenTool, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  School
} from "lucide-react";
import { UserProfile, UserRole } from "../types";

interface CommunicationModuleProps {
  user: UserProfile;
  userRole: UserRole;
}

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
  isTeacher?: boolean;
}

export const CommunicationModule: React.FC<CommunicationModuleProps> = ({
  user,
  userRole,
}) => {
  const [activeChannel, setActiveChannel] = useState<"forum" | "live_class">("forum");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      senderName: "M. Alexandre Dumas",
      senderRole: "Professeur Principal",
      text: "Rappel à toute la classe de 3ème B : le devoir de Mathématiques sur le théorème de Pythagore est à rendre pour vendredi 17h au plus tard.",
      timestamp: "09:00",
      isTeacher: true,
    },
    {
      id: "m2",
      senderName: "Lucas Martin",
      senderRole: "Élève",
      text: "Bonjour monsieur, est-ce qu'on doit rédiger la réciproque même si le triangle n'est pas rectangle ?",
      timestamp: "09:14",
    },
    {
      id: "m3",
      senderName: "M. Alexandre Dumas",
      senderRole: "Professeur Principal",
      text: "Excellente question Lucas. Si l'égalité n'est pas vérifiée, vous appliquez la contraposée pour conclure qu'il n'est pas rectangle !",
      timestamp: "09:20",
      isTeacher: true,
    },
  ]);
  const [newMessageText, setNewMessageText] = useState("");

  // Virtual Classroom Simulator States
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [canvasColor, setCanvasColor] = useState("#4f46e5");

  // Whiteboard Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (activeChannel === "live_class" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
      }
    }
  }, [activeChannel]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: user.name,
      senderRole: userRole === "enseignant" ? "Professeur" : userRole === "parent" ? "Parent" : "Élève",
      text: newMessageText.trim(),
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isTeacher: userRole === "enseignant",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessageText("");
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = canvasColor;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-2">
            <Users size={13} className="text-emerald-400" />
            <span>Collaboration & Espace de Discussion Sécurisé</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Canaux Éducatifs & Classe Virtuelle Interactive
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Échangez avec vos professeurs et camarades, participez aux sessions de direct et résolvez des problèmes en direct sur le tableau blanc.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/15 text-xs">
          <button
            onClick={() => setActiveChannel("forum")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeChannel === "forum" ? "bg-white text-indigo-950 shadow-xs" : "text-indigo-100 hover:text-white"
            }`}
          >
            Forum & Messagerie
          </button>
          <button
            onClick={() => setActiveChannel("live_class")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeChannel === "live_class" ? "bg-white text-indigo-950 shadow-xs" : "text-indigo-100 hover:text-white"
            }`}
          >
            <Video size={13} />
            <span>Classe Virtuelle (Direct)</span>
          </button>
        </div>
      </div>

      {activeChannel === "forum" ? (
        // Forum & Messaging Layout
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-4 min-h-[500px] overflow-hidden">
          {/* Channels Sidebar */}
          <div className="p-4 border-r border-slate-100 bg-slate-50/50 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Canaux de discussion</h3>
            <div className="space-y-1 text-xs">
              <button className="w-full text-left p-2.5 rounded-xl font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                # 3ème B - Général & Devoirs
              </button>
              <button className="w-full text-left p-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100">
                # Mathématiques - Entraide
              </button>
              <button className="w-full text-left p-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100">
                # Histoire-Géo - Débats
              </button>
              <button className="w-full text-left p-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100">
                # Carnet de Correspondance
              </button>
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-3 flex flex-col justify-between">
            {/* Messages Feed */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[420px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl max-w-xl text-xs space-y-1 ${
                    msg.isTeacher
                      ? "bg-indigo-50/70 border border-indigo-200 text-indigo-950 ml-auto"
                      : "bg-slate-50 border border-slate-200 text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-900">{msg.senderName} ({msg.senderRole})</span>
                    <span className="text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Écrire un message à la classe..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Send size={13} />
                <span>Envoyer</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Virtual Classroom Stage (Direct + Interactive Whiteboard)
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Whiteboard and Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 rounded-2xl p-4 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-bold">SESSION EN DIRECT • Mathématiques (3ème B)</span>
                </div>
                <span className="text-slate-400">Enseignant : M. Dumas (24 élèves connectés)</span>
              </div>

              {/* Interactive Canvas Whiteboard */}
              <div className="bg-white rounded-xl overflow-hidden relative shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={320}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-80 cursor-crosshair bg-slate-900 block"
                />

                {/* Canvas controls */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-xs p-1.5 rounded-lg border border-slate-700 text-xs">
                  <button
                    onClick={() => setCanvasColor("#4f46e5")}
                    className={`w-5 h-5 rounded-full bg-indigo-500 ${canvasColor === "#4f46e5" ? "ring-2 ring-white" : ""}`}
                  />
                  <button
                    onClick={() => setCanvasColor("#10b981")}
                    className={`w-5 h-5 rounded-full bg-emerald-500 ${canvasColor === "#10b981" ? "ring-2 ring-white" : ""}`}
                  />
                  <button
                    onClick={() => setCanvasColor("#f59e0b")}
                    className={`w-5 h-5 rounded-full bg-amber-500 ${canvasColor === "#f59e0b" ? "ring-2 ring-white" : ""}`}
                  />
                  <button
                    onClick={clearCanvas}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Effacer le tableau"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-800/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-mono">
                  Tableau partagé : Formule affichée BC² = AB² + AC²
                </div>
              </div>

              {/* Classroom Action Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      isMuted ? "bg-rose-500/20 border-rose-400 text-rose-300" : "bg-white/10 border-white/20 text-white"
                    }`}
                  >
                    {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      !isVideoOn ? "bg-rose-500/20 border-rose-400 text-rose-300" : "bg-white/10 border-white/20 text-white"
                    }`}
                  >
                    {!isVideoOn ? <VideoOff size={16} /> : <Video size={16} />}
                  </button>
                </div>

                {/* Hand raise */}
                <button
                  onClick={() => setIsHandRaised(!isHandRaised)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isHandRaised
                      ? "bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  <Hand size={15} />
                  <span>{isHandRaised ? "Main levée (Prioritaire)" : "Lever la main pour prendre la parole"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live participants and quick stream chat */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-[450px]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Participants Connectés (24)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-50 text-indigo-900 font-bold">
                  <span>M. Alexandre Dumas (Enseignant)</span>
                  <span className="text-[10px] bg-indigo-200 px-1.5 py-0.5 rounded">Hôte</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-700">
                  <span>{user.name} (Vous)</span>
                  {isHandRaised && <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">✋ Main levée</span>}
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-700">
                  <span>Lucas Martin</span>
                  <span className="text-[10px] text-slate-400">Élève</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-700">
                  <span>Inès Belkacem</span>
                  <span className="text-[10px] text-slate-400">Élève</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Chiffrement de bout en bout conforme GAR & RGPD Éducation.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
