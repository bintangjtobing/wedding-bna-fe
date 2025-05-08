import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Collaps } from "./collapsible";
import Link from "next/link";
import { useState } from "react";
import { postAttendance } from "./services/attendance";
import Swal from "sweetalert2";
import { Footer } from "./footer/Footer";
import { Form } from "./Form";
import { useUser } from "@/context/UserContext";
import { Messages } from "@/components/commons/Messages";
import { useTranslate } from "@/context/LanguageContext";
import FormattedText from "@/lib/FormatedText";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModalCollection: boolean;
  setOpemModalCollection: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalGift: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<DialogProps> = ({
  open,
  setOpen,
  setOpemModalCollection,
  openModalCollection,
  setOpenModalGift,
}) => {
  const t = useTranslate()
  const { user } = useUser()
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("")
  const [message, setMessage] = useState<string>("");
  const [attend, setAttend] = useState<string>("tidak_hadir");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
      setUserName(user.username)
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
        toastEl.classList.add('toast-with-left-border');

        // Cari elemen ikon dan hapus background-nya dengan type casting
        const iconEl = toastEl.querySelector('.swal2-icon') as HTMLElement;
        if (iconEl) {
          iconEl.style.backgroundColor = 'transparent';
        }
      }

      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    background: "#222222",
    color: "#ffffff",
    iconColor: "#4BB543",
    customClass: {
      popup: 'toast-popup',
      title: 'toast-title',
      icon: 'toast-icon' // Tambahkan class khusus untuk ikon
    }
  });

  const handleClick = async () => {
    try {
      const response = await postAttendance(
        {
          name: name,
          username: username,
          message: message,
          attendance: attend
        },
      );
      if (response.status === "success") {
        Toast.fire({
          theme: "dark",
          icon: "success",
          title: "Pesan berhasil terkirim",
          background: "#ffffff",
          iconColor: "#4BB543"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenModalGift = () => {
    setOpenModalGift(true);
    setOpen(false);
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
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733231582/image_3_gkyqke.png"
                          }
                          width={100}
                          height={100}
                          alt="nikahfix-series"
                        />
                        <h1 className="text-2xl lg:text-3xl font-extrabold mb-2">
                          {t('intro.nama_pasangan')} <br /> {t('intro.sebelum_hari')}
                        </h1>
                        <p>{t('intro.deskripsi')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#151515] text-white px-5 lg:px-10 py-8">
                    <div className="lg:flex justify-between space-y-3 items-center text-gray-400 mb-3 lg:mb-5">
                      <p>
                        {t('intro.segera_hadir_dengan_tanggal')}<sup>st</sup>{" "}
                        <span className="border text-sm px-2 ml-1">4K</span>{" "}
                        <span className="border text-sm px-2">17+</span>
                      </p>
                      <p className="text-white text-sm">
                        <span className="text-gray-400 text-xs">Cast:</span>{" "}
                        {t('pasangan.nama_lengkap_pasangan')}
                      </p>
                    </div>
                    <div className="lg:w-[70%]">
                      <p className="mb-3 lg:mb-5 text-sm lg:text-base">
                        {t("pasangan.cerita_singkat")}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400 font-light">
                        {t('pasangan.kutipan_alkitab')}
                      </p>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {t("pengumuman.judul")}
                      </h2>
                      <Image
                        src={
                          "https://res.cloudinary.com/dilb4d364/image/upload/w_2000/q_auto/f_auto/v1737136266/JON00595_mwjayw.jpg"
                        }
                        width={2000}
                        height={1000}
                        alt="Asset Wedding Bintang & Ayu"
                        className="w-full aspect-video mt-5 rounded-3xl"
                        style={{ objectFit: "cover" }}
                      />

                      <h4 className="mt-5 font-bold text-xl lg:text-xl">
                        {t('pengumuman.pengantar')}
                      </h4>
                      <FormattedText
                        text={t('pengumuman.isi')}
                        className="mt-5 text-sm lg:text-base"
                      />
                    </div>
                    <div className="mt-8">
                      <h2 className="font-bold text-2xl lg:text-3xl">
                        {t('pengantin.judul')}
                      </h2>
                      <div className="grid lg:grid-cols-2 gap-10 mt-8">
                        <div>
                          <Image
                            src={
                              "https://res.cloudinary.com/dilb4d364/image/upload/ar_1:1,c_auto,g_auto,w_500/v1737136694/IMG_1871_uvkjbd.jpg"
                            }
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            className="aspect-square"
                            style={{
                              objectFit: "cover",
                              borderRadius: "1rem",
                            }}
                          />
                          <div className="">
                            <h3 className="lg:text-2xl text-xl font-bold mt-5">
                              {t('pengantin.pengantin_wanita')}
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base mt-2 lg:mt-3">
                              {t('pengantin.orang_tua_wanita')}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Image
                            src={
                              "https://res.cloudinary.com/dilb4d364/image/upload/ar_1:1,c_auto,g_auto,w_500/v1737136718/JON00635_jayl9u.jpg"
                            }
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            className="aspect-square"
                            style={{
                              objectFit: "cover",
                              borderRadius: "1rem",
                            }}
                          />
                          <div>
                            <h3 className="lg:text-2xl text-xl font-bold mt-5">
                              {t('pengantin.pengantin_pria')}
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base mt-2 lg:mt-3">
                              {t('pengantin.orang_tua_pria')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-xl font-bold mb-5 lg:mb-8">
                        {t('acara.judul_pemberkatan')}
                      </h2>
                      <Image
                        src={
                          "https://res.cloudinary.com/du0tz73ma/image/upload/v1733409293/image_2_vjflgs.png"
                        }
                        width={1031}
                        height={403}
                        alt="Asset Wedding Bintang & Ayu"
                        className="w-full rounded-3xl"
                      />
                      <h2 className="lg:text-3xl text-xl font-bold mb-2 mt-8">
                        {t('acara.lokasi_pemberkatan')}
                      </h2>
                      <div className="lg:flex items-center justify-between">
                        <div className="flex items-center gap-5 mb-3">
                          <div className="bg-gray-100 px-5 lg:px-10 py-3 lg:py-3 text-[#151515] w-fit text-md lg:text-xl font-semibold rounded-md">
                            <p>{t('acara.tanggal_pemberkatan')}</p>
                          </div>
                          <p className="font-semibold text-white text-base lg:text-lg">
                            {t('acara.waktu_pemberkatan')}
                          </p>
                        </div>
                        <p className="text-gray-200 font-light text-sm lg:text-base">
                          {t('acara.alamat_pemberkatan')}
                        </p>
                      </div>
                      <Link
                        href={
                          "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pemberkatan+Pernikahan+Bintang+%26+Ayu&dates=20250711T030000Z/20250711T040000Z&details=Pemberkatan+Pernikahan+di+HKBP+GLUGUR+Resort+Medan+Utara.&location=HKBP+GLUGUR+Resort+Medan+Utara"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "rgb(217,217,217, 0.5)",
                        }}
                        className="w-full py-3 mt-3 block text-center rounded-md"
                      >
                        {t('acara.tambah_kalender')}
                      </Link>
                    </div>
                    <div className="mt-8">
                      <Image
                        src={
                          "https://res.cloudinary.com/du0tz73ma/image/upload/v1733410635/image_3_mmfwm9.png"
                        }
                        width={1031}
                        height={403}
                        alt="Asset Wedding Bintang & Ayu"
                        className="w-full rounded-3xl"
                      />
                      <h2 className="lx:text-3xl text-xl font-bold mb-2 mt-8">
                        {t('acara.lokasi_resepsi')}
                      </h2>
                      <div className="lg:flex items-center justify-between">
                        <div className="flex items-center gap-5 mb-3">
                          <div className="bg-gray-100 px-5 lg:px-10 py-3 lg:py-3 text-[#151515] w-fit text-md lg:text-xl font-semibold rounded-md">
                            <p>{t('acara.tanggal_resepsi')}</p>
                          </div>
                          <p className="font-semibold text-white text-base lg:text-lg">
                            {t('acara.waktu_resepsi')}
                          </p>
                        </div>
                        <p className="text-gray-200 font-light text-sm lg:text-base">
                          {t('acara.alamat_resepsi')}
                        </p>
                      </div>
                      <Link
                        href={
                          "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pesta+Adat+Pernikahan+Bintang+%26+Ayu&dates=20250711T060000Z/20250711T070000Z&details=Pesta+Adat+Pernikahan+di+Wisma+Mahinna+Center.&location=Wisma+Mahinna+Center"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "rgb(217,217,217, 0.5)",
                        }}
                        className="w-full py-3 mt-3 block text-center rounded-md"
                      >
                        {t('acara.tambah_kalender')}
                      </Link>
                    </div>
                    <div className="mt-8 space-y-5 lg:space-y-10">
                      <h2 className="lg:text-3xl text-2xl font-bold mb-2 lg:mb-8">
                        {t('kisah_cinta.judul')}
                      </h2>
                      <div className="">
                        <div>
                          <div className="lg:flex grid grid-cols-2 items-center gap-5">
                            <Image
                              src={
                                "https://res.cloudinary.com/du0tz73ma/image/upload/v1733412700/image_4_cmxovf.png"
                              }
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-md">
                                {t('kisah_cinta.episode1_judul')}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t('kisah_cinta.episode1_durasi')}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            <Collaps
                              contentTriger={t('kisah_cinta.episode1_isi')}
                              // content="Bintang dan Ayu pertama kali bertemu sebagai rekan
                              // kerja di kantor yang sama. Kegiatan-kegiatan kecil
                              // kantor yang sering melibatkan orang-orang didala... "
                              content={t('kisah_cinta.episode1_isi')}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className="lg:flex grid grid-cols-2 items-center gap-5">
                            <Image
                              src={
                                "https://res.cloudinary.com/du0tz73ma/image/upload/v1733412732/image_5_ifoglt.png"
                              }
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-md">
                                {t('kisah_cinta.episode2_judul')}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t('kisah_cinta.episode2_durasi')}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            <Collaps
                              contentTriger={t('kisah_cinta.episode2_isi')}
                              //   content="Hari demi hari terlewati, sampai akhirnya mereka
                              // menyadari bahwa perasaan yang mereka miliki satu
                              // sama lain bukan sebatas rekan kerja belaka,
                              // melain..."
                              content={t('kisah_cinta.episode2_isi')}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className="lg:flex grid grid-cols-2 items-start gap-5">
                            <Image
                              src={
                                "https://res.cloudinary.com/du0tz73ma/image/upload/v1733412737/image_6_nhp7qd.png"
                              }
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-md">
                                {t('kisah_cinta.episode3_judul')}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t('kisah_cinta.episode3_durasi')}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            <Collaps
                              contentTriger={t('kisah_cinta.episode3_isi')}
                              //   content="Seringkali Bintang memberitahu Ayu bahwa ia tertarik
                              // dan ingin menjalani hubungan lebih serius. Sampai
                              // akhirnya di akhir 2023, Bintang mulai
                              // memberanikan..."
                              content={t('kisah_cinta.episode3_isi')}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className="lg:flex grid grid-cols-2 gap-5">
                            <Image
                              src={
                                "https://res.cloudinary.com/du0tz73ma/image/upload/v1733412772/image_7_nabhvi.png"
                              }
                              width={500}
                              height={500}
                              alt="Asset Wedding Bintang & Ayu"
                              className="aspect-video"
                            />
                            <div>
                              <button className="bg-[#EB2929] lg:px-8 lg:py-2 px-4 py-1 text-xs lg:text-base text-white font-semibold rounded-md lg:mb-5 mb-2">
                                {t('kisah_cinta.segera_hadir')}
                              </button>
                              <h3 className="lg:text-3xl text-base">
                                {t('kisah_cinta.episode4_judul')}
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                {t('kisah_cinta.episode4_durasi')}
                              </p>
                              <div className="mt-4 lg:text-lg text-xs text-gray-200">
                                {t('kisah_cinta.episode4_isi')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-2xl font-bold lg:mb-10 mb-5">
                        {t('galeri.judul')}
                      </h2>
                      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_8_b9rs2u.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                        <div className="relative">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_9_bc9h9c.png"
                            }
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            className="rounded-2xl absolute"
                          />
                          <div className="absolute bottom-4 w-full">
                            <div className="bg-[#EB2929] lg:py-2 lg:px-3 py-1 px-2 rounded-lg w-fit mx-auto">
                              <p className="lg:text-xl text-sm font-medium">
                                {t('galeri.favorit_pria')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_10_eebpfe.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_11_ogaeth.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_12_xgvlic.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                        <div className="relative">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_13_ihgggu.png"
                            }
                            width={500}
                            height={500}
                            alt="Asset Wedding Bintang & Ayu"
                            className="rounded-2xl"
                          />
                          <div className="absolute bottom-4 w-full">
                            <div className="bg-[#EB2929] lg:px-3 py-1 px-2 rounded-lg w-fit mx-auto">
                              <p className="lg:text-xl text-sm font-medium">
                                {t('galeri.favorit_wanita')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_14_nephfh.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_15_ms1pyd.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_16_sbfvzp.png"
                          }
                          width={500}
                          height={500}
                          alt="Asset Wedding Bintang & Ayu"
                          className="rounded-2xl"
                        />
                      </div>
                      {/* <Link href={'/more-collection'} className="block w-full py-3 rounded-md font-semibold bg-[#EB2929] text-center mt-8">
                        Load more collections
                      </Link> */}

                      <button
                        onClick={() => setOpemModalCollection(true)}
                        className="block w-full py-3 rounded-md font-semibold bg-[#EB2929] text-center mt-8"
                      >
                        {t('galeri.muat_lebih')}
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
};
