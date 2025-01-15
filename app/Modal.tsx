import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "motion/react";
import { Collaps } from "./collapsible";
import Link from "next/link";
import { useState } from "react";
import { postAttendance } from "./services/attendance";
import Swal from "sweetalert2";
import { Footer } from "./footer/Footer";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModalCollection: boolean;
  setOpemModalCollection: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalGift: React.Dispatch<React.SetStateAction<boolean>>;
  parameter: string;
}

export const Modal: React.FC<DialogProps> = ({
  open,
  setOpen,
  setOpemModalCollection,
  openModalCollection,
  setOpenModalGift,
  parameter,
}) => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [attend, setAttend] = useState<string>("");

  const handleClick = async () => {
    try {
      const response = await postAttendance(
        {
          attendace_name: name,
          attendance_message: message,
          attend: attend === "1" ? true : false,
        },
        parameter
      );
      if (response.message === "Attendance updated successfully") {
        Swal.fire({
          title: "Thankyou",
          text: "Some beautiful message",
          icon: "success",
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

  const { ref, inView } = useInView({
    triggerOnce: true, // Animasi hanya dijalankan sekali
    threshold: 0.1, // Elemen minimal 10% terlihat di layar untuk memicu animasi
  });

  const motionVariants = {
    hidden: { x: "80%", opacity: 0 }, // Kondisi awal (dari kanan, transparan)
    visible: { x: 0, opacity: 1 }, // Kondisi akhir (ke posisi semula, terlihat)
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
                      muted
                      loop
                      id="myVideo"
                    >
                      <source
                        src="https://res.cloudinary.com/du0tz73ma/video/upload/v1733931845/videoplayback_fwiym8.mp4"
                        type="video/mp4"
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
                          Bintang & Ayu <br /> Sebelum hari H
                        </h1>
                        <p>Romantic, Married, Family, Documenter</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#151515] text-white px-5 lg:px-10 py-8">
                    <div className="lg:flex justify-between space-y-3 items-center text-gray-400 mb-3 lg:mb-5">
                      <p>
                        Coming soon 2025 July 11<sup>st</sup>{" "}
                        <span className="border text-sm px-2 ml-1">4K</span>{" "}
                        <span className="border text-sm px-2">17+</span>
                      </p>
                      <p className="text-white text-sm">
                        <span className="text-gray-400 text-xs">Cast:</span>{" "}
                        Bintang Tobing, Ayu Stevani Sinaga
                      </p>
                    </div>
                    <div className="lg:w-[70%]">
                      <p className="mb-3 lg:mb-5 text-sm lg:text-base">
                        Setelah Bintang dan Ayu dipertemukan dalam situasi yang
                        tepat, di mana keduanya telah siap untuk memulai
                        hubungan bersama, tibalah mereka di awal perjalanan baru
                        menuju pernikahan.
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400 font-light">
                        {`"Sehati sepikirlah kamu, dan hiduplah dalam damai
                        sejahtera; maka Allah, sumber kasih dan damai sejahtera
                        akan menyertai kamu!"`}
                      </p>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        Breaking News
                      </h2>
                      <Image
                        src={
                          "https://res.cloudinary.com/du0tz73ma/image/upload/v1733403018/allef-vinicius-DmUbkltYsKI-unsplash_dgxqmp.jpg"
                        }
                        width={2000}
                        height={1000}
                        alt=""
                        className="w-full aspect-video mt-5 rounded-3xl"
                      />
                      <p className="mt-5 text-sm lg:text-base">
                        Dengan penuh kebahagiaan, kami ingin berbagi kabar
                        gembira ini! <br />
                        Kami telah memutuskan untuk melangkah bersama menuju
                        babak baru dalam kehidupan kami. {"<3"} <br />
                        Pernikahan kami akan dilangsungkan secara sederhana
                        dalam suasana intimate wedding di Bekasi, hanya dihadiri
                        oleh keluarga dan sahabat terdekat. <br />
                        Kami mohon maaf sebesar-besarnya karena tidak dapat
                        mengundang semua orang yang kami sayangi untuk hadir
                        bersama kami di hari bahagia ini. <br />
                        Namun, meskipun tidak bersama secara fisik, kami selalu
                        merasakan kehangatan cinta dan dukungan dari kalian
                        semua. Kami mohon doa yang terbaik untuk perjalanan kami
                        ke depan, agar selalu dipenuhi dengan kebahagiaan,
                        cinta, dan berkah. <br />
                        Dengan penuh cinta, The Bride and Groom {"<3"}
                      </p>
                    </div>
                    <div className="mt-8">
                      <h2 className="font-bold text-2xl lg:text-3xl">
                        Bride and Groom
                      </h2>
                      <div className="grid lg:grid-cols-2 gap-10 mt-8">
                        <div>
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733406083/image_aftbje.png"
                            }
                            width={500}
                            height={500}
                            alt=""
                            className="aspect-square"
                          />
                          <div className="">
                            <h3 className="lg:text-2xl text-xl font-bold mt-5">
                              Ayu Stevani Sinaga
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base mt-2 lg:mt-3">
                              Putri dari Bapak Toni Steven Sinaga dan ibu
                              Asnawati br Siregar
                            </p>
                          </div>
                        </div>
                        <div>
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733406120/image_1_irtoyv.png"
                            }
                            width={500}
                            height={500}
                            alt=""
                            className="aspect-square"
                          />
                          <div>
                            <h3 className="lg:text-2xl text-xl font-bold mt-5">
                              Bintang Cato Jeremia L Tobing
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base mt-2 lg:mt-3">
                              Putra dari Bapak Bastian Valen Tobing dan ibu
                              Cicih Warsih br Simanjuntak
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-xl font-bold mb-5 lg:mb-8">
                        Wedding Reception & Blessing
                      </h2>
                      <Image
                        src={
                          "https://res.cloudinary.com/du0tz73ma/image/upload/v1733409293/image_2_vjflgs.png"
                        }
                        width={1031}
                        height={403}
                        alt=""
                        className="w-full rounded-3xl"
                      />
                      <h2 className="lg:text-3xl text-xl font-bold mb-2 mt-8">
                        HKBP GLUGUR Resort Medan Utara
                      </h2>
                      <div className="lg:flex items-center justify-between">
                        <div className="flex items-center gap-5 mb-3">
                          <div className="bg-gray-100 px-5 lg:px-10 py-3 lg:py-3 text-[#151515] w-fit text-md lg:text-xl font-semibold rounded-md">
                            <p>11 July 2025</p>
                          </div>
                          <p className="font-semibold text-white text-base lg:text-lg">
                            10:00 WIB
                          </p>
                        </div>
                        <p className="text-gray-200 font-light text-sm lg:text-base">
                          Jl Pembangunan III No. 57A, Medan Timur
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
                        Add to calendar
                      </Link>
                    </div>
                    <div className="mt-8">
                      <Image
                        src={
                          "https://res.cloudinary.com/du0tz73ma/image/upload/v1733410635/image_3_mmfwm9.png"
                        }
                        width={1031}
                        height={403}
                        alt=""
                        className="w-full rounded-3xl"
                      />
                      <h2 className="lx:text-3xl text-xl font-bold mb-2 mt-8">
                        Wisma Mahinna Center
                      </h2>
                      <div className="lg:flex items-center justify-between">
                        <div className="flex items-center gap-5 mb-3">
                          <div className="bg-gray-100 px-5 lg:px-10 py-3 lg:py-3 text-[#151515] w-fit text-md lg:text-xl font-semibold rounded-md">
                            <p>11 July 2025</p>
                          </div>
                          <p className="font-semibold text-white text-base lg:text-lg">
                            13:00 WIB
                          </p>
                        </div>
                        <p className="text-gray-200 font-light text-sm lg:text-base">
                          Jl Rela No. 119, Medan
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
                        Add to calendar
                      </Link>
                    </div>
                    <div className="mt-8 space-y-5 lg:space-y-10">
                      <h2 className="lg:text-3xl text-2xl font-bold mb-2 lg:mb-8">
                        Our love story
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
                              alt=""
                              className="aspect-video"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-md">
                                Episode 01: How we meet each other at time
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                26m 10s
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            <Collaps
                              contentTriger="Bintang dan Ayu pertama kali bertemu sebagai rekan...."
                              content="Bintang dan Ayu pertama kali bertemu sebagai rekan
                            kerja di kantor yang sama. Kegiatan-kegiatan kecil
                            kantor yang sering melibatkan orang-orang didala... "
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
                              alt=""
                              className="aspect-video"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-md">
                                Episode 02: A Love that Grows With Time
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                26m 10s
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            <Collaps
                              contentTriger="Hari demi hari terlewati, sampai akhirnya mereka..."
                              content="Hari demi hari terlewati, sampai akhirnya mereka
                            menyadari bahwa perasaan yang mereka miliki satu
                            sama lain bukan sebatas rekan kerja belaka,
                            melain..."
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
                              alt=""
                              className="aspect-video"
                            />
                            <div>
                              <h3 className="lg:text-3xl text-md">
                                Episode 03: Choose to Spend Life Together
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                26m 10s
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            <Collaps
                              contentTriger="Seringkali Bintang memberitahu Ayu bahwa ia tertarik....."
                              content="Seringkali Bintang memberitahu Ayu bahwa ia tertarik
                            dan ingin menjalani hubungan lebih serius. Sampai
                            akhirnya di akhir 2023, Bintang mulai
                            memberanikan..."
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
                              alt=""
                              className="aspect-video"
                            />
                            <div>
                              <button className="bg-[#EB2929] lg:px-8 lg:py-2 px-4 py-1 text-xs lg:text-base text-white font-semibold rounded-md lg:mb-5 mb-2">
                                Coming Soon
                              </button>
                              <h3 className="lg:text-3xl text-base">
                                Episode 04: The Begining of Forever
                              </h3>
                              <p className="text-gray-300 text-sm lg:mt-2 mt-1">
                                26m 10s
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 lg:text-lg text-xs text-gray-200">
                            Ketika hari H itu datang, Bintang dan Ayu akan
                            berbagi kisah haru mereka disini. Sampai bertemu
                            lagi di cerita bahagia selanjutnya!
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-2xl font-bold lg:mb-10 mb-5">
                        Our gallery collections
                      </h2>
                      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_8_b9rs2u.png"
                          }
                          width={500}
                          height={500}
                          alt=""
                          className="rounded-2xl"
                        />
                        <div className="relative">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_9_bc9h9c.png"
                            }
                            width={500}
                            height={500}
                            alt=""
                            className="rounded-2xl absolute"
                          />
                          <div className="absolute bottom-4 w-full">
                            <div className="bg-[#EB2929] lg:py-2 lg:px-3 py-1 px-2 rounded-lg w-fit mx-auto">
                              <p className="lg:text-xl text-sm font-medium">
                                {`Groom's Favorite`}
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
                          alt=""
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494925/image_11_ogaeth.png"
                          }
                          width={500}
                          height={500}
                          alt=""
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_12_xgvlic.png"
                          }
                          width={500}
                          height={500}
                          alt=""
                          className="rounded-2xl"
                        />
                        <div className="relative">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_13_ihgggu.png"
                            }
                            width={500}
                            height={500}
                            alt=""
                            className="rounded-2xl"
                          />
                          <div className="absolute bottom-4 w-full">
                            <div className="bg-[#EB2929] lg:px-3 py-1 px-2 rounded-lg w-fit mx-auto">
                              <p className="lg:text-xl text-sm font-medium">
                                {`Bride's Favorite`}
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
                          alt=""
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_15_ms1pyd.png"
                          }
                          width={500}
                          height={500}
                          alt=""
                          className="rounded-2xl"
                        />
                        <Image
                          src={
                            "https://res.cloudinary.com/du0tz73ma/image/upload/v1733494926/image_16_sbfvzp.png"
                          }
                          width={500}
                          height={500}
                          alt=""
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
                        Load more collections
                      </button>
                    </div>
                    <div className="mt-8">
                      <h2 className="lg:text-3xl text-2xl font-bold mb-8">
                        Wish for couples
                      </h2>
                      <div className="space-y-5">
                        <div className="flex lg:gap-10 gap-5">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733497935/Screenshot_2024-12-02_at_19.50.56_1_xe6zau.png"
                            }
                            width={200}
                            height={200}
                            alt=""
                            className="w-10 h-10"
                          />
                          <div>
                            <h3 className="lg:text-2xl text-base font-medium mb-1 lg:mb-3">
                              Warga Instagram
                            </h3>
                            <p className="text-gray-300 text-sm lg:text-base w-[90%]">
                              Hai kak, selamat menempuh hidup baru yahh, Tuhan
                              Yesus memberkati pernikahan kakak sama Abang. 🎁🎁
                            </p>
                          </div>
                        </div>
                        <div className="flex lg:gap-10 gap-5">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733497935/Screenshot_2024-12-02_at_19.50.56_1_xe6zau.png"
                            }
                            width={200}
                            height={200}
                            alt=""
                            className="w-10 h-10"
                          />
                          <div>
                            <h3 className="lg:text-2xl text-base font-medium mb-1 lg:mb-3">
                              Warga Instagram
                            </h3>
                            <p className="text-gray-300 text-sm lg:text-base w-[90%]">
                              Hai kak, selamat menempuh hidup baru yahh, Tuhan
                              Yesus memberkati pernikahan kakak sama Abang. 🎁🎁
                            </p>
                          </div>
                        </div>
                        <div className="flex lg:gap-10 gap-5 relative">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733497935/Screenshot_2024-12-02_at_19.50.56_1_xe6zau.png"
                            }
                            width={200}
                            height={200}
                            alt=""
                            className="w-10 h-10"
                          />
                          <div>
                            <h3 className="lg:text-2xl text-base font-medium mb-1 lg:mb-3">
                              Warga Instagram
                            </h3>
                            <p className="text-gray-300 text-sm lg:text-base w-[90%]">
                              Hai kak, selamat menempuh hidup baru yahh, Tuhan
                              Yesus memberkati pernikahan kakak sama Abang. 🎁🎁
                            </p>
                          </div>
                          <motion.div
                            onClick={() => handleClickOpenModalGift()}
                            ref={ref}
                            variants={motionVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            transition={{
                              type: "tween",
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                            style={{
                              backgroundColor: "rgba(80, 80, 80, 0.7)",
                              willChange: "transform, opacity", // Pastikan browser merender transformasi elemen
                            }}
                            className="border-l-4 border-gray-400 absolute right-[-2rem] lg:right-[-2.5rem] py-2 pr-10 pl-3 will-change-auto"
                          >
                            <p className="text-sm">Sending gift?</p>
                          </motion.div>
                        </div>
                        <div className="flex lg:gap-10 gap-5">
                          <Image
                            src={
                              "https://res.cloudinary.com/du0tz73ma/image/upload/v1733497935/Screenshot_2024-12-02_at_19.50.56_1_xe6zau.png"
                            }
                            width={200}
                            height={200}
                            alt=""
                            className="w-10 h-10"
                          />
                          <div>
                            <h3 className="lg:text-2xl text-base font-medium mb-1 lg:mb-3">
                              Warga Instagram
                            </h3>
                            <p className="text-gray-300 text-sm lg:text-base w-[90%]">
                              Hai kak, selamat menempuh hidup baru yahh, Tuhan
                              Yesus memberkati pernikahan kakak sama Abang. 🎁🎁
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-16">
                      <div className="flex flex-col">
                        <label className="mb-2 lg:text-2xl text-lg" htmlFor="">
                          Nama
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="bg-white h-10 text-black px-3"
                        />
                      </div>
                      <div className="flex flex-col mt-10">
                        <label className="mb-2 lg:text-2xl text-lg" htmlFor="">
                          Pesan
                        </label>
                        <textarea
                          onChange={(e) => setMessage(e.target.value)}
                          rows={5}
                          className="bg-white text-black px-3"
                        />
                      </div>
                      <div className="mt-10 flex flex-col">
                        <label
                          className="mb-2 lg:text-2xl text-lg"
                          htmlFor="attendance"
                        >
                          Kehadiran
                        </label>
                        <select
                          onChange={(e) => setAttend(e.target.value)}
                          className="h-10 px-2 text-black border border-gray-300 rounded"
                          name="attendance"
                          id="attendance"
                          defaultValue="0"
                          aria-label="Attendance options"
                        >
                          <option value="0">Berhalang hadir</option>
                          <option value="1">Hadir</option>
                        </select>
                      </div>
                      <button
                        onClick={handleClick}
                        className="bg-[#EB2929] py-4 w-full text-white mt-8 font-medium rounded-md"
                      >
                        Send
                      </button>
                    </div>
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
