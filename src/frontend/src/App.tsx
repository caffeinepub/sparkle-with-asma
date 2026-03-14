import type { Story } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { Loader2, Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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

// ── Color theme mapping ──
const themeMap: Record<string, { bg: string; accent: string }> = {
  sky: { bg: "from-sky-100 to-blue-200", accent: "#3b82f6" },
  amber: { bg: "from-amber-100 to-orange-200", accent: "#f97316" },
  fuchsia: { bg: "from-fuchsia-100 to-purple-200", accent: "#a855f7" },
  emerald: { bg: "from-emerald-100 to-green-200", accent: "#10b981" },
  violet: { bg: "from-violet-100 to-purple-200", accent: "#7c3aed" },
};

function getTheme(colorTheme: string) {
  return themeMap[colorTheme] ?? themeMap.sky;
}

// ── Sample seed stories ──
const SEED_STORIES = [
  {
    title: "The Lion and the Bull",
    titleAr: "الأسد والثور",
    emoji: "🦁",
    colorTheme: "amber",
    body: "Once upon a time, in a vast green jungle, there lived a mighty lion and a strong bull. They became the best of friends and ruled the jungle together with wisdom and kindness. But one day, a cunning fox tried to turn them against each other with lies and tricks. The lion and the bull listened patiently, then they discovered the fox's deception. Their friendship grew even stronger, and peace returned to the jungle forever.",
    bodyAr:
      "في زمن بعيد، في غابة خضراء واسعة تتلألأ فيها أشعة الشمس بين الأشجار، عاش أسد قوي يُدعى شاه يكون الملك. كان قلبه طيباً ويحب السلام. وفي اليوم نفسه، جاء إلى الغابة ثور شجاع يُدعى شتربة، كان قوياً وأميناً.\n\nالتقى الأسد والثور عند نهر الغابة الكبير، وتبادلا التحية وتكلما طويلاً. وجدا أنهما يشتركان في حب الحكمة والعدل، فأصبحا صديقين حميمين يحكمان الغابة معاً بحكمة ولطف.\n\nلكن في يوم ما، جاء ابن آوى الماكر والمكار يُدعى دمنة. كان يغار من صداقة الأسد والثور، فقرر أن يفرق بينهما. ذهب إلى الأسد وقال له بصوت خافت: يا مولاي، سمعت الثور يقول إنه سيأخذ عرشك! ثم ذهب إلى الثور وقال: يا صديقي، الأسد يريد أذاك!\n\nقلق الأسد والثور وأصبح كل منهما يشك في الآخر. لكنهما كانا حكيمين، فجلسا معاً وتحدثا بصراحة ومحبة. اكتشفا خداع دمنة وكذبه. ضحكا على الخداع وأصبحت صداقتهما أقوى وأعمق من قبل. وعاشا وسائر حيوانات الغابة في سلام وسعادة.",
  },
  {
    title: "The Pigeon with the Necklace",
    titleAr: "الحمامة المطوقة",
    emoji: "🕊️",
    colorTheme: "sky",
    body: "A beautiful pigeon with a golden necklace lived near a clear river. One day, an ant fell into the water and was about to drown. The kind pigeon quickly dropped a leaf so the ant could climb to safety. Days later, a hunter aimed his bow at the pigeon. The little ant, remembering the pigeon's kindness, bit the hunter's foot just in time. The pigeon flew free, and the two became lifelong friends.",
    bodyAr:
      'زَعَموا أَنَّهُ كانَ بِأَرضِ كَذا مَكانٌ كَثيرُ الصَّيدِ، يَتَرَدَّدُ عَلَيْهِ القانِصون، وَكانَ في ذَلِكَ المَكانِ شَجَرَةٌ كَثيرَةُ الأَغصانِ، فيها عُشُّ غُرابٍ.\n\nفَبَينا الغُرابُ ذاتَ يَومٍ في عُشِّهِ، إِذ بَصُرَ بِصَيّادٍ قَبيحِ المَنظَرِ، قَد نَصَبَ شَبَكَتَهُ وَنَثَرَ فيها الحَبَّ. فَلَم يَلْبَث إِلّا قَليلاً حَتّى مَرَّت بِهِ حَمامَةٌ يُقالُ لَها "المُطَوَّقَةُ"، وَكانَت سَيِّدَةَ الحَمامِ، وَمَعَها حَمامٌ كَثيرٌ.\n\nعَمِيَت المُطَوَّقَةُ وَصاحِباتُها عَنِ الشَّبَكَةِ، فَوَقَعنَ عَلى الحَبِّ يَلْتَقِطنَهُ، فَأَطبَقَت عَلَيْهِنَّ الشَّبَكَةُ. فَجَعَلَت كُلُّ حَمامَةٍ تَتَلَجْلَجُ في حبالها وَتَلْتَمِسُ الخَلاصَ لِنَفْسِها.\n\n【قالَت المُطَوَّقَةُ: "لا تَخْذُلنَ في المُحاوَلَةِ، وَلا تَكُن نَفْسُ إِحداكُنَّ أَهَمَّ إِلَيْها مِن نَفْسِ صاحِبَتِها!"】\n\nقالَت المُطَوَّقَةُ: "تَعاوَنَّ جَميعاً وَطِرنَ كَطائِرٍ واحِدٍ، فَيَنْجو بَعضُكُنَّ بِبَعضٍ". فَفَعَلنَ ذَلِكَ، فَقَلَعنَ الشَّبَكَةَ وَعَلَونَ بِها في الجَوِّ.\n\nوهكذا بفضل التعاون والحكمة، نجت الحمامة المطوقة وصاحباتها من خطر الصياد.',
  },
  {
    title: "The Clever Rabbit",
    titleAr: "الأرنب الذكي",
    emoji: "🐰",
    colorTheme: "emerald",
    body: 'In a sunny meadow, a clever little rabbit outwitted the big grumpy wolf every single day. When the wolf said "I will catch you!", the rabbit would laugh and say "Not today!" One day, the rabbit showed the wolf his reflection in the pond. The wolf thought it was another wolf and ran away scared, never to bother the meadow animals again. All the animals celebrated with the clever rabbit!',
    bodyAr:
      "في مرج مشمس مليء بالزهور الملوّنة والعشب الأخضر الطري، كان يعيش أرنب صغير ذو أذنين طويلتين وعيون لامعة. كان يُعرف بين أصدقائه بذكائه وخفة حيلته.\n\nكان في الغابة القريبة ذئب كبير غاضب دائم المزاج. كان يزعج الحيوانات ويخيفها كل يوم. أكثر ما يضايقه هو الأرنب الصغير الذكي الذي لم يستطع يوماً أن يمسك به. كل يوم كان يقول بصوت غليظ: أيها الأرنب الصغير! سأمسك بك اليوم ولا مفر! فيضحك الأرنب ويقفز ويقول: ليس اليوم يا ذئب، ربما غداً! وكان يختفي بين الأعشاب.\n\nذات يوم، جاء الذئب وهو أكثر غضباً من المعتاد. كان الأرنب يفكر بسرعة، ثم رأى بركة ماء صافية تعكس الأشجار والسماء كمرآة. ابتسم الأرنب وقال: تعال يا ذئب، سأريك شيئاً مثيراً!\n\nأخذ الأرنب الذئب إلى حافة البركة وقال: انظر! هناك ذئب آخر في الماء يريد أن ينافسك ويأخذ غابتك! نظر الذئب في الماء فرأى انعكاسه. نبح الذئب فرأى الذئب في الماء ينبح معه. أصابه الهلع وهرب بسرعة البرق ولم يعد إلى المرج أبداً.\n\nضحك الأرنب حتى كاد يسقط، ثم نادى أصدقاءه. احتفلوا جميعاً وقفزوا من الفرح. وعاشوا جميعاً في المرج بسعادة وأمان.",
  },
];

const EMPTY_FORM = {
  title: "",
  titleAr: "",
  body: "",
  bodyAr: "",
  emoji: "📖",
  colorTheme: "sky",
};

// ── Icons ──
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

function CloudStoryIcon() {
  return (
    <svg
      role="img"
      aria-label="magic cloud"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>magic cloud</title>
      <ellipse
        cx="27"
        cy="34"
        rx="20"
        ry="6"
        fill="#93c5fd"
        fillOpacity="0.35"
      />
      <ellipse cx="22" cy="26" rx="14" ry="10" fill="url(#cloudGradS)" />
      <ellipse cx="32" cy="24" rx="10" ry="8" fill="url(#cloudGradS)" />
      <ellipse cx="18" cy="30" rx="10" ry="7" fill="url(#cloudGradS)" />
      <ellipse cx="28" cy="30" rx="12" ry="7" fill="url(#cloudGradS)" />
      <ellipse cx="20" cy="22" rx="5" ry="3" fill="white" fillOpacity="0.55" />
      <line
        x1="18"
        y1="38"
        x2="16"
        y2="44"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="39"
        x2="23"
        y2="45"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="38"
        x2="30"
        y2="44"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="44" cy="12" r="2" fill="#fde68a" />
      <circle cx="8" cy="14" r="1.5" fill="#fde68a" />
      <circle cx="46" cy="20" r="1.5" fill="#fbbf24" />
      <defs>
        <linearGradient id="cloudGradS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LionStoryIcon() {
  return (
    <svg
      role="img"
      aria-label="counting lion"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>counting lion</title>
      <ellipse
        cx="27"
        cy="48"
        rx="14"
        ry="4"
        fill="#fbbf24"
        fillOpacity="0.3"
      />
      <circle cx="27" cy="26" r="18" fill="url(#maneGradS)" />
      <circle cx="27" cy="26" r="13" fill="url(#faceGradS)" />
      <ellipse cx="23" cy="20" rx="5" ry="3" fill="white" fillOpacity="0.4" />
      <circle cx="22" cy="24" r="2.5" fill="white" />
      <circle cx="32" cy="24" r="2.5" fill="white" />
      <circle cx="23" cy="24" r="1.3" fill="#1e1b4b" />
      <circle cx="33" cy="24" r="1.3" fill="#1e1b4b" />
      <circle cx="23.5" cy="23.5" r="0.5" fill="white" />
      <circle cx="33.5" cy="23.5" r="0.5" fill="white" />
      <ellipse cx="27" cy="29" rx="2.5" ry="1.5" fill="#f97316" />
      <path
        d="M23 32 Q27 36 31 32"
        fill="none"
        stroke="#92400e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="29"
        x2="23"
        y2="30"
        stroke="#92400e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="32"
        x2="23"
        y2="31"
        stroke="#92400e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="31"
        y1="30"
        x2="40"
        y2="29"
        stroke="#92400e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="31"
        y1="31"
        x2="40"
        y2="32"
        stroke="#92400e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="5" fill="#f59e0b" />
      <circle cx="40" cy="14" r="5" fill="#f59e0b" />
      <circle cx="14" cy="14" r="2.5" fill="#fde68a" />
      <circle cx="40" cy="14" r="2.5" fill="#fde68a" />
      <defs>
        <radialGradient id="maneGradS" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="faceGradS" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function FishStoryIcon() {
  return (
    <svg
      role="img"
      aria-label="rainbow fish"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>rainbow fish</title>
      <ellipse
        cx="27"
        cy="46"
        rx="16"
        ry="4"
        fill="#67e8f9"
        fillOpacity="0.3"
      />
      <polygon points="6,18 6,36 18,27" fill="url(#tailGradS)" />
      <ellipse cx="32" cy="27" rx="18" ry="12" fill="url(#fishGradS)" />
      <ellipse
        cx="26"
        cy="24"
        rx="5"
        ry="3.5"
        fill="#f472b6"
        fillOpacity="0.7"
      />
      <ellipse
        cx="32"
        cy="22"
        rx="5"
        ry="3.5"
        fill="#a78bfa"
        fillOpacity="0.7"
      />
      <ellipse
        cx="38"
        cy="24"
        rx="5"
        ry="3.5"
        fill="#34d399"
        fillOpacity="0.7"
      />
      <ellipse
        cx="26"
        cy="30"
        rx="5"
        ry="3.5"
        fill="#fbbf24"
        fillOpacity="0.7"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="5"
        ry="3.5"
        fill="#f97316"
        fillOpacity="0.7"
      />
      <polygon points="30,15 36,15 33,22" fill="#67e8f9" />
      <circle cx="44" cy="24" r="4" fill="white" />
      <circle cx="45" cy="24" r="2" fill="#1e1b4b" />
      <circle cx="45.5" cy="23" r="0.8" fill="white" />
      <path
        d="M48 27 Q50 30 48 32"
        fill="none"
        stroke="#0e7490"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 10 Q27 0 44 10"
        fill="none"
        stroke="#f472b6"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M12 13 Q27 4 42 13"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M14 16 Q27 8 40 16"
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="fishGradS" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="tailGradS" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function getStoryIcon(idx: number) {
  if (idx % 3 === 0) return <CloudStoryIcon />;
  if (idx % 3 === 1) return <LionStoryIcon />;
  return <FishStoryIcon />;
}

// ── Reading Progress Tree Component ──
function ReadingProgressTree({
  completedCount,
  quizCompletedCount,
}: { completedCount: number; quizCompletedCount: number }) {
  const leaves = Array.from({ length: completedCount }, (_, i) => i);
  const quizLeaves = Array.from({ length: quizCompletedCount }, (_, i) => i);

  // Speech bubble messages based on progress
  const getMessages = () => {
    const msgs: string[] = [];
    if (completedCount === 0) {
      msgs.push("مرحباً يا بطل! 🌱 اقرأ قصة لتنمو أوراقي!");
      msgs.push("أنا شجرتك المفضلة… أنتظر أول ورقة منك! 🌿");
    } else if (completedCount === 1) {
      msgs.push("أحسنتَ يا صديقي! 🍃 ورقتك الأولى أضاءت فروعي!");
      msgs.push("هيّا، قصة أخرى تجعلني أكبر وأجمل! 🌳");
    } else if (completedCount === 2) {
      msgs.push("رائع يا صديقي! 🌿 أنا أكبر معك كلما قرأتَ!");
      msgs.push("نحن معاً نبني غابة من الكلمات! 📚");
    } else {
      msgs.push("يا لكَ من قارئ مميز! 🌳 فخور بكَ جداً!");
      msgs.push("أنتَ نجم القراءة ⭐ استمر هكذا!");
    }
    if (quizCompletedCount > 0) {
      msgs.push("⭐ أجبتَ على أسئلة القبعات! عبقري حقيقي!");
    }
    return msgs;
  };

  const messages = getMessages();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [messages.length]);

  const currentMsg = messages[msgIndex % messages.length];

  return (
    <motion.div
      data-ocid="home.progress_tree"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto mb-8"
    >
      <div
        className="rounded-3xl shadow-xl border-2 border-green-200 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #d1fae5 100%)",
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-3 text-center">
          <h3
            className="text-xl font-black text-white drop-shadow"
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            شجرة القراءة 🌳
          </h3>
        </div>

        {/* Speech Bubble */}
        <div
          className="flex flex-col items-center px-5 pt-4 pb-0"
          data-ocid="tree.speech_bubble"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMsg}
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative bg-white border-2 border-emerald-300 rounded-2xl px-4 py-2.5 shadow-md max-w-[260px] text-center"
              >
                <p
                  className="text-emerald-800 font-black text-base leading-snug"
                  dir="rtl"
                  style={{ fontFamily: "'Tajawal', sans-serif" }}
                >
                  {currentMsg}
                </p>
              </motion.div>
              {/* Bubble tail pointing down toward tree */}
              <div
                className="mx-auto"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "12px solid #6ee7b7",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "-1px",
                }}
              />
              <div
                className="mx-auto"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "10px solid white",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-22px)",
                  marginBottom: "-12px",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tree art */}
        <div className="flex flex-col items-center px-6 pt-3 pb-2">
          {completedCount === 0 ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-5xl">🌱</div>
              <p
                className="text-emerald-700 font-bold text-base text-center mt-1"
                dir="rtl"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                ابدأ رحلتك مع القراءة!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-1 w-full">
              {/* Leaves arranged around tree */}
              <div className="relative flex flex-col items-center">
                {/* Top crown of leaves */}
                <div className="flex flex-wrap justify-center gap-1 mb-1 max-w-[200px]">
                  {leaves.map((i) => (
                    <motion.span
                      key={`green-${i}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.15,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-2xl select-none"
                      style={{ display: "inline-block" }}
                      title="قصة مكتملة"
                    >
                      🍃
                    </motion.span>
                  ))}
                  {quizLeaves.map((i) => (
                    <motion.span
                      key={`gold-${i}`}
                      initial={{ scale: 0, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: completedCount * 0.15 + i * 0.2,
                        type: "spring",
                        stiffness: 180,
                      }}
                      className="text-2xl select-none"
                      style={{
                        display: "inline-block",
                        filter:
                          "sepia(1) saturate(5) hue-rotate(15deg) brightness(1.1)",
                      }}
                      title="اختبار مكتمل"
                    >
                      🍃
                    </motion.span>
                  ))}
                </div>
                {/* Tree trunk */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-6 rounded-t-sm"
                    style={{
                      height: Math.max(24, 16 + completedCount * 4),
                      background:
                        "linear-gradient(180deg, #92400e 0%, #78350f 100%)",
                    }}
                  />
                  <div
                    className="w-12 h-3 rounded-b-xl"
                    style={{ background: "#78350f" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Count badge */}
          <div className="mt-3 mb-2 flex flex-col items-center gap-1">
            <span
              className="inline-block bg-white/80 border-2 border-emerald-300 text-emerald-700 font-black text-base rounded-2xl px-4 py-1.5 shadow-sm"
              dir="rtl"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              {completedCount === 0
                ? "لم تُكمل أي قصة بعد"
                : `أكملتَ ${completedCount} ${completedCount === 1 ? "قصة" : "قصص"} 🎉`}
            </span>
            {quizCompletedCount > 0 && (
              <span
                className="inline-block bg-yellow-50 border-2 border-yellow-300 text-yellow-700 font-bold text-sm rounded-2xl px-3 py-1 shadow-sm"
                dir="rtl"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                🌟 {quizCompletedCount} اختبار قبعات مكتمل
              </span>
            )}
          </div>
          {/* Legend */}
          <div
            className="flex gap-3 justify-center pb-2 text-xs text-gray-500"
            dir="rtl"
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            <span>🍃 قصة مكتملة</span>
            <span
              style={{
                filter:
                  "sepia(1) saturate(5) hue-rotate(15deg) brightness(1.1)",
                display: "inline-block",
              }}
            >
              🍃
            </span>
            <span>اختبار مكتمل</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Little Storyteller Voice Recorder ──
function LittleStoryteller() {
  type RecordState = "idle" | "recording" | "recorded";
  const [recState, setRecState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState(false);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevAudioUrlRef = useRef<string | null>(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (prevAudioUrlRef.current) URL.revokeObjectURL(prevAudioUrlRef.current);
    };
  }, []);

  async function startRecording() {
    setMicError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        if (prevAudioUrlRef.current)
          URL.revokeObjectURL(prevAudioUrlRef.current);
        const url = URL.createObjectURL(blob);
        prevAudioUrlRef.current = url;
        setAudioUrl(url);
        setRecState("recorded");
        for (const t of stream.getTracks()) {
          t.stop();
        }
      };
      mr.start();
      setRecState("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setMicError(true);
    }
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecRef.current?.stop();
  }

  function deleteRecording() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      prevAudioUrlRef.current = null;
    }
    setAudioUrl(null);
    setRecState("idle");
    setSeconds(0);
  }

  return (
    <motion.div
      data-ocid="stories.recorder.panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 rounded-3xl shadow-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #ede9fe 100%)",
        border: "2.5px solid",
        borderColor: "#d946ef",
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 px-5 py-3 text-center">
        <h3
          className="text-lg font-black text-white drop-shadow"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          🎙️ الراوي الصغير - سجّل صوتك!
        </h3>
        <p
          className="text-fuchsia-100 text-sm mt-0.5"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          هل تستطيع رواية القصة بصوتك؟
        </p>
      </div>

      <div className="px-6 py-5 flex flex-col items-center gap-4">
        {micError && (
          <div
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-3 text-center"
            data-ocid="stories.recorder.error_state"
          >
            <p
              className="text-red-600 font-bold text-sm"
              dir="rtl"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              ⚠️ لا يمكن الوصول للميكروفون. يرجى منح الإذن في المتصفح.
            </p>
          </div>
        )}

        {recState === "idle" && (
          <motion.button
            type="button"
            data-ocid="stories.recorder.button"
            onClick={startRecording}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl text-white font-black text-xs gap-1 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              boxShadow: "0 0 0 6px #fca5a5, 0 8px 24px #ef444488",
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            <span className="text-3xl">🔴</span>
            <span>ابدأ</span>
          </motion.button>
        )}

        {recState === "recording" && (
          <div className="flex flex-col items-center gap-3">
            {/* Pulsing indicator */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-full bg-red-100"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute text-3xl">🎙️</div>
            </div>
            {/* Timer */}
            <div
              className="text-fuchsia-700 font-black text-2xl"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </div>
            <motion.button
              type="button"
              data-ocid="stories.recorder.button"
              onClick={stopRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-2xl font-black text-base text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                fontFamily: "'Tajawal', sans-serif",
              }}
            >
              ⏹️ إيقاف التسجيل
            </motion.button>
          </div>
        )}

        {recState === "recorded" && audioUrl && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl animate-sparkle-pulse">✨</div>
            <p
              className="text-fuchsia-700 font-black text-xl"
              dir="rtl"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              رائع! استمع لتسجيلك 🎉
            </p>
            <audio
              controls
              src={audioUrl}
              className="w-full max-w-xs rounded-xl shadow-md mt-1"
            >
              <track kind="captions" />
            </audio>
            <button
              type="button"
              data-ocid="stories.recorder.button"
              onClick={deleteRecording}
              className="flex items-center gap-2 px-5 py-2 rounded-2xl font-black text-sm bg-white/80 border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all shadow-sm mt-1"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              🗑️ حذف التسجيل
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Six Thinking Hats Quiz ──
interface QuizQuestion {
  hat: string;
  hatEmoji: string;
  hatLabel: string;
  bg: string;
  border: string;
  textColor: string;
  question: string;
  options: string[];
  correct: number;
}

const QUIZ_DATA: Record<number, QuizQuestion[]> = {
  0: [
    {
      hat: "white",
      hatEmoji: "🎩",
      hatLabel: "القبعة البيضاء – الحقائق",
      bg: "#f8fafc",
      border: "#94a3b8",
      textColor: "#1e293b",
      question: "ما اسم الأسد في قصة الأسد والثور؟",
      options: ["شاه يكون", "دمنة", "شتربة", "الغراب"],
      correct: 0,
    },
    {
      hat: "red",
      hatEmoji: "❤️",
      hatLabel: "القبعة الحمراء – المشاعر",
      bg: "#fef2f2",
      border: "#ef4444",
      textColor: "#7f1d1d",
      question: "كيف تشعرُ عندما يحاول أحدٌ أن يُفسد صداقة بين شخصين؟",
      options: ["غاضب وحزين", "سعيد ومبسوط", "غير مبالٍ", "خائف فقط"],
      correct: 0,
    },
    {
      hat: "black",
      hatEmoji: "🖤",
      hatLabel: "القبعة السوداء – المخاطر",
      bg: "#1e293b",
      border: "#334155",
      textColor: "#f1f5f9",
      question: "ما الخطر الذي واجهه الأسد والثور في القصة؟",
      options: [
        "كذب دمنة وتلاعبه",
        "هجوم حيوانات الغابة",
        "الجوع والجفاف",
        "العواصف والأمطار",
      ],
      correct: 0,
    },
    {
      hat: "yellow",
      hatEmoji: "⭐",
      hatLabel: "القبعة الصفراء – الفوائد",
      bg: "#fefce8",
      border: "#eab308",
      textColor: "#713f12",
      question: "ما فائدة الصداقة الحقيقية القائمة على الثقة؟",
      options: [
        "تحمي من الخداع وتجلب السعادة",
        "لا فائدة منها",
        "تجعلنا نتفق دائماً",
        "تجلب المشكلات فقط",
      ],
      correct: 0,
    },
    {
      hat: "green",
      hatEmoji: "🌿",
      hatLabel: "القبعة الخضراء – الإبداع",
      bg: "#f0fdf4",
      border: "#22c55e",
      textColor: "#14532d",
      question: "لو كنتَ مكان الأسد، ماذا كنتَ ستفعل مع دمنة؟",
      options: [
        "أتحدث معه وأعطيه فرصة للتوبة",
        "أطرده من الغابة فوراً",
        "أتجاهله تماماً",
        "أطلب منه المساعدة",
      ],
      correct: -1,
    },
    {
      hat: "blue",
      hatEmoji: "💙",
      hatLabel: "القبعة الزرقاء – الخلاصة",
      bg: "#eff6ff",
      border: "#3b82f6",
      textColor: "#1e3a8a",
      question: "ما الدرس الأهم الذي تعلمتَه من قصة الأسد والثور؟",
      options: [
        "الصداقة الحقيقية تتغلب على الكذب والخداع",
        "لا تثق بأي أحد أبداً",
        "القوة أهم من الصداقة دائماً",
        "الكذب أحياناً مفيد",
      ],
      correct: 0,
    },
  ],
  1: [
    {
      hat: "white",
      hatEmoji: "🎩",
      hatLabel: "القبعة البيضاء – الحقائق",
      bg: "#f8fafc",
      border: "#94a3b8",
      textColor: "#1e293b",
      question: "ماذا فعلت المطوّقة لإنقاذ صاحباتها من الشبكة؟",
      options: [
        "أمرتهن بالطيران معاً بالشبكة",
        "ناءت بالشبكة وحدها",
        "طلبت المساعدة من الصياد",
        "هربت وتركت صاحباتها",
      ],
      correct: 0,
    },
    {
      hat: "red",
      hatEmoji: "❤️",
      hatLabel: "القبعة الحمراء – المشاعر",
      bg: "#fef2f2",
      border: "#ef4444",
      textColor: "#7f1d1d",
      question: "كيف شعرتَ عندما وقعت الحمامات في فخ الصياد؟",
      options: [
        "خائف وقلق عليهن",
        "سعيد ومبسوط",
        "غير مبالٍ",
        "غاضب من الحمامات",
      ],
      correct: 0,
    },
    {
      hat: "black",
      hatEmoji: "🖤",
      hatLabel: "القبعة السوداء – المخاطر",
      bg: "#1e293b",
      border: "#334155",
      textColor: "#f1f5f9",
      question: "ما الخطر الأكبر الذي واجهته الحمامة المطوقة؟",
      options: [
        "الصياد وشبكته",
        "الغراب في الشجرة",
        "البرد والمطر",
        "الجوع والعطش",
      ],
      correct: 0,
    },
    {
      hat: "yellow",
      hatEmoji: "⭐",
      hatLabel: "القبعة الصفراء – الفوائد",
      bg: "#fefce8",
      border: "#eab308",
      textColor: "#713f12",
      question: "ما الفائدة التي جناها التعاون في هذه القصة؟",
      options: [
        "أنقذ الحمامات جميعها من الصياد",
        "جعل الحمامات أسرع في الطيران",
        "كسر الشبكة إلى قطع صغيرة",
        "أخاف الصياد وجعله يهرب",
      ],
      correct: 0,
    },
    {
      hat: "green",
      hatEmoji: "🌿",
      hatLabel: "القبعة الخضراء – الإبداع",
      bg: "#f0fdf4",
      border: "#22c55e",
      textColor: "#14532d",
      question:
        "فكّر في طريقة إبداعية أخرى كانت تستطيع المطوقة بها إنقاذ صاحباتها",
      options: [
        "الاستعانة بالغراب لقطع الشبكة",
        "الصياح بصوت عالٍ لإخافة الصياد",
        "الطيران نحو الماء لإغراق الشبكة",
        "أي فكرة منك تعدّ رائعة! 🌟",
      ],
      correct: -1,
    },
    {
      hat: "blue",
      hatEmoji: "💙",
      hatLabel: "القبعة الزرقاء – الخلاصة",
      bg: "#eff6ff",
      border: "#3b82f6",
      textColor: "#1e3a8a",
      question: "ما الحكمة التي تستخلصها من قصة الحمامة المطوقة؟",
      options: [
        "الاتحاد قوة والتعاون ينجي الجميع",
        "كن دائماً حذراً ولا تثق بأحد",
        "القوة الفردية هي الأساس دائماً",
        "الهروب أفضل من المواجهة",
      ],
      correct: 0,
    },
  ],
  2: [
    {
      hat: "white",
      hatEmoji: "🎩",
      hatLabel: "القبعة البيضاء – الحقائق",
      bg: "#f8fafc",
      border: "#94a3b8",
      textColor: "#1e293b",
      question: "كيف تخلّص الأرنب الذكي من الذئب الغاضب؟",
      options: [
        "أوهمه بأن هناك ذئباً آخر في البركة",
        "هرب منه بسرعة كبيرة",
        "طلب المساعدة من حيوانات الغابة",
        "تظاهر بالمرض لإشفاقه عليه",
      ],
      correct: 0,
    },
    {
      hat: "red",
      hatEmoji: "❤️",
      hatLabel: "القبعة الحمراء – المشاعر",
      bg: "#fef2f2",
      border: "#ef4444",
      textColor: "#7f1d1d",
      question: "كيف شعرتَ حين ابتعد الذئب ولم يعد يزعج الحيوانات؟",
      options: [
        "فرحان ومرتاح",
        "حزين على الذئب",
        "خائف من عودته",
        "غير مبالٍ بما حدث",
      ],
      correct: 0,
    },
    {
      hat: "black",
      hatEmoji: "🖤",
      hatLabel: "القبعة السوداء – المخاطر",
      bg: "#1e293b",
      border: "#334155",
      textColor: "#f1f5f9",
      question: "ما الخطر الذي كان يواجه حيوانات المرج كل يوم؟",
      options: [
        "الذئب الغاضب الذي يخيفهم",
        "نقص الطعام والماء",
        "الصياد وأفخاخه",
        "البرد والجليد",
      ],
      correct: 0,
    },
    {
      hat: "yellow",
      hatEmoji: "⭐",
      hatLabel: "القبعة الصفراء – الفوائد",
      bg: "#fefce8",
      border: "#eab308",
      textColor: "#713f12",
      question: "ما فائدة استخدام الذكاء بدلاً من القوة في حل المشكلات؟",
      options: [
        "يحل المشكلات بأمان وبدون عنف",
        "يُعقّد الأمور أكثر",
        "يحتاج وقتاً طويلاً جداً",
        "لا فائدة من الذكاء مع الأقوياء",
      ],
      correct: 0,
    },
    {
      hat: "green",
      hatEmoji: "🌿",
      hatLabel: "القبعة الخضراء – الإبداع",
      bg: "#f0fdf4",
      border: "#22c55e",
      textColor: "#14532d",
      question:
        "لو كنتَ مكان الأرنب، ما الحيلة الذكية الأخرى التي كنتَ ستفكر بها؟",
      options: [
        "أجمع الحيوانات وتعاونوا معاً ضد الذئب",
        "أخبر الذئب بأن الغابة مليئة بذئاب أخرى",
        "أبني جداراً حول المرج لمنع دخوله",
        "كل هذه أفكار رائعة! 🌟",
      ],
      correct: -1,
    },
    {
      hat: "blue",
      hatEmoji: "💙",
      hatLabel: "القبعة الزرقاء – الخلاصة",
      bg: "#eff6ff",
      border: "#3b82f6",
      textColor: "#1e3a8a",
      question: "ما أهم درس تعلمتَه من قصة الأرنب الذكي؟",
      options: [
        "الذكاء والحيلة يتغلبان على القوة",
        "القوة الجسدية هي الأهم دائماً",
        "الهروب هو الحل الأفضل دائماً",
        "لا تواجه المشكلات بل تجنّبها",
      ],
      correct: 0,
    },
  ],
};

const ARABIC_NUMS = ["١", "٢", "٣", "٤", "٥", "٦"];

function SixHatsQuiz({
  storyId,
  storyIndex,
  onQuizComplete,
}: {
  storyId: string;
  storyIndex: number;
  onQuizComplete: () => void;
}) {
  const questions = QUIZ_DATA[storyIndex] ?? QUIZ_DATA[0];
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const _ = storyId; // used externally

  function handleAnswer(optionIdx: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQ + 1 >= questions.length) {
        setCompleted(true);
        onQuizComplete();
      } else {
        setCurrentQ((q) => q + 1);
      }
    }, 1200);
  }

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-3xl p-8 text-center shadow-xl border-4 border-yellow-300"
        style={{ background: "linear-gradient(135deg, #fefce8, #fef9c3)" }}
        dir="rtl"
      >
        <div className="text-6xl mb-3">🎉🏆✨</div>
        <h3
          className="text-3xl font-black text-yellow-700 mb-2"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          أحسنتَ! أتممتَ اختبار القبعات الست!
        </h3>
        <p
          className="text-yellow-600 text-lg font-bold"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          نمت ورقة ذهبية على شجرة القراءة الخاصة بك 🌟
        </p>
        <div className="mt-4 flex justify-center gap-2 text-4xl">
          {questions.map((q, i) => (
            <motion.span
              key={q.hat}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              {q.hatEmoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  }

  const q = questions[currentQ];

  return (
    <div dir="rtl">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-4 justify-center">
        {questions.map((q, i) => (
          <div
            key={q.hat}
            className="w-8 h-2 rounded-full transition-all duration-300"
            style={{
              background:
                i < currentQ
                  ? "#22c55e"
                  : i === currentQ
                    ? "#f59e0b"
                    : "#e2e8f0",
            }}
          />
        ))}
      </div>
      <p
        className="text-center text-sm text-gray-500 mb-4 font-bold"
        style={{ fontFamily: "'Tajawal', sans-serif" }}
      >
        السؤال {ARABIC_NUMS[currentQ]} من ٦
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          data-ocid={`quiz.hat_button.${currentQ + 1}` as string}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="rounded-3xl border-4 p-6 shadow-xl mb-4"
          style={{
            background: q.bg,
            borderColor: q.border,
            color: q.textColor,
          }}
        >
          {/* Hat icon */}
          <div className="text-center mb-3">
            <span className="text-5xl">{q.hatEmoji}</span>
            <p
              className="font-black text-base mt-1"
              style={{
                fontFamily: "'Tajawal', sans-serif",
                color: q.textColor,
              }}
            >
              {q.hatLabel}
            </p>
          </div>

          {/* Question */}
          <p
            className="text-xl font-black text-center mb-5 leading-relaxed"
            style={{ fontFamily: "'Tajawal', sans-serif", color: q.textColor }}
          >
            {q.question}
          </p>

          {/* Feedback overlay */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-center mb-4"
              >
                <span
                  className="text-2xl font-black"
                  style={{ fontFamily: "'Tajawal', sans-serif" }}
                >
                  {q.correct === -1 || selectedAnswer === q.correct
                    ? "✅ ممتاز!"
                    : "🌟 إجابة رائعة!"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer options */}
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, i) => {
              const optKey = `${currentQ}-${i}`;
              let btnStyle: React.CSSProperties = {
                background: "rgba(255,255,255,0.85)",
                borderColor: q.border,
                color: q.textColor === "#f1f5f9" ? "#1e293b" : q.textColor,
                fontFamily: "'Tajawal', sans-serif",
              };
              if (selectedAnswer !== null) {
                if (q.correct === -1) {
                  btnStyle = {
                    ...btnStyle,
                    background:
                      i === selectedAnswer
                        ? "#bbf7d0"
                        : "rgba(255,255,255,0.85)",
                    borderColor: i === selectedAnswer ? "#22c55e" : q.border,
                  };
                } else if (i === q.correct) {
                  btnStyle = {
                    ...btnStyle,
                    background: "#bbf7d0",
                    borderColor: "#22c55e",
                  };
                } else if (i === selectedAnswer) {
                  btnStyle = {
                    ...btnStyle,
                    background: "#fee2e2",
                    borderColor: "#ef4444",
                  };
                }
              }
              return (
                <motion.button
                  key={optKey}
                  data-ocid={`quiz.answer_button.${i + 1}` as string}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                  className="w-full text-right py-3 px-5 rounded-2xl border-2 font-bold text-base transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                  style={btnStyle}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const { actor, isFetching } = useActor();

  // UI state
  const [showStories, setShowStories] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [adminMode, setAdminMode] = useState(false);
  const gearTapsRef = useRef(0);
  const gearTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stories data
  const [stories, setStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Story | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Reading progress state ──
  const [completedStories, setCompletedStories] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("completedStories");
      if (stored) return new Set<string>(JSON.parse(stored));
    } catch {}
    return new Set<string>();
  });

  function markStoryComplete(storyId: string) {
    setCompletedStories((prev) => {
      const next = new Set(prev);
      next.add(storyId);
      try {
        localStorage.setItem("completedStories", JSON.stringify([...next]));
      } catch {}
      return next;
    });
    toast.success("أحسنت! أكملتَ القصة 🌿", {
      style: {
        background: "#dcfce7",
        color: "#166534",
        fontFamily: "'Tajawal', sans-serif",
        fontWeight: "800",
        fontSize: "1.1rem",
      },
    });
  }

  // ── Quiz completion state ──
  const [quizCompletedStories, setQuizCompletedStories] = useState<Set<string>>(
    () => {
      try {
        const stored = localStorage.getItem("quizCompletedStories");
        if (stored) return new Set<string>(JSON.parse(stored));
      } catch {}
      return new Set<string>();
    },
  );

  function markQuizComplete(storyId: string) {
    setQuizCompletedStories((prev) => {
      const next = new Set(prev);
      next.add(storyId);
      try {
        localStorage.setItem("quizCompletedStories", JSON.stringify([...next]));
      } catch {}
      return next;
    });
    toast.success(
      "رائع! أكملتَ اختبار القبعات الست 🏆 نمت ورقة ذهبية على شجرتك!",
      {
        style: {
          background: "#fefce8",
          color: "#713f12",
          fontFamily: "'Tajawal', sans-serif",
          fontWeight: "800",
          fontSize: "1rem",
        },
        duration: 4000,
      },
    );
  }

  // ── Music player state ──
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const schedulerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notesPlayingRef = useRef<OscillatorNode[]>([]);

  function startMusic() {
    if (musicPlaying) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Gentle lullaby melody - C major pentatonic (C4 D4 E4 G4 A4)
    const melody = [
      261.63, 329.63, 392.0, 329.63, 261.63, 329.63, 392.0, 523.25, 440.0,
      392.0, 329.63, 261.63, 392.0, 329.63, 261.63, 196.0,
    ];
    const noteDuration = 0.5;
    const noteGap = 0.05;
    let currentTime = ctx.currentTime + 0.1;
    let noteIndex = 0;

    function scheduleChunk() {
      if (!audioCtxRef.current) return;
      for (let i = 0; i < 8; i++) {
        const freq = melody[noteIndex % melody.length];
        noteIndex++;

        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);

        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = freq;

        masterGain.gain.setValueAtTime(0, currentTime);
        masterGain.gain.linearRampToValueAtTime(0.07, currentTime + 0.05);
        masterGain.gain.exponentialRampToValueAtTime(
          0.001,
          currentTime + noteDuration - noteGap,
        );

        osc.connect(masterGain);
        osc.start(currentTime);
        osc.stop(currentTime + noteDuration);
        notesPlayingRef.current.push(osc);
        currentTime += noteDuration;
      }
      schedulerTimerRef.current = setTimeout(scheduleChunk, 3000);
    }

    scheduleChunk();
    setMusicPlaying(true);
  }

  function stopMusic() {
    if (schedulerTimerRef.current) {
      clearTimeout(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
    for (const o of notesPlayingRef.current) {
      try {
        o.stop();
      } catch (_) {}
    }
    notesPlayingRef.current = [];
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    setMusicPlaying(false);
  }

  function toggleMusic() {
    if (musicPlaying) stopMusic();
    else startMusic();
  }

  // ── Fetch stories ──
  const fetchStories = useCallback(async () => {
    if (!actor) return;
    setLoadingStories(true);
    try {
      const data = await actor.getStories();
      if (data.length === 0) {
        setSeeding(true);
        const seeded = await Promise.all(
          SEED_STORIES.map((s) => actor.addStory(s)),
        );
        setStories(seeded);
        setSeeding(false);
      } else {
        // Add any missing seed stories (e.g. new stories added in updates)
        const existingTitles = new Set(data.map((s: Story) => s.title));
        const missing = SEED_STORIES.filter(
          (s) => !existingTitles.has(s.title),
        );
        if (missing.length > 0) {
          setSeeding(true);
          const added = await Promise.all(
            missing.map((s) => actor.addStory(s)),
          );
          setStories([...data, ...added]);
          setSeeding(false);
        } else {
          setStories(data);
        }
      }
    } catch {
      toast.error("Failed to load stories");
    } finally {
      setLoadingStories(false);
    }
  }, [actor]);

  useEffect(() => {
    if (showStories && actor && !isFetching) {
      fetchStories();
    }
  }, [showStories, actor, isFetching, fetchStories]);

  // ── Admin gear tap ──
  function handleGearTap() {
    gearTapsRef.current += 1;
    const next = gearTapsRef.current;
    if (next >= 3) {
      gearTapsRef.current = 0;
      setAdminMode((a) => {
        const newMode = !a;
        toast.success(
          newMode ? "🔑 Admin mode enabled" : "Admin mode disabled",
        );
        return newMode;
      });
    } else {
      if (gearTapTimer.current) clearTimeout(gearTapTimer.current);
      gearTapTimer.current = setTimeout(() => {
        gearTapsRef.current = 0;
      }, 1500);
    }
  }

  // ── Open add/edit modal ──
  function openAdd() {
    setEditingStory(null);
    setFormData(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(story: Story) {
    setEditingStory(story);
    setFormData({
      title: story.title,
      titleAr: story.titleAr,
      body: story.body,
      bodyAr: story.bodyAr,
      emoji: story.emoji,
      colorTheme: story.colorTheme,
    });
    setModalOpen(true);
  }

  // ── Save story ──
  async function handleSave() {
    if (!actor) return;
    if (!formData.title.trim() || !formData.titleAr.trim()) {
      toast.error("Please fill in both title fields");
      return;
    }
    setSaving(true);
    try {
      if (editingStory) {
        await actor.updateStory({ id: editingStory.id, ...formData });
        setStories((prev) =>
          prev.map((s) =>
            s.id === editingStory.id ? { ...s, ...formData } : s,
          ),
        );
        toast.success("Story updated! ✨");
      } else {
        const created = await actor.addStory(formData);
        setStories((prev) => [...prev, created]);
        toast.success("Story added! 🎉");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save story");
    } finally {
      setSaving(false);
    }
  }

  // ── Delete story ──
  async function handleDelete() {
    if (!actor || !deleteTarget) return;
    setDeleting(true);
    try {
      await actor.deleteStory(deleteTarget.id);
      setStories((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      toast.success("Story deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete story");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="relative min-h-screen sparkle-bg overflow-hidden">
      <Toaster />

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center mb-8 md:mb-12"
        >
          <div className="animate-hero-bob mb-2">
            <img
              src="/assets/generated/asma-character-transparent.dim_200x280.png"
              alt="Asma sparkle character"
              className="w-32 h-auto md:w-44 drop-shadow-xl"
            />
          </div>
          <div className="animate-sparkle-pulse text-4xl md:text-5xl mb-1 select-none">
            ✨
          </div>
          <h1
            className="gradient-text-sparkle text-3xl md:text-5xl font-black text-center leading-tight px-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Welcome to Sparkle with Asma!
          </h1>
          <h2
            className="gradient-text-sparkle text-2xl md:text-4xl font-black text-center leading-tight px-4 mt-1"
            dir="rtl"
            style={{ fontFamily: "'Tajawal', sans-serif" }}
          >
            أهلاً بك في تألق مع أسماء!
          </h2>
          <p
            className="text-fuchsia-600 font-bold text-lg md:text-xl mt-3 text-center"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🌟 Let&apos;s play, create &amp; explore! 🌟
          </p>
        </motion.div>

        {/* Reading Progress Tree */}
        <ReadingProgressTree
          completedCount={completedStories.size}
          quizCompletedCount={quizCompletedStories.size}
        />

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <button
              type="button"
              data-ocid="stories.card"
              onClick={() => setShowStories(true)}
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

        {/* Stories List Panel */}
        <AnimatePresence>
          {showStories && !selectedStory && (
            <motion.div
              key="stories-panel"
              data-ocid="stories.panel"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full max-w-4xl mt-10"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between mb-6 px-1 flex-wrap gap-3">
                <button
                  type="button"
                  data-ocid="stories.back_button"
                  onClick={() => setShowStories(false)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-base bg-white/80 border-2 border-rose-300 text-rose-600 shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all duration-150"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <span className="text-xl">←</span>
                  <span>Back</span>
                  <span className="text-rose-400 mx-1">·</span>
                  <span
                    dir="rtl"
                    style={{ fontFamily: "'Tajawal', sans-serif" }}
                  >
                    عودة
                  </span>
                </button>

                <div
                  className="text-2xl md:text-3xl font-black text-rose-600 flex items-center gap-2"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <span>📚</span>
                  <span>Our Stories</span>
                  <span>✨</span>
                </div>

                {adminMode && (
                  <button
                    type="button"
                    data-ocid="stories.open_modal_button"
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-base bg-fuchsia-500 text-white shadow-md hover:bg-fuchsia-600 hover:scale-105 active:scale-95 transition-all duration-150"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    <Plus size={18} />
                    <span>Add Story</span>
                  </button>
                )}
              </div>

              {/* Loading */}
              {(loadingStories || seeding) && (
                <div
                  data-ocid="stories.loading_state"
                  className="flex flex-col items-center py-16 gap-4"
                >
                  <Loader2 className="animate-spin text-rose-400" size={48} />
                  <p
                    className="text-rose-500 font-black text-lg"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {seeding ? "Preparing stories... ✨" : "Loading stories..."}
                  </p>
                </div>
              )}

              {/* Empty */}
              {!loadingStories && !seeding && stories.length === 0 && (
                <div
                  data-ocid="stories.empty_state"
                  className="flex flex-col items-center py-16 gap-4"
                >
                  <div className="text-6xl animate-sparkle-pulse">📚</div>
                  <p
                    className="text-rose-500 font-black text-xl text-center"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    No stories yet!
                    <br />
                    <span
                      dir="rtl"
                      style={{ fontFamily: "'Tajawal', sans-serif" }}
                    >
                      لا توجد قصص بعد!
                    </span>
                  </p>
                  {adminMode && (
                    <button
                      type="button"
                      data-ocid="stories.primary_button"
                      onClick={openAdd}
                      className="mt-2 px-6 py-3 rounded-2xl bg-fuchsia-500 text-white font-black text-lg shadow-lg hover:bg-fuchsia-600 transition-all"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      + Add First Story
                    </button>
                  )}
                </div>
              )}

              {/* Story cards */}
              {!loadingStories && !seeding && stories.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {stories.map((story, idx) => {
                    const { bg, accent } = getTheme(story.colorTheme);
                    const ocidNum = idx + 1;
                    return (
                      <motion.div
                        key={String(story.id)}
                        data-ocid={`stories.item.${ocidNum}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.1,
                          ease: "easeOut",
                        }}
                        className={`bg-gradient-to-br ${bg} rounded-3xl p-6 shadow-xl border-2 border-white/70 flex flex-col items-center text-center transition-all duration-200`}
                      >
                        <div
                          className="mb-3 drop-shadow-lg"
                          style={{
                            filter:
                              "drop-shadow(0 6px 10px rgba(0,0,0,0.18)) drop-shadow(0 2px 4px rgba(0,0,0,0.10))",
                          }}
                        >
                          {getStoryIcon(idx)}
                        </div>

                        <div className="text-2xl mb-2">{story.emoji}</div>

                        <h3
                          className="text-xl font-black mb-1"
                          style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: accent,
                          }}
                        >
                          {story.title}
                        </h3>
                        <p
                          className="text-base font-bold mb-3 opacity-80"
                          dir="rtl"
                          style={{
                            fontFamily: "'Tajawal', sans-serif",
                            color: accent,
                          }}
                        >
                          {story.titleAr}
                        </p>

                        <div className="flex items-center gap-2 w-full justify-center">
                          <button
                            type="button"
                            data-ocid={`stories.secondary_button.${ocidNum}`}
                            onClick={() => setSelectedStory(story)}
                            className="flex-1 px-4 py-2 rounded-2xl text-white font-black text-sm shadow-md hover:brightness-110 active:scale-95 transition-all duration-150"
                            style={{
                              backgroundColor: accent,
                              fontFamily: "'Nunito', sans-serif",
                            }}
                          >
                            Read Now 📖
                          </button>

                          {adminMode && (
                            <>
                              <button
                                type="button"
                                data-ocid={`stories.edit_button.${ocidNum}`}
                                onClick={() => openEdit(story)}
                                className="p-2 rounded-xl bg-white/70 hover:bg-white text-amber-600 hover:scale-110 active:scale-95 transition-all shadow"
                                title="Edit"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                type="button"
                                data-ocid={`stories.delete_button.${ocidNum}`}
                                onClick={() => setDeleteTarget(story)}
                                className="p-2 rounded-xl bg-white/70 hover:bg-rose-100 text-rose-500 hover:scale-110 active:scale-95 transition-all shadow"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Reader */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              key="story-reader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
              style={{
                background:
                  "linear-gradient(160deg, #bfdbfe 0%, #e0f2fe 30%, #fce7f3 65%, #ede9fe 100%)",
              }}
            >
              {/* Decorative sky elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-8 left-10 w-24 h-10 bg-white/50 rounded-full blur-sm" />
                <div className="absolute top-16 left-32 w-16 h-7 bg-white/40 rounded-full blur-sm" />
                <div className="absolute top-6 right-16 w-20 h-9 bg-white/50 rounded-full blur-sm" />
                <div className="absolute top-20 right-8 w-28 h-10 bg-white/35 rounded-full blur-sm" />
                <div className="absolute bottom-20 left-6 w-16 h-8 bg-white/30 rounded-full blur-sm" />
                <div className="text-6xl absolute top-12 right-6 opacity-30 select-none">
                  🌅
                </div>
                <div className="text-4xl absolute top-4 left-4 opacity-20 select-none">
                  ✨
                </div>
                <div className="text-5xl absolute bottom-28 right-8 opacity-20 select-none animate-sparkle-pulse">
                  🌸
                </div>
              </div>

              <div className="relative z-10 flex flex-col min-h-full px-4 py-6 max-w-2xl mx-auto w-full">
                {/* Top bar: back + music */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    type="button"
                    data-ocid="stories.back_button"
                    onClick={() => {
                      stopMusic();
                      setSelectedStory(null);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-base bg-white/80 border-2 border-purple-300 text-purple-700 shadow-md hover:bg-purple-50 hover:scale-105 active:scale-95 transition-all duration-150"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    <span className="text-xl">←</span>
                    <span>رجوع</span>
                  </button>

                  {/* Music player */}
                  <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border-2 border-purple-200 rounded-2xl px-4 py-2 shadow-md">
                    <button
                      type="button"
                      data-ocid="stories.music.toggle"
                      onClick={toggleMusic}
                      className="flex items-center gap-2 text-purple-700 font-bold text-sm hover:scale-110 active:scale-95 transition-all"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      <span className="text-2xl">
                        {musicPlaying ? "⏸️" : "▶️"}
                      </span>
                      <span className="hidden sm:inline">
                        {musicPlaying ? "إيقاف" : "موسيقى هادئة"}
                      </span>
                    </button>
                    {musicPlaying && (
                      <div className="flex gap-0.5 items-end h-5">
                        {[1, 2, 3, 4].map((b) => (
                          <div
                            key={b}
                            className="w-1 bg-purple-400 rounded-full animate-bounce"
                            style={{
                              height: `${8 + b * 4}px`,
                              animationDelay: `${b * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Story card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-purple-100 flex-1">
                  {/* Emoji + title */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="text-7xl mb-4 animate-sparkle-pulse drop-shadow-lg">
                      {selectedStory.emoji}
                    </div>
                    <h2
                      className="text-4xl md:text-5xl font-black text-center mb-2 leading-tight"
                      dir="rtl"
                      style={{
                        fontFamily: "'Tajawal', sans-serif",
                        color: "#7c3aed",
                        textShadow: "0 2px 12px #c4b5fd88",
                      }}
                    >
                      {selectedStory.titleAr}
                    </h2>
                    <div className="w-20 h-1 rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mt-2" />
                  </div>

                  {/* Arabic story body - primary, large */}
                  <div className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 rounded-2xl p-6 mb-6 shadow-inner border border-purple-100">
                    <div className="space-y-4">
                      {selectedStory.bodyAr.split("\n\n").map((para) => {
                        const isQuote =
                          para.startsWith("【") && para.endsWith("】");
                        const text = isQuote ? para.slice(1, -1) : para;
                        if (isQuote) {
                          return (
                            <div
                              key={para.slice(0, 30)}
                              className="bg-yellow-50 p-4 rounded-2xl border-2 border-dashed border-yellow-300 text-center"
                              dir="rtl"
                            >
                              <p
                                className="text-gray-800 text-xl md:text-2xl leading-relaxed font-bold italic"
                                style={{ fontFamily: "'Tajawal', sans-serif" }}
                              >
                                {text}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <p
                            key={para.slice(0, 30)}
                            className="text-gray-800 text-xl md:text-2xl leading-[2.2] font-bold text-right"
                            dir="rtl"
                            style={{ fontFamily: "'Tajawal', sans-serif" }}
                          >
                            {text}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* English body - smaller, secondary */}
                  <div className="bg-white/50 rounded-2xl p-5 shadow-inner border border-purple-50">
                    <p
                      className="text-gray-600 text-base leading-loose font-semibold"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {selectedStory.body}
                    </p>
                  </div>

                  {/* Little Storyteller - for all stories */}
                  <LittleStoryteller />

                  {/* Six Thinking Hats Quiz */}
                  <div className="mt-8 px-4">
                    <div className="text-center mb-4">
                      <h3
                        className="text-2xl font-black text-purple-700"
                        style={{ fontFamily: "'Tajawal', sans-serif" }}
                        dir="rtl"
                      >
                        🎩 اختبار القبعات الست
                      </h3>
                      <p
                        className="text-gray-500 text-sm mt-1"
                        style={{ fontFamily: "'Tajawal', sans-serif" }}
                        dir="rtl"
                      >
                        ارتدِ كل قبعة وأجب على سؤالها!
                      </p>
                    </div>
                    {quizCompletedStories.has(selectedStory.id.toString()) ? (
                      <div
                        className="text-center p-6 rounded-3xl bg-yellow-50 border-2 border-yellow-300"
                        dir="rtl"
                      >
                        <div className="text-5xl mb-2">🏆</div>
                        <p
                          className="text-yellow-700 font-black text-xl"
                          style={{ fontFamily: "'Tajawal', sans-serif" }}
                        >
                          أحسنتَ! أكملتَ اختبار القبعات الست
                        </p>
                        <p
                          className="text-yellow-600 text-base mt-1"
                          style={{ fontFamily: "'Tajawal', sans-serif" }}
                        >
                          نمت ورقة ذهبية على شجرتك! 🌟
                        </p>
                      </div>
                    ) : (
                      <SixHatsQuiz
                        storyId={selectedStory.id.toString()}
                        storyIndex={
                          stories.findIndex((s) => s.id === selectedStory.id) %
                          3
                        }
                        onQuizComplete={() =>
                          markQuizComplete(selectedStory.id.toString())
                        }
                      />
                    )}
                  </div>

                  {/* Complete story button */}
                  <div className="flex justify-center mt-6">
                    <motion.button
                      type="button"
                      data-ocid="stories.complete_button"
                      onClick={() =>
                        markStoryComplete(selectedStory.id.toString())
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-3 rounded-2xl font-black text-lg shadow-lg text-white"
                      style={{
                        background: completedStories.has(
                          selectedStory.id.toString(),
                        )
                          ? "linear-gradient(135deg, #6ee7b7, #34d399)"
                          : "linear-gradient(135deg, #10b981, #059669)",
                        fontFamily: "'Tajawal', sans-serif",
                      }}
                      dir="rtl"
                    >
                      {completedStories.has(selectedStory.id.toString())
                        ? "✅ أحسنتَ! أكملتَ هذه القصة"
                        : "أكملتُ القصة ✅"}
                    </motion.button>
                  </div>

                  {/* Bottom back button */}
                  <div className="flex justify-center mt-8">
                    <button
                      type="button"
                      data-ocid="stories.secondary_button"
                      onClick={() => {
                        stopMusic();
                        setSelectedStory(null);
                      }}
                      className="px-10 py-3 rounded-2xl font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 text-white"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                        fontFamily: "'Tajawal', sans-serif",
                      }}
                    >
                      ← العودة للقصص
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 text-center flex flex-col items-center gap-2">
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
          <button
            type="button"
            data-ocid="stories.toggle"
            onClick={handleGearTap}
            className={`mt-1 p-1.5 rounded-full transition-all duration-200 ${
              adminMode
                ? "text-fuchsia-600 bg-fuchsia-100 shadow-md"
                : "text-purple-300 hover:text-purple-400"
            }`}
            aria-label="Admin toggle"
          >
            <Settings size={16} />
          </button>
          {adminMode && (
            <span className="text-xs text-fuchsia-500 font-bold animate-pulse">
              🔑 Admin Mode Active
            </span>
          )}
        </footer>
      </div>

      {/* Add/Edit Story Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          data-ocid="stories.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
        >
          <DialogHeader>
            <DialogTitle
              className="text-2xl font-black text-fuchsia-700"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {editingStory ? "✏️ Edit Story" : "✨ Add New Story"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="story-title"
                  className="font-bold text-gray-700"
                >
                  Title (EN)
                </Label>
                <Input
                  id="story-title"
                  data-ocid="stories.input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="The Clever Rabbit"
                  className="rounded-xl mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="story-title-ar"
                  className="font-bold text-gray-700"
                >
                  Title (AR)
                </Label>
                <Input
                  id="story-title-ar"
                  data-ocid="stories.input"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, titleAr: e.target.value }))
                  }
                  placeholder="الأرنب الذكي"
                  dir="rtl"
                  className="rounded-xl mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="story-body" className="font-bold text-gray-700">
                Story Text (EN)
              </Label>
              <Textarea
                id="story-body"
                data-ocid="stories.textarea"
                value={formData.body}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, body: e.target.value }))
                }
                placeholder="Once upon a time..."
                className="rounded-xl mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label
                htmlFor="story-body-ar"
                className="font-bold text-gray-700"
              >
                Story Text (AR)
              </Label>
              <Textarea
                id="story-body-ar"
                data-ocid="stories.textarea"
                value={formData.bodyAr}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, bodyAr: e.target.value }))
                }
                placeholder="في يوم من الأيام..."
                dir="rtl"
                className="rounded-xl mt-1 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="story-emoji"
                  className="font-bold text-gray-700"
                >
                  Emoji
                </Label>
                <Input
                  id="story-emoji"
                  data-ocid="stories.input"
                  value={formData.emoji}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, emoji: e.target.value }))
                  }
                  placeholder="📖"
                  className="rounded-xl mt-1"
                />
              </div>
              <div>
                <Label className="font-bold text-gray-700">Color Theme</Label>
                <Select
                  value={formData.colorTheme}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, colorTheme: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="stories.select"
                    className="rounded-xl mt-1"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sky">☁️ Sky (Blue)</SelectItem>
                    <SelectItem value="amber">🌻 Amber (Orange)</SelectItem>
                    <SelectItem value="fuchsia">💜 Fuchsia (Purple)</SelectItem>
                    <SelectItem value="emerald">🌿 Emerald (Green)</SelectItem>
                    <SelectItem value="violet">
                      🔮 Violet (Deep Purple)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 flex-row justify-end">
            <Button
              type="button"
              data-ocid="stories.cancel_button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="rounded-2xl font-black"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="stories.save_button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-2xl font-black bg-fuchsia-500 hover:bg-fuchsia-600"
            >
              {saving ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              {saving
                ? "Saving..."
                : editingStory
                  ? "Save Changes"
                  : "Add Story"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="stories.dialog" className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle
              className="text-xl font-black text-rose-600"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🗑️ Delete Story?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-semibold">
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;?
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="stories.cancel_button"
              className="rounded-2xl font-black"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="stories.confirm_button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-2xl font-black bg-rose-500 hover:bg-rose-600"
            >
              {deleting ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
