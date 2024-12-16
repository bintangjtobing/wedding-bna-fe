'use client'

import Image from "next/image";
import ModalWelcome from "@/components/commons/Modal";
import ImageModal from "@/components/commons/ImageModal";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  return (
    <>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageUrl={selectedImageUrl}
      />
      <ModalWelcome />
      <section className="grid grid-rows-3 xl:grid-rows-1 xl:grid-cols-3 gap-6 border p-3 overflow-hidden">
        {/* Left Side */}
        <div className="grid grid-rows-7 gap-6">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732257734/unsplash_LVfRmw5yZeo_u2jbtn.png')}
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732257734/unsplash_LVfRmw5yZeo_u2jbtn.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="relative row-span-3 col-span-2 rounded-3xl backdrop-brightness-100 "
          >
            <div
              className="rounded-3xl"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                zIndex: 1,
              }}
            ></div>

            {/* Content */}
            <div className="flex flex-col justify-center items-center h-full text-white font-black italic text-5xl relative z-10">
              <div className="flex flex-col items-center">
                <span className="translate-x-[-5rem] mb-3">Bintang</span>
                <span>&</span>
                <span className="translate-x-[3rem]">Ayu</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732257978/unsplash_mfnZ2d8jXzA_j1apuo.png')}
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732257978/unsplash_mfnZ2d8jXzA_j1apuo.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="row-span-1 col-span-2 rounded-3xl relative "
          >
            <div
              className="rounded-3xl"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparency
                zIndex: 1,
              }}
            ></div>
            <div className="text-white text-center h-full flex px-5 items-end pb-3 justify-center font-semibold text-md 2xl:text-xl relative z-10">
              <p>
                Bintang & Ayu, wishing you both a beautiful life <br /> together
                filled with love
              </p>
            </div>
          </motion.div>

          <div className="row-span-3 grid grid-cols-2 gap-6 col-span-2">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="bg-gray-100 rounded-3xl text-center p-5 ">
              <p className="font-semibold mb-6 mt-1 text-lg 2xl:text-xl">
                So happy for you both! Cheers to love and happiness forever
              </p>
              <img
                onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732258139/unsplash_NU7bOw3_tnE_i6rdt0.png')}
                className="w-full rounded-xl"
                src="https://res.cloudinary.com/du0tz73ma/image/upload/v1732258139/unsplash_NU7bOw3_tnE_i6rdt0.png"
                alt="Celebration"
              />
            </motion.div>
            <div className="space-y-6">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732258293/unsplash_-Kc29c7lCBA_kini88.png')}
                className="h-[30%] rounded-3xl relative "
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732258293/unsplash_-Kc29c7lCBA_kini88.png')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div
                  className="rounded-3xl"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                    zIndex: 1,
                  }}
                ></div>
                <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                  <p>Wedding vows</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="h-[65%] rounded-3xl relative "
                onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732258174/unsplash_MiFp-2l-unc_uiz2ri.png')}
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732258174/unsplash_MiFp-2l-unc_uiz2ri.png')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="rounded-3xl"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                    zIndex: 1,
                  }}
                ></div>
                <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                  <p>True Commitment</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="grid grid-rows-4 gap-6">
          <div className="row-span-1 grid grid-cols-2 gap-6">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732276785/unsplash_P_HRPYpFTNA_kmtisn.png')}
              className="h-full w-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732276785/unsplash_P_HRPYpFTNA_kmtisn.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Endless Love</p>
              </div>
            </motion.div>
            <div className="bg-gray-100 h-full w-full rounded-3xl">
              <div className="text-gray-950 text-center h-full flex items-center justify-center font-bold text-xl 2xl:text-3xl">
                <p>The Beauty of Marriage</p>
              </div>
            </div>
          </div>

          <div className="row-span-2">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732276808/unsplash_hcn5gQ0-MzY_xz3zh7.png')}
              className="h-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732276808/unsplash_hcn5gQ0-MzY_xz3zh7.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white h-full flex pr-5 pt-3 justify-end text-end font-semibold text-xl 2xl:text-3xl relative z-10">
                <p>
                  The beauty of marriage is <br /> that it’s a lifelong journey{" "}
                  <br /> where love and <br /> commitment flourish <br /> every day.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="row-span-1">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277236/unsplash_aEnH4hJ_Mrs_1_l1oy79.png')}
              className="h-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277236/unsplash_aEnH4hJ_Mrs_1_l1oy79.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>
                  The wedding vows symbolize their lifelong commitment to each other
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid grid-rows-4 gap-6">
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.6, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277919/unsplash_N6O8Xuyhdsg_rby9cw.png')}
              className="w-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277919/unsplash_N6O8Xuyhdsg_rby9cw.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Marriage is the art</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.8, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277939/unsplash_zxj5bG9l6mM_z7uw2s.png')}
              className="w-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277939/unsplash_zxj5bG9l6mM_z7uw2s.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 px-2 justify-center font-semibold text-md 2xl:text-xl relative z-10">
                <p>
                  From this day forward, I vow to support, respect, and love you, for
                  all the days of our lives.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277968/unsplash_XySWtbETa1M_cdciup.png')}
              className="rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277968/unsplash_XySWtbETa1M_cdciup.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Eternal love</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3.1, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277995/unsplash_BlKIiqK-H78_qipuq6.png')}
              className="rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732277995/unsplash_BlKIiqK-H78_qipuq6.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Sacred Bond</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3.2, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278015/unsplash_436ZVxZOtEM_hbtubx.png')}
              className="rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278015/unsplash_436ZVxZOtEM_hbtubx.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 2,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Pure Devotion</p>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-6">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3.3, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278037/unsplash_IfjHaIoAoqE_bd7xfd.png')}
              className="w-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278037/unsplash_IfjHaIoAoqE_bd7xfd.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-start px-5 pt-5 pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>
                  The beauty of marriage lies in two souls becoming one, creating a
                  journey filled with love, trust, and endless memories.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3.4, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278066/unsplash_bD4hxyaKf5A_fe2kd9.png')}
              className="w-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278066/unsplash_bD4hxyaKf5A_fe2kd9.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Forever Together</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              onClick={() => handleImageClick('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278086/unsplash_OcF9ZomsdL8_amvapd.png')}
              className="w-full rounded-3xl relative "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/du0tz73ma/image/upload/v1732278086/unsplash_OcF9ZomsdL8_amvapd.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparency
                  zIndex: 1,
                }}
              ></div>
              <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10">
                <p>Lifelong Journey</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
