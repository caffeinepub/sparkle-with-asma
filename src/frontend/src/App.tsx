import { motion } from "motion/react";

// ── Floating background decoration helpers ──
const stars = [
  { id: "s1", x: "5%", y: "8%", size: 28, color: "#f9d71c", delay: 0 },
  { id: "s2", x: "15%", y: "22%", size: 18, color: "#f472b6", delay: 0.8 },
  { id: "s3", x: "82%", y: "6%", size: 22, color: "#a78bfa", delay: 1.2 },
  { id: "s4", x: "90%", y: "18%", size: 32, color: "#34d399", delay: 0.4 },
  { id: "s5", x: "70%", y: "30%", size: 16, color: "#fbbf24", delay: 2 },
  { id: "s6", x: "3%", y: "55%", size: 24, color: "#f9a8d4", delay: 1.5 },
  { id: "s7", x: "93%", y: "50%", size: 20, color: "#818cf8", delay: 0.6 },
  { id: "s8", x: "50%", y: "4%", size: 14, color: "#6ee7b7", delay: 1.8 },
  { id: "s9", x: "30%", y: "90%", size: 26, color: "#f472b6", delay: 0.3 },
  { id: "s10", x: "75%", y: "85%", size: 18, color: "#fde68a", delay: 1.1 },
  { id: "s11", x: "60%", y: "92%", size: 22, color: "#c084fc", delay: 2.2 },
  { id: "s12", x: "8%", y: "80%", size: 30, color: "#67e8f9", delay: 0.9 },
];

const clouds = [
  { id: "c1", x: "10%", y: "12%", scale: 1.0, delay: 0 },
  { id: "c2", x: "70%", y: "8%", scale: 0.7, delay: 1 },
  { id: "c3", x: "55%", y: "78%", scale: 0.85, delay: 1.6 },
  { id: "c4", x: "20%", y: "70%", scale: 0.65, delay: 0.5 },
];

function StarIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      role="img"
      aria-label="star"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>star</title>
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        strokeWidth="0"
      />
    </svg>
  );
}

function CloudShape({ scale }: { scale: number }) {
  return (
    <svg
      role="img"
      aria-label="cloud"
      width={120 * scale}
      height={60 * scale}
      viewBox="0 0 120 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>cloud</title>
      <ellipse
        cx="50"
        cy="40"
        rx="40"
        ry="22"
        fill="white"
        fillOpacity="0.55"
      />
      <ellipse
        cx="80"
        cy="38"
        rx="28"
        ry="18"
        fill="white"
        fillOpacity="0.55"
      />
      <ellipse cx="65" cy="32" rx="32" ry="20" fill="white" fillOpacity="0.6" />
      <ellipse cx="35" cy="36" rx="22" ry="16" fill="white" fillOpacity="0.5" />
    </svg>
  );
}

// ── Section Card Icons ──
function BookIcon() {
  return (
    <svg
      role="img"
      aria-label="magic open book with stars"
      width="90"
      height="90"
      viewBox="0 0 90 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>magic open book with stars</title>
      <rect x="8" y="20" width="74" height="55" rx="6" fill="#fff0e6" />
      <rect x="8" y="20" width="36" height="55" rx="6" fill="#ffd6c4" />
      <rect x="43" y="20" width="39" height="55" rx="6" fill="#ffe8d6" />
      <rect x="40" y="20" width="6" height="55" rx="3" fill="#c97d4e" />
      <rect
        x="8"
        y="20"
        width="74"
        height="55"
        rx="6"
        fill="none"
        stroke="#c97d4e"
        strokeWidth="2"
      />
      <text x="18" y="15" fontSize="14" fill="#f9d71c">
        ✨
      </text>
      <text x="52" y="10" fontSize="18" fill="#f9d71c">
        ⭐
      </text>
      <text x="65" y="16" fontSize="12" fill="#f472b6">
        ✦
      </text>
      <text x="35" y="12" fontSize="10" fill="#a78bfa">
        ✦
      </text>
      <line
        x1="16"
        y1="36"
        x2="36"
        y2="36"
        stroke="#c97d4e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="44"
        x2="36"
        y2="44"
        stroke="#c97d4e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="52"
        x2="36"
        y2="52"
        stroke="#c97d4e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="51"
        y1="36"
        x2="73"
        y2="36"
        stroke="#c97d4e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="51"
        y1="44"
        x2="73"
        y2="44"
        stroke="#c97d4e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="51"
        y1="52"
        x2="73"
        y2="52"
        stroke="#c97d4e"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg
      role="img"
      aria-label="colorful artist palette with brush"
      width="90"
      height="90"
      viewBox="0 0 90 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>colorful artist palette with brush</title>
      <ellipse
        cx="42"
        cy="50"
        rx="34"
        ry="30"
        fill="#f5e6c8"
        stroke="#b8860b"
        strokeWidth="2"
      />
      <circle cx="52" cy="62" r="7" fill="white" />
      <circle cx="22" cy="42" r="7" fill="#ef4444" />
      <circle cx="34" cy="28" r="7" fill="#f97316" />
      <circle cx="50" cy="24" r="7" fill="#eab308" />
      <circle cx="63" cy="32" r="7" fill="#22c55e" />
      <circle cx="68" cy="46" r="7" fill="#3b82f6" />
      <rect
        x="60"
        y="12"
        width="6"
        height="32"
        rx="3"
        fill="#92400e"
        transform="rotate(35,63,28)"
      />
      <ellipse
        cx="72"
        cy="14"
        rx="4"
        ry="8"
        fill="#a16207"
        transform="rotate(35,72,18)"
      />
      <ellipse
        cx="74"
        cy="8"
        rx="3"
        ry="6"
        fill="#ef4444"
        transform="rotate(35,74,11)"
      />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg
      role="img"
      aria-label="musical note and piano keys"
      width="90"
      height="90"
      viewBox="0 0 90 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>musical note and piano keys</title>
      <rect x="38" y="12" width="8" height="36" rx="4" fill="#7c3aed" />
      <rect x="38" y="12" width="22" height="7" rx="3" fill="#7c3aed" />
      <ellipse
        cx="34"
        cy="50"
        rx="10"
        ry="7"
        fill="#7c3aed"
        transform="rotate(-15,34,50)"
      />
      <rect x="62" y="22" width="5" height="20" rx="2.5" fill="#a855f7" />
      <ellipse
        cx="59"
        cy="43"
        rx="6"
        ry="4.5"
        fill="#a855f7"
        transform="rotate(-15,59,43)"
      />
      <rect x="10" y="64" width="72" height="20" rx="4" fill="#1e1b4b" />
      <rect x="14" y="64" width="10" height="14" rx="2" fill="white" />
      <rect x="26" y="64" width="10" height="14" rx="2" fill="white" />
      <rect x="38" y="64" width="10" height="14" rx="2" fill="white" />
      <rect x="50" y="64" width="10" height="14" rx="2" fill="white" />
      <rect x="62" y="64" width="10" height="14" rx="2" fill="white" />
      <rect x="21" y="64" width="7" height="9" rx="2" fill="#1e1b4b" />
      <rect x="33" y="64" width="7" height="9" rx="2" fill="#1e1b4b" />
      <rect x="45" y="64" width="7" height="9" rx="2" fill="#1e1b4b" />
      <rect x="57" y="64" width="7" height="9" rx="2" fill="#1e1b4b" />
    </svg>
  );
}

// ── Main App ──
export default function App() {
  return (
    <div className="relative min-h-screen sparkle-bg overflow-hidden">
      {/* Floating background stars */}
      {stars.map((star, i) => (
        <div
          key={star.id}
          className="absolute pointer-events-none"
          style={{
            left: star.x,
            top: star.y,
            animation: `float ${3.5 + (i % 3) * 1.2}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <StarIcon size={star.size} color={star.color} />
        </div>
      ))}

      {/* Floating clouds */}
      {clouds.map((cloud, i) => (
        <div
          key={cloud.id}
          className="absolute pointer-events-none"
          style={{
            left: cloud.x,
            top: cloud.y,
            animation: `cloud-drift ${7 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <CloudShape scale={cloud.scale} />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-10 md:py-16">
        {/* Character + Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center mb-8 md:mb-12"
        >
          {/* Character image */}
          <div className="animate-hero-bob mb-2">
            <img
              src="/assets/generated/asma-character-transparent.dim_200x280.png"
              alt="Asma sparkle character"
              className="w-32 h-auto md:w-44 drop-shadow-xl"
            />
          </div>

          {/* Sparkle decoration */}
          <div className="animate-sparkle-pulse text-4xl md:text-5xl mb-1 select-none">
            ✨
          </div>

          {/* English title */}
          <h1
            className="gradient-text-sparkle text-3xl md:text-5xl font-black text-center leading-tight px-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Welcome to Sparkle with Asma!
          </h1>

          {/* Arabic title */}
          <h2
            className="gradient-text-sparkle text-2xl md:text-4xl font-black text-center leading-tight px-4 mt-1"
            dir="rtl"
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            أهلاً بكِ في تألق مع أسماء!
          </h2>

          <p
            className="text-fuchsia-600 font-bold text-lg md:text-xl mt-3 text-center"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🌟 Let&apos;s play, create &amp; explore! 🌟
          </p>
        </motion.div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl">
          {/* Stories Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <button
              type="button"
              data-ocid="stories.card"
              className="card-stories w-full rounded-3xl p-8 md:p-10 flex flex-col items-center cursor-pointer transition-all duration-200 select-none"
            >
              <div className="mb-4 drop-shadow-lg">
                <BookIcon />
              </div>
              <span
                className="text-2xl font-black text-rose-700 mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Stories
              </span>
              <span
                className="text-xl font-black text-rose-600"
                dir="rtl"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                القصص
              </span>
              <div className="mt-3 text-3xl animate-sparkle-pulse">📖</div>
            </button>
          </motion.div>

          {/* Draw Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          >
            <button
              type="button"
              data-ocid="draw.card"
              className="card-draw w-full rounded-3xl p-8 md:p-10 flex flex-col items-center cursor-pointer transition-all duration-200 select-none"
            >
              <div className="mb-4 drop-shadow-lg">
                <PaletteIcon />
              </div>
              <span
                className="text-2xl font-black text-emerald-800 mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Draw
              </span>
              <span
                className="text-xl font-black text-emerald-700"
                dir="rtl"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                الرسم
              </span>
              <div
                className="mt-3 text-3xl animate-sparkle-pulse"
                style={{ animationDelay: "0.4s" }}
              >
                🎨
              </div>
            </button>
          </motion.div>

          {/* Music Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <button
              type="button"
              data-ocid="music.card"
              className="card-music w-full rounded-3xl p-8 md:p-10 flex flex-col items-center cursor-pointer transition-all duration-200 select-none"
            >
              <div className="mb-4 drop-shadow-lg">
                <MusicIcon />
              </div>
              <span
                className="text-2xl font-black text-violet-800 mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Music
              </span>
              <span
                className="text-xl font-black text-violet-700"
                dir="rtl"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                الموسيقى
              </span>
              <div
                className="mt-3 text-3xl animate-sparkle-pulse"
                style={{ animationDelay: "0.8s" }}
              >
                🎵
              </div>
            </button>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 text-center">
          <p className="text-purple-500 font-bold text-sm">
            © {new Date().getFullYear()}. Built with{" "}
            <span className="text-rose-500">❤️</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-700 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
