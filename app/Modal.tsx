import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { postAttendance } from "./services/attendance";
import Swal from "sweetalert2";
import { Footer } from "./footer/Footer";
import { Form } from "./Form";
import { useUser } from "@/context/UserContext";
import { Messages } from "@/components/commons/Messages";
import { useTranslate } from "@/context/LanguageContext";
import { trackSendingGiftClick } from "@/utils/analytics";
import {
  trackLoadMoreCollections,
  trackSendMessage,
  trackCalendarAdd,
  trackModalOpen,
} from "@/utils/analytics";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModalCollection: boolean;
  setOpemModalCollection: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalGift: React.Dispatch<React.SetStateAction<boolean>>;
}

// Generate optimized blur placeholder for Safari compatibility
const generateBlurDataURL = (width: number = 8, height: number = 6) => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#374151;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>`
  )}`;
};

// Safari-optimized image styles
const safariImageStyles = {
  WebkitTransform: "translateZ(0)",
  transform: "translateZ(0)",
};

const BrideGroomPhoto = ({
  src,
  alt,
  delay = 0,
}: {
  src: string;
  alt: string;
  delay?: number;
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl aspect-square group">
      <Image
        quality={85}
        src={src}
        width={500}
        height={500}
        loading="eager"
        alt={alt}
        placeholder="blur"
        blurDataURL={generateBlurDataURL()}
        className="aspect-square transition-transform duration-700 group-hover:scale-105"
        style={{
          objectFit: "cover",
          ...safariImageStyles,
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Efek Kilau Kaca */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(
            135deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 70%
          )`,
          animation: `shimmer 3s ease-in-out infinite ${delay}s`,
        }}
      />

      {/* Overlay untuk efek kaca yang lebih halus */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 75%,
            transparent 100%
          )`,
          animation: `shimmerSlow 4s ease-in-out infinite ${delay + 1}s`,
        }}
      />

      {/* CSS untuk animasi kilau */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(90deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(90deg);
            opacity: 0;
          }
        }

        @keyframes shimmerSlow {
          0% {
            transform: translateX(-120%) translateY(-120%) rotate(90deg);
            opacity: 0;
          }
          30% {
            opacity: 0.3;
          }
          70% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(120%) translateY(120%) rotate(90deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const Modal: React.FC<DialogProps> = ({
  open,
  setOpen,
  setOpemModalCollection,
  openModalCollection,
  setOpenModalGift,
}) => {
  const t = useTranslate();
  const { user } = useUser();
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [attend, setAttend] = useState<string>("tidak_hadir");
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video autoplay with sound for Android compatibility
  useEffect(() => {
    const video = videoRef.current;
    if (video && open) {
      // Reset video state when modal opens
      video.muted = true;
      setVideoMuted(true);

      // Try to autoplay
      const playVideo = async () => {
        try {
          await video.play();
          // If autoplay succeeds, video will be muted by default
          // User can click to unmute
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      };

      // Small delay to ensure video is loaded
      setTimeout(playVideo, 100);
    }
  }, [open]);

  const toggleVideoSound = () => {
    const video = videoRef.current;
    if (video) {
      if (video.muted) {
        video.muted = false;
        video.volume = 0.7;
        setVideoMuted(false);
      } else {
        video.muted = true;
        setVideoMuted(true);
      }
    }
  };

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
      setUserName(user.username);
    }
  }, [user]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      const toastEl = Swal.getPopup();

      if (toastEl) {
        toastEl.classList.add("toast-with-left-border");

        const iconEl = toastEl.querySelector(".swal2-icon") as HTMLElement;
        if (iconEl) {
          iconEl.style.backgroundColor = "transparent";
        }
      }

      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    background: "#222222",
    color: "#ffffff",
    iconColor: "#4BB543",
    customClass: {
      popup: "toast-popup",
      title: "toast-title",
      icon: "toast-icon",
    },
  });

  const handleClick = async () => {
    try {
      trackSendMessage({
        hasName: !!name,
        hasMessage: !!message,
        attendance: attend,
      });
      const response = await postAttendance({
        name: name,
        username: username,
        message: message,
        attendance: attend,
      });
      if (response.status === "success") {
        Toast.fire({
          theme: "dark",
          icon: "success",
          title: "Pesan berhasil terkirim",
          background: "#ffffff",
          iconColor: "#4BB543",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenModalGift = () => {
    trackSendingGiftClick();
    trackModalOpen("Gift");
    setOpenModalGift(true);
    setOpen(false);
  };

  const handleCalendarClick = (eventType: string, url: string) => {
    trackCalendarAdd(eventType);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLoadMoreCollections = () => {
    trackLoadMoreCollections();
    trackModalOpen("Collections");
    setOpemModalCollection(true);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: "100%",
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <AnimatePresence>
        {open && !openModalCollection && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.section
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 z-40 flex items-center justify-center"
            >
              <div className="absolute z-50 w-full h-screen">
                <div className="w-screen lg:w-[1080px] mx-auto text-white overflow-hidden">
                  <div className="mt-20 rounded-t-3xl">
                    {/* Safari-compatible video with Android-friendly controls */}
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="object-cover aspect-video rounded-t-3xl w-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        id="prawedding-bintang-ayu-clip"
                        poster="https://res.cloudinary.com/dilb4d364/image/upload/v1749675453/bintang-ayu-1_tq8zas.jpg"
                        onClick={toggleVideoSound}
                      >
                        <source
                          src="https://res.cloudinary.com/dilb4d364/video/upload/v1737136144/prawedding-ba-1_vbgkrh.mp4"
                          type="video/mp4"
                        />
                        <source
                          src="https://res.cloudinary.com/dilb4d364/video/upload/v1737136144/prawedding-ba-1_vbgkrh.webm"
                          type="video/webm"
                        />
                        {/* Fallback for browsers that don't support video */}
                        <div className="bg-gray-800 aspect-video rounded-t-3xl flex items-center justify-center">
                          <Image
                            quality={85}
                            src="https://res.cloudinary.com/dilb4d364/image/upload/v1749675453/bintang-ayu-1_tq8zas.jpg"
                            width={1080}
                            height={608}
                            alt="Wedding Video Poster"
                            className="object-cover aspect-video rounded-t-3xl"
                            priority={true}
                          />
                        </div>
                      </video>

                      {/* Sound toggle button - positioned for mobile */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoSound();
                        }}
                        className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-200 z-10 touch-manipulation"
                        style={{
                          WebkitTapHighlightColor: "transparent",
                          touchAction: "manipulation",
                        }}
                        title={
                          videoMuted
                            ? "Tap to unmute video"
                            : "Tap to mute video"
                        }
                      >
                        {videoMuted ? (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.765L4.757 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.757l3.626-3.765a1 1 0 011.617.765zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.765L4.757 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.757l3.626-3.765a1 1 0 011.617.765zM12.22 8.22a1 1 0 011.56 0 5.5 5.5 0 010 7.56 1 1 0 01-1.56 0 3.5 3.5 0 000-4.95 1 1 0 010-1.39z"
                              clipRule="evenodd"
                            />
                            <path d="M14.657 2.757a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="relative h-full w-full">
                      <div
                        className="rounded-t-3xl"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                          zIndex: 1,
                        }}
                      />
                      <div className="absolute z-50 bottom-7 w-full px-5 lg:px-10">
                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/du0tz73ma/image/upload/v1733231582/image_3_gkyqke.png"
                          width={100}
                          height={100}
                          loading="eager"
                          priority={true}
                          alt="nikahfix-series"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL()}
                          style={safariImageStyles}
                        />
                        <h1 className="text-2xl lg:text-3xl font-extrabold mb-2">
                          {t("intro.nama_pasangan")} <br />{" "}
                          {t("intro.sebelum_hari")}
                        </h1>
                        <p>{t("intro.deskripsi")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151515] text-white px-5 lg:px-10 py-8">
                    {/* Info Section */}
                    <div className="lg:flex justify-between space-y-3 items-center text-gray-400 mb-3 lg:mb-5">
                      <p>
                        {t("intro.segera_hadir_dengan_tanggal")}
                        <sup>st</sup>{" "}
                        <span className="border text-sm px-2 ml-1">4K</span>{" "}
                        <span className="border text-sm px-2">17+</span>
                      </p>
                      <p className="text-white text-sm">
                        <span className="text-gray-400 text-xs">Cast:</span>{" "}
                        {t("pasangan.nama_lengkap_pasangan")}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="lg:w-[70%]">
                      <p className="mb-3 lg:mb-5 text-sm lg:text-base">
                        {t("pasangan.cerita_singkat")}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400 font-light">
                        {t("pasangan.kutipan_alkitab")}
                      </p>
                    </div>

                    {/* Announcement Section */}
                    <div className="mt-8">
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {t("pengumuman.judul")}
                      </h2>
                      <Image
                        quality={85}
                        src="https://res.cloudinary.com/dilb4d364/image/upload/v1749675453/bintang-ayu-1_tq8zas.jpg"
                        width={2000}
                        height={1000}
                        alt="Asset Wedding Bintang & Ayu"
                        className="w-full aspect-video mt-5 rounded-3xl"
                        style={{ objectFit: "cover", ...safariImageStyles }}
                        loading="eager"
                        placeholder="blur"
                        blurDataURL={generateBlurDataURL(16, 9)}
                        sizes="(max-width: 768px) 100vw, 1080px"
                      />

                      <h4 className="mt-5 font-bold text-xl lg:text-xl">
                        {t("pengumuman.pengantar")}
                      </h4>
                      <div className="mt-5 text-sm lg:text-base">
                        {(() => {
                          const fullText = t("pengumuman.isi");
                          const beforeSignature = fullText.split(
                            "Dengan penuh cinta,"
                          )[0];
                          const afterSignature = fullText.split(
                            "Dengan penuh cinta,"
                          )[1];
                          const beforeNames = afterSignature
                            ? afterSignature.split(
                                "Bintang Tobing & Ayu Sinaga"
                              )[0]
                            : "";
                          const namesAndHeart =
                            "Bintang Tobing & Ayu Sinaga ❤️";

                          const renderTextWithBreaks = (text: string) => {
                            return text
                              .replace(/<3/g, "❤️")
                              .split("\n")
                              .map(
                                (
                                  line: string,
                                  index: number,
                                  array: string[]
                                ) => {
                                  const isEmptyLine = line.trim() === "";
                                  const nextLineEmpty =
                                    array[index + 1] &&
                                    array[index + 1].trim() === "";

                                  return (
                                    <React.Fragment key={index}>
                                      {isEmptyLine ? (
                                        <div className="h-4"></div>
                                      ) : (
                                        <>
                                          {line}
                                          {index < array.length - 1 &&
                                            !isEmptyLine &&
                                            !nextLineEmpty && <br />}
                                          {index < array.length - 1 &&
                                            !isEmptyLine &&
                                            nextLineEmpty && (
                                              <div className="mb-4"></div>
                                            )}
                                        </>
                                      )}
                                    </React.Fragment>
                                  );
                                }
                              );
                          };

                          return (
                            <>
                              <div>{renderTextWithBreaks(beforeSignature)}</div>
                              <div className="mt-4 mb-2">
                                Dengan penuh cinta,
                              </div>
                              <div className="flex justify-start my-6">
                                <Image
                                  quality={85}
                                  src="https://res.cloudinary.com/dilb4d364/image/upload/v1750281053/signature-bintang-ayu-white_dnodsy.png"
                                  width={150}
                                  height={100}
                                  alt="Tanda Tangan Bintang & Ayu"
                                  className="opacity-100 filter drop-shadow-sm"
                                  loading="eager"
                                  placeholder="blur"
                                  blurDataURL={generateBlurDataURL()}
                                  style={safariImageStyles}
                                />
                              </div>
                              <div className="text-left font-medium mb-2">
                                {namesAndHeart}
                              </div>
                              {beforeNames && beforeNames.trim() && (
                                <div className="mt-2">
                                  {renderTextWithBreaks(beforeNames.trim())}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Bride & Groom Section */}
                    <div className="mt-8">
                      <h2 className="font-bold text-2xl lg:text-3xl">
                        {t("pengantin.judul")}
                      </h2>
                      <div className="grid lg:grid-cols-2 gap-10 mt-8">
                        <div>
                          <BrideGroomPhoto
                            src="https://res.cloudinary.com/dilb4d364/image/upload/v1737136694/IMG_1871_uvkjbd.jpg"
                            alt="Asset Wedding Bintang & Ayu - Pengantin Wanita"
                            delay={0}
                          />
                          <div>
                            <h3 className="lg:text-2xl text-xl font-bold mt-5">
                              {t("pengantin.pengantin_wanita")}
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base mt-2 lg:mt-3">
                              {t("pengantin.orang_tua_wanita")}
                            </p>
                          </div>
                        </div>
                        <div>
                          <BrideGroomPhoto
                            src="https://res.cloudinary.com/dilb4d364/image/upload/v1749929950/JON00751_hz0iwi.jpg"
                            alt="Asset Wedding Bintang & Ayu - Pengantin Pria"
                            delay={1.5}
                          />
                          <div>
                            <h3 className="lg:text-2xl text-xl font-bold mt-5">
                              {t("pengantin.pengantin_pria")}
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base mt-2 lg:mt-3">
                              {t("pengantin.orang_tua_pria")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blessing Event Section */}
                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-xl font-bold mb-5 lg:mb-8">
                        {t("acara.judul_pemberkatan")}
                      </h2>
                      <Image
                        quality={85}
                        src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_550/q_auto/f_auto/v1750084942/488d9ec0-6342-4fe4-9eb3-884163f97f1e.png"
                        width={1031}
                        height={400}
                        alt="Asset Wedding Bintang & Ayu"
                        loading="eager"
                        placeholder="blur"
                        blurDataURL={generateBlurDataURL(16, 11)}
                        className="w-full rounded-3xl"
                        sizes="(max-width: 768px) 100vw, 1080px"
                        style={safariImageStyles}
                      />
                      <h2 className="lg:text-3xl text-xl font-bold mb-2 mt-8">
                        {t("acara.lokasi_pemberkatan")}
                      </h2>
                      <div className="lg:flex items-center justify-between">
                        <div className="flex items-center gap-5 mb-3">
                          <div className="bg-gray-100 px-5 lg:px-10 py-3 lg:py-3 text-[#151515] w-fit text-md lg:text-xl font-semibold rounded-md">
                            <p>{t("acara.tanggal_pemberkatan")}</p>
                          </div>
                          <p className="font-semibold text-white text-base lg:text-lg">
                            {t("acara.waktu_pemberkatan")}
                          </p>
                        </div>
                        <p className="text-gray-200 font-light text-sm lg:text-base">
                          {t("acara.alamat_pemberkatan")}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleCalendarClick(
                            "Blessing",
                            "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pemberkatan+Pernikahan+Bintang+%26+Ayu&dates=20250711T030000Z/20250711T040000Z&details=Pemberkatan+Pernikahan+di+HKBP+GLUGUR+Resort+Medan+Utara.&location=HKBP+GLUGUR+Resort+Medan+Utara"
                          )
                        }
                        style={{
                          backgroundColor: "rgb(229, 9, 20)",
                        }}
                        className="w-full py-3 mt-3 block text-center rounded-md"
                      >
                        {t("acara.tambah_kalender")}
                      </button>
                    </div>

                    {/* Reception Event Section */}
                    <div className="mt-8">
                      <Image
                        quality={85}
                        src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_550/q_auto/f_auto/v1750084956/6eed01fd-0f93-4445-a6c1-fd859fb71187.png"
                        width={1031}
                        height={403}
                        alt="Asset Wedding Bintang & Ayu"
                        loading="eager"
                        placeholder="blur"
                        blurDataURL={generateBlurDataURL(16, 11)}
                        className="w-full rounded-3xl"
                        sizes="(max-width: 768px) 100vw, 1080px"
                        style={safariImageStyles}
                      />
                      <h2 className="lg:text-3xl text-xl font-bold mb-2 mt-8">
                        {t("acara.lokasi_resepsi")}
                      </h2>
                      <div className="lg:flex items-center justify-between">
                        <div className="flex items-center gap-5 mb-3">
                          <div className="bg-gray-100 px-5 lg:px-10 py-3 lg:py-3 text-[#151515] w-fit text-md lg:text-xl font-semibold rounded-md">
                            <p>{t("acara.tanggal_resepsi")}</p>
                          </div>
                          <p className="font-semibold text-white text-base lg:text-lg">
                            {t("acara.waktu_resepsi")}
                          </p>
                        </div>
                        <p className="text-gray-200 font-light text-sm lg:text-base">
                          {t("acara.alamat_resepsi")}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleCalendarClick(
                            "Reception",
                            "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pesta+Adat+Pernikahan+Bintang+%26+Ayu&dates=20250711T060000Z/20250711T070000Z&details=Pesta+Adat+Pernikahan+di+Wisma+Mahinna+Center.&location=Wisma+Mahinna+Center"
                          )
                        }
                        style={{
                          backgroundColor: "rgb(229, 9, 20)",
                        }}
                        className="w-full py-3 mt-3 block text-center rounded-md"
                      >
                        {t("acara.tambah_kalender")}
                      </button>
                    </div>

                    {/* Love Story Section - Complete with all 4 episodes */}
                    <div className="mt-8 space-y-5 lg:space-y-10">
                      <h2 className="lg:text-3xl text-2xl font-bold mb-2 lg:mb-8">
                        {t("kisah_cinta.judul")}
                      </h2>

                      {/* Episode 1 */}
                      <div className="">
                        <div>
                          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                            <Image
                              quality={85}
                              src="https://res.cloudinary.com/dilb4d364/image/upload/v1749675740/How-we-meet-each_arrzc8.jpg"
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                              loading="eager"
                              placeholder="blur"
                              blurDataURL={generateBlurDataURL(16, 9)}
                              style={{
                                objectFit: "cover",
                                borderRadius: "1rem",
                                ...safariImageStyles,
                              }}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-base">
                                {t("kisah_cinta.episode1_judul")}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t("kisah_cinta.episode1_durasi")}
                              </p>
                              <div className="mt-4 lg:text-lg text-xs text-gray-200">
                                {t("kisah_cinta.episode1_isi")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Episode 2 */}
                      <div>
                        <div>
                          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                            <Image
                              quality={85}
                              src="https://res.cloudinary.com/dilb4d364/image/upload/v1749675739/A-Love-that-Grows-With-Time_vpmirg.jpg"
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                              loading="eager"
                              placeholder="blur"
                              blurDataURL={generateBlurDataURL(16, 9)}
                              style={{
                                objectFit: "cover",
                                borderRadius: "1rem",
                                ...safariImageStyles,
                              }}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-base">
                                {t("kisah_cinta.episode2_judul")}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t("kisah_cinta.episode2_durasi")}
                              </p>
                              <div className="mt-4 lg:text-lg text-xs text-gray-200">
                                {t("kisah_cinta.episode2_isi")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Episode 3 */}
                      <div>
                        <div>
                          <div className="flex flex-col lg:flex-row items-start gap-5">
                            <Image
                              quality={85}
                              src="https://res.cloudinary.com/dilb4d364/image/upload/v1749675739/choose-to-spend-life-together_gfmk6r.jpg"
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                              loading="eager"
                              placeholder="blur"
                              blurDataURL={generateBlurDataURL(16, 9)}
                              style={{
                                objectFit: "cover",
                                borderRadius: "1rem",
                                ...safariImageStyles,
                              }}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-base">
                                {t("kisah_cinta.episode3_judul")}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t("kisah_cinta.episode3_durasi")}
                              </p>
                              <div className="mt-4 lg:text-lg text-xs text-gray-200">
                                {t("kisah_cinta.episode3_isi")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Episode 4 */}
                      <div>
                        <div>
                          <div className="flex flex-col lg:flex-row gap-5">
                            <Image
                              quality={85}
                              src="https://res.cloudinary.com/dilb4d364/image/upload/v1749675739/the-begining-of-forever_msmt5f.jpg"
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                              loading="eager"
                              placeholder="blur"
                              blurDataURL={generateBlurDataURL(16, 9)}
                              style={{
                                objectFit: "cover",
                                borderRadius: "1rem",
                                ...safariImageStyles,
                              }}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div>
                              <button className="bg-[#EB2929] lg:px-8 lg:py-2 px-4 py-1 text-xs lg:text-base text-white font-semibold rounded-md lg:mb-5 mb-2">
                                {t("kisah_cinta.segera_hadir")}
                              </button>
                              <h3 className="lg:text-3xl text-base">
                                {t("kisah_cinta.episode4_judul")}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t("kisah_cinta.episode4_durasi")}
                              </p>
                              <div className="mt-4 lg:text-lg text-xs text-gray-200">
                                {t("kisah_cinta.episode4_isi")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-2xl font-bold lg:mb-10 mb-5">
                        {t("galeri.judul")}
                      </h2>
                      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749677350/Fotoud55_klluze.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />

                        <div className="relative">
                          <Image
                            quality={85}
                            src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749930054/JON00963-3_1_vzem4m.jpg"
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            loading="eager"
                            placeholder="blur"
                            blurDataURL={generateBlurDataURL(4, 6)}
                            className="rounded-2xl absolute"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            style={safariImageStyles}
                          />
                          <div className="absolute bottom-4 w-full">
                            <div className="bg-[#EB2929] lg:py-2 lg:px-3 py-1 px-2 rounded-lg w-fit mx-auto">
                              <p className="lg:text-xl text-sm font-medium">
                                {t("galeri.favorit_pria")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749677350/Uud40_jphmyn.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />

                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929952/JON00837-3_ce3s9k.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />

                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929954/JON00599_wjbhn0.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />

                        <div className="relative">
                          <Image
                            quality={85}
                            src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749677352/Foto_revisi_6_dowzmz.jpg"
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            loading="eager"
                            placeholder="blur"
                            blurDataURL={generateBlurDataURL(4, 6)}
                            className="rounded-2xl"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            style={safariImageStyles}
                          />
                          <div className="absolute bottom-4 w-full">
                            <div className="bg-[#EB2929] lg:px-3 py-1 px-2 rounded-lg w-fit mx-auto">
                              <p className="lg:text-xl text-sm font-medium">
                                {t("galeri.favorit_wanita")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929949/JON00678_klufwg.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />

                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929952/edit-00943_mnw1qi.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />

                        <Image
                          quality={85}
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929949/JON00667_behru6.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="eager"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(4, 6)}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          style={safariImageStyles}
                        />
                      </div>

                      <button
                        onClick={handleLoadMoreCollections}
                        className="block w-full py-3 rounded-md font-semibold bg-[#EB2929] text-center mt-8"
                      >
                        {t("galeri.muat_lebih")}
                      </button>
                      {/* Gift Banner Section - NEW */}
                      <div className="mt-8">
                        <button
                          onClick={handleClickOpenModalGift}
                          className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        >
                          <Image
                            quality={85}
                            src="https://res.cloudinary.com/dilb4d364/image/upload/v1750925018/wedding-gift-banner_h4eu1g.png"
                            width={1200}
                            height={200}
                            alt="Wedding Gift Banner"
                            loading="eager"
                            placeholder="blur"
                            blurDataURL={generateBlurDataURL(1200, 200)}
                            className="w-full h-auto rounded-lg"
                            sizes="(max-width: 768px) 100vw, 1200px"
                            style={safariImageStyles}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Messages Component */}
                    <Messages
                      handleClickOpenModalGift={handleClickOpenModalGift}
                    />

                    {/* Form Component */}
                    <Form
                      setAttend={setAttend}
                      setName={setName}
                      name={name}
                      setMessage={setMessage}
                      handleClick={handleClick}
                    />

                    {/* Footer Component */}
                    <Footer />
                  </div>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
