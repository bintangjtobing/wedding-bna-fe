import React, { useEffect } from "react";
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

// Optimized blur placeholder for better loading experience
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

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
        src={src}
        width={500}
        height={500}
        loading="lazy"
        alt={alt}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="aspect-square transition-transform duration-700 group-hover:scale-105"
        style={{
          objectFit: "cover",
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

        // Cari elemen ikon dan hapus background-nya dengan type casting
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
      icon: "toast-icon", // Tambahkan class khusus untuk ikon
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
    trackModalOpen("Gift");
    setOpenModalGift(true);
    setOpen(false);
  };
  const handleCalendarClick = (eventType: string, url: string) => {
    // Track calendar add event
    trackCalendarAdd(eventType);
    // Navigate to the calendar URL
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleLoadMoreCollections = () => {
    // Track load more collections event
    trackLoadMoreCollections();
    trackModalOpen("Collections");
    setOpemModalCollection(true);
  };
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 1, // Modal akan mengecil saat menghilang
    },
    visible: {
      opacity: 1,
      scale: 1, // Modal membesar ke ukuran normal
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8, // Modal mengecil lagi saat menghilang
      x: "100%", // Modal bergerak ke kiri
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
              onClick={() => setOpen(false)} // Klik overlay untuk menutup modal
            ></motion.div>
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
                    <video
                      className="object-cover aspect-video rounded-t-3xl"
                      autoPlay
                      loop
                      id="prawedding-bintang-ayu-clip"
                    >
                      <source
                        src="https://res.cloudinary.com/dilb4d364/video/upload/w_2000/q_auto/f_auto/v1737136144/prawedding-ba-1_vbgkrh.webm"
                        type="video/webm"
                      />
                    </video>
                    <div className="relative h-full w-full">
                      <div
                        className="rounded-t-3xl"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparency
                          zIndex: 1,
                        }}
                      ></div>
                      <div className="absolute z-50 bottom-7 w-full px-5 lg:px-10">
                        <Image
                          src="https://res.cloudinary.com/du0tz73ma/image/upload/w_200/q_auto/f_auto/v1733231582/image_3_gkyqke.png"
                          width={100}
                          height={100}
                          loading="eager"
                          priority={true}
                          alt="nikahfix-series"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
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
                    <div className="lg:w-[70%]">
                      <p className="mb-3 lg:mb-5 text-sm lg:text-base">
                        {t("pasangan.cerita_singkat")}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400 font-light">
                        {t("pasangan.kutipan_alkitab")}
                      </p>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {t("pengumuman.judul")}
                      </h2>
                      <Image
                        src="https://res.cloudinary.com/dilb4d364/image/upload/w_1200,h_600,c_fill/q_auto/f_auto/v1749675453/bintang-ayu-1_tq8zas.jpg"
                        width={2000}
                        height={1000}
                        alt="Asset Wedding Bintang & Ayu"
                        className="w-full aspect-video mt-5 rounded-3xl"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        sizes="(max-width: 768px) 100vw, 1080px"
                      />

                      <h4 className="mt-5 font-bold text-xl lg:text-xl">
                        {t("pengumuman.pengantar")}
                      </h4>
                      <div className="mt-5 text-sm lg:text-base">
                        {(() => {
                          const fullText = t("pengumuman.isi");

                          // Split berdasarkan "Dengan penuh cinta,"
                          const beforeSignature = fullText.split(
                            "Dengan penuh cinta,"
                          )[0];
                          const afterSignature = fullText.split(
                            "Dengan penuh cinta,"
                          )[1];

                          // Split bagian setelah signature untuk memisahkan nama
                          const beforeNames = afterSignature
                            ? afterSignature.split(
                                "Bintang Tobing & Ayu Sinaga"
                              )[0]
                            : "";
                          const namesAndHeart =
                            "Bintang Tobing & Ayu Sinaga ❤️";

                          // Function untuk convert text dengan \n menjadi React elements
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
                                      {/* Jika line kosong, render sebagai spacing */}
                                      {isEmptyLine ? (
                                        <div className="h-4"></div> // Spacing untuk line kosong
                                      ) : (
                                        <>
                                          {line}
                                          {/* Jika line berikutnya ada dan bukan kosong, tambah <br /> */}
                                          {index < array.length - 1 &&
                                            !isEmptyLine &&
                                            !nextLineEmpty && <br />}
                                          {/* Jika line berikutnya kosong (double break), tambah margin */}
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
                              {/* Text sebelum signature */}
                              <div>{renderTextWithBreaks(beforeSignature)}</div>

                              {/* "Dengan penuh cinta," */}
                              <div className="mt-4 mb-2">
                                Dengan penuh cinta,
                              </div>

                              {/* Tanda tangan */}
                              <div className="flex justify-start my-6">
                                <Image
                                  src="https://res.cloudinary.com/dilb4d364/image/upload/w_300/q_auto/f_auto/v1750281053/signature-bintang-ayu-white_dnodsy.png"
                                  width={150}
                                  height={100}
                                  alt="Tanda Tangan Bintang & Ayu"
                                  className="opacity-100 filter drop-shadow-sm"
                                  loading="lazy"
                                  placeholder="blur"
                                  blurDataURL={BLUR_DATA_URL}
                                />
                              </div>

                              {/* Nama pasangan */}
                              <div className="text-left font-medium mb-2">
                                {namesAndHeart}
                              </div>

                              {/* Text tambahan jika ada setelah nama */}
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
                    <div className="mt-8">
                      <h2 className="font-bold text-2xl lg:text-3xl">
                        {t("pengantin.judul")}
                      </h2>
                      <div className="grid lg:grid-cols-2 gap-10 mt-8">
                        <div>
                          <BrideGroomPhoto
                            src="https://res.cloudinary.com/dilb4d364/image/upload/w_600,h_600,c_fill/q_auto/f_auto/v1737136694/IMG_1871_uvkjbd.jpg"
                            alt="Asset Wedding Bintang & Ayu - Pengantin Wanita"
                            delay={0}
                          />
                          <div className="">
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
                            src="https://res.cloudinary.com/dilb4d364/image/upload/w_600,h_600,c_fill/q_auto/f_auto/v1749929950/JON00751_hz0iwi.jpg"
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

                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-xl font-bold mb-5 lg:mb-8">
                        {t("acara.judul_pemberkatan")}
                      </h2>
                      <Image
                        src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1080,h_550/q_auto/f_auto/v1750084942/488d9ec0-6342-4fe4-9eb3-884163f97f1e.png"
                        width={1031}
                        height={400}
                        alt="Asset Wedding Bintang & Ayu"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="w-full rounded-3xl"
                        sizes="(max-width: 768px) 100vw, 1080px"
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
                    <div className="mt-8">
                      <Image
                        src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1080,h_550/q_auto/f_auto/v1750084956/6eed01fd-0f93-4445-a6c1-fd859fb71187.png"
                        width={1031}
                        height={403}
                        alt="Asset Wedding Bintang & Ayu"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="w-full rounded-3xl"
                        sizes="(max-width: 768px) 100vw, 1080px"
                      />
                      <h2 className="lx:text-3xl text-xl font-bold mb-2 mt-8">
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
                    <div className="mt-8 space-y-5 lg:space-y-10">
                      <h2 className="lg:text-3xl text-2xl font-bold mb-2 lg:mb-8">
                        {t("kisah_cinta.judul")}
                      </h2>
                      <div className="">
                        <div>
                          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                            <Image
                              src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_600,h_400,g_faces,z_0.7/q_auto/f_auto/v1749675740/How-we-meet-each_arrzc8.jpg"
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={BLUR_DATA_URL}
                              style={{
                                objectFit: "cover",
                                borderRadius: "1rem",
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
                      <div>
                        <div>
                          <div className="flex flex-col lg:flex-row gap-5">
                            <Image
                              src="https://res.cloudinary.com/dilb4d364/image/upload/w_600,h_400,c_fill/q_auto/f_auto/v1749675739/the-begining-of-forever_msmt5f.jpg"
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={BLUR_DATA_URL}
                              style={{
                                objectFit: "cover",
                                borderRadius: "1rem",
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
                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-2xl font-bold lg:mb-10 mb-5">
                        {t("galeri.judul")}
                      </h2>
                      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
                        <Image
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749677350/Fotoud55_klluze.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <div className="relative">
                          <Image
                            src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749930054/JON00963-3_1_vzem4m.jpg"
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            className="rounded-2xl absolute"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749677350/Uud40_jphmyn.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <Image
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749929952/JON00837-3_ce3s9k.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <Image
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749929954/JON00599_wjbhn0.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <div className="relative">
                          <Image
                            src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749677352/Foto_revisi_6_dowzmz.jpg"
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            className="rounded-2xl"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749929949/JON00678_klufwg.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <Image
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749929952/edit-00943_mnw1qi.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <Image
                          src="https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_400,h_600/q_auto/f_auto/v1749929949/JON00667_behru6.jpg"
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="rounded-2xl"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>

                      <button
                        onClick={handleLoadMoreCollections}
                        className="block w-full py-3 rounded-md font-semibold bg-[#EB2929] text-center mt-8"
                      >
                        {t("galeri.muat_lebih")}
                      </button>
                    </div>
                    <Messages
                      handleClickOpenModalGift={handleClickOpenModalGift}
                    />
                    <Form
                      setAttend={setAttend}
                      setName={setName}
                      name={name}
                      setMessage={setMessage}
                      handleClick={handleClick}
                    />
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
}