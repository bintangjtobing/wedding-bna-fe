import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Footer } from "../footer/Footer";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useTranslate } from "@/context/LanguageContext";

interface ModalForGiftProps {
  openModalGift: boolean;
  setOpenModalGift: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForGift: React.FC<ModalForGiftProps> = ({
  openModalGift,
  setOpenModalGift,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const { user } = useUser();
  const t = useTranslate();

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const modalVariants = {
    hidden: { opacity: 0, x: "100%", scale: 1 },
    visible: {
      opacity: 1,
      x: "0%",
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: "100%",
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {openModalGift && (
        <motion.section
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
        >
          <div className="relative z-50 w-full pt-10">
            <div className="w-screen lg:w-[768px] mx-auto text-white bg-[#151515] px-10 pb-10 py-6 rounded-xl relative mb-10">
              <button
                onClick={() => setOpenModalGift(false)}
                className="absolute top-6 left-10 border rounded-full p-2"
              >
                <ArrowLeft />
              </button>
              <section className="overflow-hidden py-14">
                <h1 className="text-2xl font-semibold mb-8">
                  {t("gift.terimakasih")}
                </h1>
                <h2 className="text-md font-semibold mb-5">
                  {t("gift.pesan1")}
                </h2>
                <p className="text-sm font-light text-gray-200">
                  {t("gift.pesan2")} {user?.name} {t("gift.pesan3")}
                </p>

                <div className="mt-5">
                  <Image
                    src="https://res.cloudinary.com/du0tz73ma/image/upload/v1736782597/image_17_cpxamh.png"
                    width={857}
                    height={403}
                    alt="Asset Wedding Bintang & Ayu"
                    className="w-full"
                  />
                </div>

                <h2 className="text-2xl font-semibold mt-8">Transfer</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                  {[
                    {
                      url: "https://res.cloudinary.com/du0tz73ma/image/upload/v1736783268/image_22_i1uh9l.png",
                      background: "#D9D9D9",
                      padding: "2.5rem",
                      account: "1751 1376 35",
                      name: "AYU STEVANI SINAGA",
                    },
                    {
                      url: "https://res.cloudinary.com/dilb4d364/image/upload/v1749675200/419d0e7a-5e9c-43bb-83a9-00f056156e38.png",
                      background: "#D9D9D9",
                      padding: "2.5rem",
                      account: "105 002 1416908",
                      name: "BINTANG CATO JEREMIA L TOBING",
                    },
                    {
                      url: "https://res.cloudinary.com/du0tz73ma/image/upload/v1736783264/image_23_bqwhpf.png",
                      background: "#01343B",
                      padding: "4rem",
                      account: "0000 2191 3645",
                      name: "BINTANG CATO JEREMIA L TOBING",
                    },
                    {
                      url: "https://res.cloudinary.com/du0tz73ma/image/upload/v1736783258/image_25_dg0v1x.png",
                      background: "#D9D9D9",
                      padding: "2rem",
                      account: "9014 6720 8839",
                      name: "BINTANG CATO JEREMIA L TOBING",
                    },
                    {
                      url: "https://res.cloudinary.com/du0tz73ma/image/upload/v1736783258/image_25_dg0v1x.png",
                      background: "#D9D9D9",
                      padding: "1rem",
                      account: "9015 9696 8041",
                      name: "AYU STEVANI SINAGA",
                    },
                  ].map(
                    ({ account, name, url, background, padding }, index) => (
                      <div key={index}>
                        <div
                          style={{
                            background,
                            paddingTop: padding,
                            paddingBottom: padding,
                          }}
                          className="rounded-xl"
                        >
                          <Image
                            className="mx-auto"
                            src={url}
                            width={300}
                            height={300}
                            alt="Asset Wedding Bintang & Ayu"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-5">
                          <p className="text-2xl font-semibold">{account}</p>
                          <ClipboardCopyIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => handleCopy(account)}
                          />
                        </div>
                        {copied === account && (
                          <span className="text-green-500 text-sm">
                            Copied!
                          </span>
                        )}
                        <p className="text-gray-300 font-light">
                          {t("gift.atas_nama")}
                        </p>
                        <p className="text-gray-300 font-light">{name}</p>
                      </div>
                    )
                  )}
                </div>

                <h2 className="text-2xl font-semibold mt-8">
                  Transfer dari Luar Negeri?
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                  <div>
                    <div className="bg-[#9FE870] py-10 rounded-xl">
                      <Image
                        className="mx-auto"
                        src="https://res.cloudinary.com/du0tz73ma/image/upload/v1736783255/image_26_ajuzzj.png"
                        width={300}
                        height={300}
                        alt="Asset Wedding Bintang & Ayu"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <p className="text-xl font-semibold">
                        bintangjtobing@gmail.com
                      </p>
                      <ClipboardCopyIcon
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => handleCopy("bintangjtobing@gmail.com")}
                      />
                    </div>
                    {copied === "bintangjtobing@gmail.com" && (
                      <span className="text-green-500 text-sm">Copied!</span>
                    )}
                    <p className="text-gray-300 font-light">
                      {t("gift.atas_nama")}
                    </p>
                    <p className="text-gray-300 font-light">
                      BINTANG CATO JEREMIA L TOBING
                    </p>
                  </div>
                  <div>
                    <div className="bg-[#2d2d2d] py-10 rounded-xl">
                      <Image
                        className="mx-auto h-24 w-24"
                        src="https://res.cloudinary.com/dilb4d364/image/upload/v1736930478/469c239d-f604-478d-b4d4-bf1b502b8508.png"
                        width={300}
                        height={300}
                        alt="Asset Wedding Bintang & Ayu"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <p className="text-xs lg:text-sm font-semibold w-full">
                        TSQ4Mgu431dghWzu7U6McftK2hTJ7QVoz3
                      </p>
                      <ClipboardCopyIcon
                        className="h-6 w-6 cursor-pointer"
                        onClick={() =>
                          handleCopy("TSQ4Mgu431dghWzu7U6McftK2hTJ7QVoz3")
                        }
                      />
                    </div>
                    {copied === "TSQ4Mgu431dghWzu7U6McftK2hTJ7QVoz3" && (
                      <span className="text-green-500 text-sm">Copied!</span>
                    )}
                    <p className="text-gray-300 font-light">USDT (TRC20)</p>
                  </div>
                </div>
              </section>
              <Footer />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
