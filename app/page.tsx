"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Modal } from "./Modal";
import { GuestScreen } from "./guestScreen";
import { motion } from "framer-motion";
import { ModalForMoreCollections } from "./Modal/ModalForMoreCollections";
import { ModalForGift } from "./Modal/ModalForGift";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [openGuest, setOpenGuest] = useState<boolean>(true);
  const [openModalCollection, setOpenModalCollection] = useState<boolean>(false)
  const [openModalGift, setOpenModalGift] = useState<boolean>(false)

  // Referensi ke elemen video
  const videoRef = useRef<HTMLVideoElement>(null);

  // Variants untuk animasi
  const motionVariants = {
    hidden: { x: "100%", opacity: 0 }, // Kondisi awal
    visible: { x: 0, opacity: 1 }, // Kondisi akhir
  };

  // Fungsi untuk mengontrol video
  const handleOpenChange: React.Dispatch<React.SetStateAction<boolean>> = (
    isOpen
  ) => {
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
      <ModalForMoreCollections openModalCollection={openModalCollection} setOpenModalCollection={setOpenModalCollection}/>
      <ModalForGift openModalGift={openModalGift} setOpenModalGift={setOpenModalGift}/>
      <Modal 
        setOpemModalCollection={setOpenModalCollection} 
        openModalCollection={openModalCollection} 
        setOpenModalGift={setOpenModalGift}
        open={open} 
        setOpen={setOpen} 
        parameter="john-doe"
      />
      <GuestScreen openGuest={openGuest} setOpenGuest={setOpenGuest} />
      <section className="fixed w-screen">
        <div className="relative">
          <video
            ref={videoRef} // Tambahkan referensi ke elemen video
            className="h-screen object-cover"
            autoPlay
            muted
            loop
            id="myVideo"
          >
            <source
              src="https://res.cloudinary.com/du0tz73ma/video/upload/v1733931845/videoplayback_fwiym8.mp4"
              type="video/mp4"
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
          <nav className="w-full mx-auto py-5 px-3 absolute top-0">
            <div className="max-w-screen-xxl mx-auto px-10">
              <Image
                className=""
                src={
                  "https://res.cloudinary.com/du0tz73ma/image/upload/v1733230643/image_1_toske2.png"
                }
                width={120}
                height={120}
                alt="logo"
              />
            </div>
          </nav>

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
                Bintang & Ayu <br /> Sebelum hari H
              </h1>
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <button className="bg-white text-gray-950 py-2 px-3 lg:py-4 lg:px-9 rounded-md text-sm lg:text-2xl font-semibold">
                    Coming soon
                  </button>
                  <button
                    onClick={() => handleOpenChange(true)}
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
                    Buka detail
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
                    <p className="text-white">11 Juli 2025</p>
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
