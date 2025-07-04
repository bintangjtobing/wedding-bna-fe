"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Modal } from "./Modal";
import { GuestScreen } from "./guestScreen";
import { motion } from "framer-motion";
import { ModalForMoreCollections } from "./Modal/ModalForMoreCollections";
import { ModalForGift } from "./Modal/ModalForGift";
import { useTranslate } from "@/context/LanguageContext";
import { trackOpenInvitation } from "@/utils/analytics";

export default function Home() {
  const t = useTranslate();
  const [open, setOpen] = useState<boolean>(false);
  const [openGuest, setOpenGuest] = useState<boolean>(true);
  const [openModalCollection, setOpenModalCollection] =
    useState<boolean>(false);
  const [openModalGift, setOpenModalGift] = useState<boolean>(false);
  // const searchParams = useSearchParams();
  // const invite = searchParams.get('we-invite');

  // Referensi ke elemen video
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video autoplay for Safari
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set video properties for Safari compatibility
      video.muted = true;
      video.playsInline = true;
      
      // Try to play video after component mounts
      const playVideo = async () => {
        try {
          await video.play();
          console.log('Video autoplay successful');
        } catch (error) {
          console.log('Autoplay prevented, will play on user interaction:', error);
          
          // If autoplay fails, try to play on any user interaction
          const handleUserInteraction = async () => {
            try {
              await video.play();
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
            } catch (err) {
              console.log('Manual play also failed:', err);
            }
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        }
      };
      
      // Small delay to ensure video is loaded
      setTimeout(playVideo, 500);
    }
  }, []);

  // Variants untuk animasi
  const motionVariants = {
    hidden: { x: "100%", opacity: 0 }, // Kondisi awal
    visible: { x: 0, opacity: 1 }, // Kondisi akhir
  };

  // Fungsi untuk mengontrol video
  const handleOpenChange: React.Dispatch<React.SetStateAction<boolean>> = (
    isOpen
  ) => {
    if (isOpen) {
      trackOpenInvitation();
    }
    setOpen(isOpen);
    if (videoRef.current) {
      if (isOpen) {
        videoRef.current.pause(); // Hentikan video jika modal terbuka
      } else {
        videoRef.current.play(); // Lanjutkan video jika modal tertutup
      }
    }
  };

  return (
    <>
      <ModalForMoreCollections
        openModalCollection={openModalCollection}
        setOpenModalCollection={setOpenModalCollection}
      />
      <ModalForGift
        openModalGift={openModalGift}
        setOpenModalGift={setOpenModalGift}
      />
      <Modal
        setOpemModalCollection={setOpenModalCollection}
        openModalCollection={openModalCollection}
        setOpenModalGift={setOpenModalGift}
        open={open}
        setOpen={setOpen}
        // parameter={invite || "jhon-dea"}
      />
      <GuestScreen openGuest={openGuest} setOpenGuest={setOpenGuest} />
      <section className="fixed w-screen">
        <div className="relative">
          <nav className="w-full mx-auto py-5 px-3 absolute top-0 z-10">
            <div className="max-w-screen-xxl mx-auto pl-5 pt-10 lg:pl-32 lg:pt-20">
              <Image
                className=""
                src={
                  "https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1736927089/BINTANGAYU-logoweb_kmycu4.png"
                }
                width={180}
                height={120}
                alt="Logo Wedding Bintang & Ayu"
              />
            </div>
          </nav>
          
          {/* Safari-compatible video with enhanced autoplay */}
          <video
            ref={videoRef}
            className="h-screen object-cover w-screen"
            muted
            loop
            playsInline
            preload="auto"
            id="prawedding-bintang-ayu-clip"
            poster="https://res.cloudinary.com/dilb4d364/image/upload/w_1920,h_1080,c_fill/q_auto/f_auto/v1749675453/bintang-ayu-1_tq8zas.jpg"
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)",
            }}
            onLoadedData={() => {
              // Try to play when video data is loaded
              const video = videoRef.current;
              if (video) {
                video.play().catch(err => {
                  console.log('Video play on loaded data failed:', err);
                });
              }
            }}
            onCanPlay={() => {
              // Another attempt when video can play
              const video = videoRef.current;
              if (video) {
                video.play().catch(err => {
                  console.log('Video play on can play failed:', err);
                });
              }
            }}
          >
            {/* MP4 first for Safari compatibility */}
            <source
              src="https://res.cloudinary.com/dilb4d364/video/upload/w_1920,q_auto,f_auto/v1737136144/prawedding-ba-1_vbgkrh.mp4"
              type="video/mp4"
            />
            <source
              src="https://res.cloudinary.com/dilb4d364/video/upload/w_1920,q_auto,f_auto/v1737136144/prawedding-ba-1_vbgkrh.webm"
              type="video/webm"
            />
            {/* Fallback image for browsers that don't support video */}
            <div 
              className="h-screen w-screen bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://res.cloudinary.com/dilb4d364/image/upload/w_1920,h_1080,c_fill/q_auto/f_auto/v1749675453/bintang-ayu-1_tq8zas.jpg')"
              }}
            />
          </video>
          
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          ></div>

          <div className="mx-auto pl-5 lg:pl-32 absolute bottom-40 w-full z-20">
            <Image
              src={
                "https://res.cloudinary.com/du0tz73ma/image/upload/v1733231582/image_3_gkyqke.png"
              }
              width={100}
              height={100}
              alt="nikahfix-series"
            />
            <div className="text-white mt-3 lg:mt-5">
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-5 lg:mb-5">
                {t("intro.nama_pasangan")} <br /> {t("intro.sebelum_hari")}
              </h1>
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <button className="bg-white text-gray-950 py-2 px-3 lg:py-4 lg:px-9 rounded-md text-sm lg:text-2xl font-semibold">
                    {t("intro.segera_hadir")}
                  </button>
                  <button
                    onClick={() => {
                      // Try to play video on button click (user interaction)
                      const video = videoRef.current;
                      if (video && video.paused) {
                        video.play().catch(err => console.log('Play on button click failed:', err));
                      }
                      handleOpenChange(true);
                    }}
                    className="text-white py-2 px-3 lg:py-4 lg:px-9 rounded-md text-sm lg:text-2xl font-semibold flex gap-1 items-center"
                    style={{
                      backgroundColor: "rgba(249, 250, 251, 0.3)",
                    }}
                  >
                    <svg
                      className="lg:w-8 lg:h-8 h-4 w-4 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("intro.buka_undangan")}
                  </button>
                </div>
                <div className="relative">
                  <motion.div
                    variants={motionVariants} // Menggunakan variants
                    initial="hidden" // Kondisi awal
                    animate={openGuest ? "hidden" : "visible"} // Animasi berdasarkan openGuest
                    transition={{
                      type: "tween",
                      duration: 0.9, // Durasi animasi
                      delay: openGuest ? 0 : 0.8, // Tambahkan jeda saat openGuest berubah menjadi false
                      ease: "easeOut",
                    }}
                    style={{ backgroundColor: "rgba(2, 6, 23, 0.7)" }}
                    className="border-l-4 border-white px-4 py-2 absolute w-max right-0 bottom-[-4rem] lg:bottom-0"
                  >
                    <p className="text-white">{t("intro.tanggal")}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}