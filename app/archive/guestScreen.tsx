"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useTranslate } from "@/context/LanguageContext";
import FormattedText from "@/lib/FormatedText";
import TypingAnimation from "@/components/TypingAnimation";

interface Props {
  openGuest: boolean;
  setOpenGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

// Komponen Avatar Dinamis
const DynamicAvatar = ({ name }: { name: string }) => {
  // Fungsi untuk generate inisial (maksimal 4 karakter)
  const getInitials = (fullName: string): string => {
    if (!fullName) return "";

    const words = fullName.trim().split(/\s+/);
    let initials = "";

    // Ambil huruf pertama dari setiap kata, maksimal 4 karakter
    for (let i = 0; i < Math.min(words.length, 4); i++) {
      if (words[i] && words[i].length > 0) {
        initials += words[i][0].toUpperCase();
      }
    }

    return initials;
  };

  // Fungsi untuk generate warna berdasarkan nama
  const getGradientColors = (
    name: string
  ): { base: string; wave1: string; wave2: string } => {
    if (!name)
      return {
        base: "from-blue-400 to-blue-600",
        wave1: "from-blue-300 to-cyan-400",
        wave2: "from-cyan-300 to-blue-500",
      };

    const colorSets = [
      {
        base: "from-pink-400 via-purple-400 to-indigo-500",
        wave1: "from-pink-300 via-purple-300 to-indigo-400",
        wave2: "from-rose-400 via-pink-500 to-purple-600",
      },
      {
        base: "from-blue-400 via-cyan-400 to-teal-500",
        wave1: "from-blue-300 via-cyan-300 to-teal-400",
        wave2: "from-sky-400 via-blue-500 to-cyan-600",
      },
      {
        base: "from-green-400 via-emerald-400 to-blue-500",
        wave1: "from-green-300 via-emerald-300 to-blue-400",
        wave2: "from-lime-400 via-green-500 to-emerald-600",
      },
      {
        base: "from-yellow-400 via-orange-400 to-red-500",
        wave1: "from-yellow-300 via-orange-300 to-red-400",
        wave2: "from-amber-400 via-yellow-500 to-orange-600",
      },
      {
        base: "from-purple-400 via-pink-400 to-red-500",
        wave1: "from-purple-300 via-pink-300 to-red-400",
        wave2: "from-violet-400 via-purple-500 to-pink-600",
      },
      {
        base: "from-indigo-400 via-blue-400 to-cyan-500",
        wave1: "from-indigo-300 via-blue-300 to-cyan-400",
        wave2: "from-blue-400 via-indigo-500 to-blue-600",
      },
    ];

    // Generate hash sederhana dari nama untuk konsistensi warna
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colorSets.length;
    return colorSets[index];
  };

  const initials = getInitials(name);
  const colors = getGradientColors(name);

  return (
    <div className="relative w-[200px] h-[200px] mx-auto cursor-pointer">
      {/* Base gradient background */}
      <div
        className={`w-full h-full rounded-3xl bg-gradient-to-br ${colors.base} shadow-2xl flex items-center justify-center border-4 border-white/20 backdrop-blur-sm overflow-hidden relative`}
      >
        {/* Soft fade overlay layers */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors.wave1} opacity-0`}
          style={{
            animation: "softFade1 3s ease-in-out infinite",
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-tl ${colors.wave2} opacity-0`}
          style={{
            animation: "softFade2 3s ease-in-out infinite 2s",
          }}
        />

        {/* Subtle breathing effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colors.base} opacity-0`}
          style={{
            animation: "breathe 3s ease-in-out infinite",
          }}
        />

        {/* Inisial text */}
        <span className="text-white font-bold text-6xl tracking-wider drop-shadow-2xl relative z-10">
          {initials}
        </span>
      </div>

      {/* Soft pulsing glow */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.base} opacity-20 blur-xl -z-10`}
        style={{
          animation: "glowPulse 5s ease-in-out infinite",
        }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes softFade1 {
          0%,
          100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.02);
          }
        }

        @keyframes softFade2 {
          0%,
          100% {
            opacity: 0;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.01) rotate(1deg);
          }
        }

        @keyframes breathe {
          0%,
          100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.005);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

const GuestScreenContent = ({ openGuest, setOpenGuest }: Props) => {
  const t = useTranslate();
  const { setUser } = useUser();
  const [name, setName] = useState<string>("");
  const [welcome, setWelcome] = useState(t("intro.undangan"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const invite = searchParams.get("we-invite");

  useEffect(() => {
    if (invite) {
      setWelcome(t("intro.undangan"));
    } else {
      setWelcome(""); // kosongkan jika tidak ada kode
    }
  }, [t, invite]);

  const variant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  useEffect(() => {
    const getData = async () => {
      if (!invite) {
        setIsLoading(false);
        setError(t("guest.error2")); // Jika tidak ada parameter
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://wedding-api.bintangtobing.com/api/invitation/${invite}`
        );

        if (!response.ok) {
          setWelcome("");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setName(result.data.name);
        setUser({
          name: result.data.name,
          username: result.data.username,
          greeting: result.data.greeting || "",
          phone_number: result.data.phone_number || "",
        });
      } catch (error) {
        setError(t("guest.error1")); // Nama tidak ditemukan
        setWelcome("");
        console.error("Error fetching invitation data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (openGuest) {
      getData();
    }
  }, []);

  const handleScreenClick = () => {
    if (name && !isLoading) {
      setOpenGuest(false);
    }
  };

  return (
    <AnimatePresence>
      {openGuest && (
        <motion.section
          key="guest-screen"
          variants={variant}
          initial={{ opacity: 0 }}
          animate="visible"
          exit="exit"
          onClick={handleScreenClick}
          className="fixed inset-0 h-screen w-screen bg-[#141414] flex items-center justify-center z-50"
        >
          <div className="text-center px-6">
            {welcome && (
              <div className="mb-6">
                <h1 className="text-2xl xl:text-4xl font-medium max-w-3xl text-white mb-4">
                  {welcome}, <b>{name}</b>
                </h1>
                <p className="text-gray-300 text-base xl:text-lg max-w-3xl mx-auto">
                  {t("intro.undangan_subtitle")}
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">{t("guest.loading")}</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <DynamicAvatar name="?" />
                <p className="text-red-400 mb-2 mt-4">{error}</p>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  {t("guest.error2")}
                </p>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <DynamicAvatar name={name} />
                <div className="mt-6 max-w-3xl mx-auto">
                  <FormattedText
                    text={t("intro.undangan_desc").replace("{name}", name)}
                    className="text-gray-300 text-base xl:text-lg mb-4 [&>p:not(:first-child)]:mt-1"
                  />
                  <TypingAnimation
                    text={t("intro.undangan_note").replace("{name}", name)}
                    className="text-gray-400 text-sm xl:text-base"
                    speed={50}
                    delay={1000}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

const GuestScreenLoading = ({ openGuest }: { openGuest: boolean }) => {
  const t = useTranslate();
  if (!openGuest) return null;

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#141414] flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl font-medium text-white mb-6">
          {t("guest.loading")}
        </h1>
        <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export const GuestScreen: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<GuestScreenLoading openGuest={props.openGuest} />}>
      <GuestScreenContent {...props} />
    </Suspense>
  );
};
