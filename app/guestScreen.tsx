"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useTranslate } from "@/context/LanguageContext";

interface Props {
  openGuest: boolean;
  setOpenGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

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
              <h1 className="text-2xl xl:text-4xl font-medium max-w-2xl text-white mb-6">
                {welcome}, <b>{name}</b>
              </h1>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">{t("guest.loading")}</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <Image
                  width={140}
                  height={140}
                  className="mx-auto mb-4"
                  src="https://res.cloudinary.com/du0tz73ma/image/upload/v1733748883/Screenshot_2024-12-02_at_19.50.56_1_1_vyki1m.png"
                  alt="Guest Avatar"
                />
                <p className="text-red-400 mb-2">{error}</p>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  {t("guest.error2")}
                </p>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <Image
                  width={200}
                  height={200}
                  className="mx-auto cursor-pointer"
                  src="https://res.cloudinary.com/du0tz73ma/image/upload/v1733748883/Screenshot_2024-12-02_at_19.50.56_1_1_vyki1m.png"
                  alt="Guest Avatar"
                />
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
