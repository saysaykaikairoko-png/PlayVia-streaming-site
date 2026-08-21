import React, { useState, useEffect, useRef } from "react";
import { Play, Info, Plus, Check, ChevronLeft, ChevronRight, Search, Bell, X, Volume2, VolumeX, Mail, Lock, Eye, EyeOff, LogOut } from "lucide-react";

/* ---------- Fictional catalog (original titles, no real IP) ---------- */

const ROWS = [
  {
    title: "Trending Now",
    items: [
      { id: 1, title: "Obsidian Coast", tag: "Thriller · 2025", grad: "from-slate-900 via-cyan-900 to-slate-950", emoji: "🌊" },
      { id: 2, title: "Paper Kingdoms", tag: "Drama · 2024", grad: "from-amber-900 via-rose-900 to-slate-950", emoji: "📜" },
      { id: 3, title: "Static Bloom", tag: "Sci-Fi · 2026", grad: "from-fuchsia-900 via-indigo-900 to-slate-950", emoji: "🌸" },
      { id: 4, title: "The Long Static", tag: "Horror · 2023", grad: "from-red-950 via-neutral-900 to-black", emoji: "📺" },
      { id: 5, title: "Amber Districts", tag: "Crime · 2025", grad: "from-orange-900 via-stone-900 to-slate-950", emoji: "🏙️" },
      { id: 6, title: "Low Tide Radio", tag: "Mystery · 2024", grad: "from-teal-900 via-slate-900 to-black", emoji: "📻" },
    ],
  },
  {
    title: "Velvet Originals",
    items: [
      { id: 7, title: "Nine Red Rooms", tag: "Limited Series", grad: "from-rose-950 via-red-900 to-black", emoji: "🚪" },
      { id: 8, title: "Cathode", tag: "Sci-Fi · 2026", grad: "from-violet-950 via-purple-900 to-black", emoji: "🖥️" },
      { id: 9, title: "Marrow & Salt", tag: "Drama · 2025", grad: "from-stone-900 via-amber-950 to-black", emoji: "🥀" },
      { id: 10, title: "The Understudy", tag: "Thriller · 2024", grad: "from-indigo-950 via-slate-900 to-black", emoji: "🎭" },
      { id: 11, title: "Bloodhound Ave", tag: "Crime · 2025", grad: "from-red-900 via-stone-950 to-black", emoji: "🔦" },
      { id: 12, title: "Wax & Wane", tag: "Fantasy · 2023", grad: "from-emerald-950 via-slate-900 to-black", emoji: "🕯️" },
    ],
  },
  {
    title: "Because you watched Cathode",
    items: [
      { id: 13, title: "Signal Rot", tag: "Sci-Fi · 2025", grad: "from-cyan-950 via-slate-900 to-black", emoji: "📡" },
      { id: 14, title: "Ghost Bandwidth", tag: "Thriller · 2024", grad: "from-sky-950 via-indigo-950 to-black", emoji: "👻" },
      { id: 15, title: "Analog Hearts", tag: "Romance · 2022", grad: "from-pink-950 via-rose-950 to-black", emoji: "💽" },
      { id: 16, title: "Deep Archive", tag: "Documentary", grad: "from-neutral-800 via-stone-900 to-black", emoji: "🗄️" },
      { id: 17, title: "Static Choir", tag: "Drama · 2026", grad: "from-purple-950 via-fuchsia-950 to-black", emoji: "🎙️" },
      { id: 18, title: "Fallow Season", tag: "Drama · 2023", grad: "from-yellow-950 via-stone-900 to-black", emoji: "🌾" },
    ],
  },
  {
    title: "Late Night Watch",
    items: [
      { id: 19, title: "Nightjar", tag: "Horror · 2025", grad: "from-black via-red-950 to-black", emoji: "🦉" },
      { id: 20, title: "Vacant Hour", tag: "Thriller · 2024", grad: "from-slate-950 via-blue-950 to-black", emoji: "🕰️" },
      { id: 21, title: "Motel Ultraviolet", tag: "Mystery · 2023", grad: "from-violet-950 via-indigo-950 to-black", emoji: "🏨" },
      { id: 22, title: "The Quiet Line", tag: "Drama · 2025", grad: "from-teal-950 via-emerald-950 to-black", emoji: "🎣" },
      { id: 23, title: "Redshift", tag: "Sci-Fi · 2026", grad: "from-rose-950 via-orange-950 to-black", emoji: "🛰️" },
      { id: 24, title: "Hollow Orchard", tag: "Horror · 2022", grad: "from-lime-950 via-stone-900 to-black", emoji: "🍎" },
    ],
  },
];

const HERO = {
  title: "CATHODE",
  tagline: "SEASON 2 · VELVET ORIGINAL",
  desc: "When a dead broadcast signal starts answering back, a night-shift engineer has to decide how much of herself she's willing to lose to find out who's speaking.",
  grad: "from-violet-950 via-purple-950/60 to-transparent",
  emoji: "🖥️",
};

/* ---------- Small helpers ---------- */

function useMyList() {
  const [list, setList] = useState(() => new Set());
  const toggle = (id) =>
    setList((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return [list, toggle];
}

/* ---------- Card ---------- */

function Card({ item, inList, onToggleList, onOpen }) {
  return (
    <div
      className="group relative shrink-0 w-[160px] sm:w-[200px] aspect-[2/3] rounded-md overflow-hidden cursor-pointer
                 transition-transform duration-300 ease-out hover:scale-[1.08] hover:z-20 hover:shadow-2xl hover:shadow-black/80
                 focus-within:scale-[1.08] focus-within:z-20"
      onClick={() => onOpen(item)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.grad} flex items-center justify-center`}>
        <span className="text-5xl opacity-80 select-none">{item.emoji}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-[13px] font-semibold text-white leading-tight mb-1">{item.title}</p>
        <p className="text-[10px] text-neutral-300 mb-1.5">{item.tag}</p>
        <div className="flex items-center gap-1.5">
          <button
            className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80"
            aria-label={`Play ${item.title}`}
            onClick={(e) => { e.stopPropagation(); onOpen(item); }}
          >
            <Play size={11} fill="black" />
          </button>
          <button
            className="w-6 h-6 rounded-full border border-neutral-400 text-white flex items-center justify-center hover:border-white"
            aria-label={inList ? `Remove ${item.title} from My List` : `Add ${item.title} to My List`}
            onClick={(e) => { e.stopPropagation(); onToggleList(item.id); }}
          >
            {inList ? <Check size={11} /> : <Plus size={11} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Row ---------- */

function Row({ row, myList, onToggleList, onOpen }) {
  const scRef = useRef(null);
  const scrollBy = (dir) => {
    if (scRef.current) scRef.current.scrollBy({ left: dir * 700, behavior: "smooth" });
  };
  return (
    <div className="relative mb-8 sm:mb-10">
      <h2 className="text-white text-[15px] sm:text-lg font-semibold mb-2 px-4 sm:px-10">{row.title}</h2>
      <div className="group/row relative">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="hidden sm:flex absolute left-0 top-0 bottom-0 z-30 w-10 items-center justify-center
                     bg-gradient-to-r from-black/70 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>
        <div
          ref={scRef}
          className="flex gap-2 sm:gap-2.5 overflow-x-auto px-4 sm:px-10 pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ scrollbarWidth: "none" }}
        >
          {row.items.map((item) => (
            <Card key={item.id} item={item} inList={myList.has(item.id)} onToggleList={onToggleList} onOpen={onOpen} />
          ))}
        </div>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="hidden sm:flex absolute right-0 top-0 bottom-0 z-30 w-10 items-center justify-center
                     bg-gradient-to-l from-black/70 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="text-white" size={28} />
        </button>
      </div>
    </div>
  );
}

/* ---------- Detail modal ---------- */

function DetailModal({ item, inList, onToggleList, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#141414] w-full sm:max-w-xl sm:rounded-lg overflow-hidden shadow-2xl animate-[fadeIn_.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative h-56 sm:h-72 bg-gradient-to-br ${item.grad} flex items-center justify-center`}>
          <span className="text-7xl opacity-80">{item.emoji}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-white text-black px-4 py-1.5 rounded text-sm font-semibold hover:bg-white/85">
                <Play size={14} fill="black" /> Play
              </button>
              <button
                onClick={() => onToggleList(item.id)}
                className="w-8 h-8 rounded-full border border-neutral-400 text-white flex items-center justify-center hover:border-white bg-black/40"
              >
                {inList ? <Check size={15} /> : <Plus size={15} />}
              </button>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-neutral-300 text-xs mb-2">{item.tag}</p>
          <p className="text-neutral-200 text-sm leading-relaxed">
            A story about {item.title.toLowerCase()} — pulled from the Velvet library. Press play to start watching, or add it to your list for later.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */

function Nav({ solid, email, onLogout }) {
  const [open, setOpen] = useState(false);
  const initial = (email || "M").trim()[0]?.toUpperCase() || "M";
  return (
    <nav className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${solid ? "bg-[#0b0b0b]" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="flex items-center justify-between px-4 sm:px-10 py-3 sm:py-4">
        <div className="flex items-center gap-6 sm:gap-8">
          <span className="text-red-600 font-black text-xl sm:text-2xl tracking-tight">VELVET</span>
          <div className="hidden md:flex items-center gap-5 text-sm text-neutral-200">
            <a className="hover:text-neutral-400 transition-colors" href="#">Home</a>
            <a className="hover:text-neutral-400 transition-colors" href="#">Series</a>
            <a className="hover:text-neutral-400 transition-colors" href="#">Films</a>
            <a className="hover:text-neutral-400 transition-colors" href="#">My List</a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white">
          <Search size={19} className="cursor-pointer hover:text-neutral-400" />
          <Bell size={19} className="hidden sm:block cursor-pointer hover:text-neutral-400" />
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-7 h-7 rounded bg-gradient-to-br from-rose-600 to-violet-700 flex items-center justify-center text-xs font-bold"
              aria-label="Account menu"
            >
              {initial}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-[#141414] border border-neutral-800 rounded shadow-xl overflow-hidden text-sm">
                <div className="px-3 py-2.5 text-neutral-400 text-xs truncate border-b border-neutral-800">{email}</div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-neutral-200 hover:bg-neutral-800/60 transition-colors"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Login / Sign up ---------- */

function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = (e) => {
    e.preventDefault();
    if (!emailValid) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    onLogin(email.trim());
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-black to-black" />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="text-[22rem] opacity-[0.06] select-none">🖥️</span>
      </div>

      <div className="absolute top-0 inset-x-0 px-4 sm:px-10 py-5">
        <span className="text-red-600 font-black text-2xl tracking-tight">VELVET</span>
      </div>

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-sm bg-black/75 border border-neutral-800 rounded-md p-7 sm:p-9"
      >
        <h1 className="text-white text-2xl font-bold mb-6">{mode === "signin" ? "Sign In" : "Create Account"}</h1>

        <div className="space-y-3 mb-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
              className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded pl-9 pr-3 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded pl-9 pr-9 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2.5 rounded text-sm mb-4"
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-neutral-500 text-sm">
          {mode === "signin" ? "New to Velvet? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
            className="text-white hover:underline"
          >
            {mode === "signin" ? "Sign up now" : "Sign in"}
          </button>
        </p>

        <p className="text-neutral-600 text-[11px] mt-5 leading-relaxed">
          This is a UI demo only — nothing you type is sent anywhere or stored outside this browser tab. Don't enter a real password here.
        </p>
      </form>
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero({ onOpen, muted, setMuted }) {
  return (
    <div className="relative h-[62vh] sm:h-[85vh] w-full overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${HERO.grad} bg-black flex items-center justify-center`}>
        <span className="text-[10rem] sm:text-[16rem] opacity-25 select-none">{HERO.emoji}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-16 sm:bottom-24 left-4 sm:left-10 right-4 sm:right-auto sm:max-w-xl">
        <p className="text-red-500 font-bold text-xs sm:text-sm tracking-widest mb-3">{HERO.tagline}</p>
        <h1 className="text-white text-4xl sm:text-6xl font-black tracking-tight mb-4 drop-shadow-lg">{HERO.title}</h1>
        <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-5 drop-shadow-md max-w-md">{HERO.desc}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpen({ ...HERO, id: 0 })}
            className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded font-semibold text-sm sm:text-base hover:bg-white/85 transition-colors"
          >
            <Play size={18} fill="black" /> Play
          </button>
          <button
            onClick={() => onOpen({ ...HERO, id: 0 })}
            className="flex items-center gap-2 bg-neutral-500/40 backdrop-blur text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded font-semibold text-sm sm:text-base hover:bg-neutral-500/60 transition-colors"
          >
            <Info size={18} /> More Info
          </button>
        </div>
      </div>

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-20 sm:bottom-28 right-4 sm:right-10 w-9 h-9 rounded-full border border-neutral-400 text-white flex items-center justify-center hover:border-white bg-black/30"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [muted, setMuted] = useState(true);
  const [myList, toggleList] = useMyList();
  const [user, setUser] = useState(null); // holds email once "signed in"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!user) {
    return <LoginScreen onLogin={(email) => setUser(email)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] font-sans">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <Nav solid={scrolled} email={user} onLogout={() => setUser(null)} />
      <Hero onOpen={setActive} muted={muted}