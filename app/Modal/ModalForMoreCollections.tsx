import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { useState } from "react";
import ImageModal from "@/components/commons/ImageModal";
import { ArrowLeft } from "lucide-react";

interface ModalForMoreCollectionsProps {
  openModalCollection: boolean;
  setOpenModalCollection: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalForMoreCollections: React.FC<
  ModalForMoreCollectionsProps
> = ({ openModalCollection, setOpenModalCollection }) => {
  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
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
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageUrl={selectedImageUrl}
      />
      <AnimatePresence>
        {openModalCollection && (
          <>
            {/* <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setOpen(false)} // Klik overlay untuk menutup modal
                        ></motion.div> */}
            <motion.section
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-y-auto"
            >
              <div className="relative z-50 w-full">
                <div className="w-screen lg:w-[1080px] mx-auto text-white bg-[#151515] mb-10">
                  <section className="grid grid-rows-3 xl:grid-rows-1 xl:grid-cols-3 gap-6 p-3 overflow-hidden">
                    {/* Left Side */}
                    <button
                      onClick={() => setOpenModalCollection(false)}
                      className="fixed z-50 border rounded-full p-2"
                    >
                      <ArrowLeft />
                    </button>
                    <div className="grid grid-rows-7 gap-6">
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        onClick={() =>
                          handleImageClick(
                            "https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_900,h_1000/g_auto/q_auto/f_auto/v1749677350/Fotoud55_klluze.jpg"
                          )
                        }
                        style={{
                          backgroundImage:
                            "url('https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_900,h_1000/g_auto/q_auto/f_auto/v1749677350/Fotoud55_klluze.jpg')",
                          backgroundPosition: "bottom",
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
                          {/* <div className="flex flex-col items-center">
                                                        <span className="translate-x-[-5rem] mb-3">Bintang</span>
                                                        <span>&</span>
                                                        <span className="translate-x-[3rem]">Ayu</span>
                                                    </div> */}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        onClick={() =>
                          handleImageClick(
                            "https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_600/v1749675739/A-Love-that-Grows-With-Time_vpmirg.jpg"
                          )
                        }
                        style={{
                          backgroundImage:
                            "url('https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_600/v1749675739/A-Love-that-Grows-With-Time_vpmirg.jpg')",
                          backgroundPosition: "bottom",
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
                        <div className="text-white text-center h-full flex px-5 items-end pb-3 justify-center font-semibold text-md 2xl:text-xl relative z-10"></div>
                      </motion.div>

                      <div className="row-span-3 grid grid-cols-2 gap-6 col-span-2">
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                          className="bg-black rounded-3xl text-center p-5 "
                        >
                          <p className="font-semibold mb-6 mt-1 text-lg 2xl:text-xl">
                            So happy for you both! Cheers to love and happiness
                            forever
                          </p>
                          <img
                            onClick={() =>
                              handleImageClick(
                                "https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732258139/unsplash_NU7bOw3_tnE_i6rdt0.png"
                              )
                            }
                            className="w-full rounded-xl"
                            src="https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732258139/unsplash_NU7bOw3_tnE_i6rdt0.png"
                            alt="Celebration"
                          />
                        </motion.div>
                        <div className="space-y-6">
                          <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.6, ease: "easeOut" }}
                            onClick={() =>
                              handleImageClick(
                                "https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732258293/unsplash_-Kc29c7lCBA_kini88.png"
                              )
                            }
                            className="h-[30%] rounded-3xl relative "
                            style={{
                              backgroundImage:
                                "url('https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732258293/unsplash_-Kc29c7lCBA_kini88.png')",
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
                            <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                          </motion.div>
                          <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.8, ease: "easeOut" }}
                            className="h-[65%] rounded-3xl relative "
                            onClick={() =>
                              handleImageClick(
                                "https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_900,h_600/v1749929949/JON00678_klufwg.jpg"
                              )
                            }
                            style={{
                              backgroundImage:
                                "url('https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_900,h_600/v1749929949/JON00678_klufwg.jpg')",
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
                            <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
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
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749930054/EDIT-2_hnaazc.jpg"
                            )
                          }
                          className="h-full w-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749930054/EDIT-2_hnaazc.jpg')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>
                        <div className="bg-black w-full rounded-3xl">
                          <div className="text-white-center h-full flex items-center justify-center font-bold text-xl xl:text-lg 2xl:text-xl text-center">
                            <p>The Beauty of Marriage</p>
                          </div>
                        </div>
                      </div>

                      <div className="row-span-2">
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 2.2, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_900,h_1200/v1749932235/E3827207-883A-415A-89FA-CA7F3B3FC0EF_bydawh.jpg"
                            )
                          }
                          className="h-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_900,h_1200/v1749932235/E3827207-883A-415A-89FA-CA7F3B3FC0EF_bydawh.jpg')",
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
                          <div className="text-white h-full flex pr-5 pt-3 justify-end text-end font-semibold text-xl 2xl:text-3xl relative z-10"></div>
                        </motion.div>
                      </div>

                      <div className="row-span-1">
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 2.4, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732277236/unsplash_aEnH4hJ_Mrs_1_l1oy79.png"
                            )
                          }
                          className="h-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732277236/unsplash_aEnH4hJ_Mrs_1_l1oy79.png')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
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
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749932746/EDIT_BY_SOLU-00792_itmsz3.jpg"
                            )
                          }
                          className="w-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749932746/EDIT_BY_SOLU-00792_itmsz3.jpg')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 2.8, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749932663/EDIT_BY_SOLU-00844_xp72io.jpg"
                            )
                          }
                          className="w-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749932663/EDIT_BY_SOLU-00844_xp72io.jpg')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 px-2 justify-center font-semibold text-md 2xl:text-xl relative z-10"></div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 3, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732277968/unsplash_XySWtbETa1M_cdciup.png"
                            )
                          }
                          className="rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732277968/unsplash_XySWtbETa1M_cdciup.png')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>

                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 3.1, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929952/JON00837-3_ce3s9k.jpg"
                            )
                          }
                          className="rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749929952/JON00837-3_ce3s9k.jpg')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>

                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 3.2, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749677350/Uud40_jphmyn.jpg"
                            )
                          }
                          className="rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/c_fill,w_1000,h_1518/q_auto/f_auto/v1749677350/Uud40_jphmyn.jpg')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>
                      </div>

                      <div className="grid gap-6">
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 3.3, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749675739/the-begining-of-forever_msmt5f.jpg"
                            )
                          }
                          className="w-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749675739/the-begining-of-forever_msmt5f.jpg')",
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
                          <div className="text-white text-center h-full flex items-start px-5 pt-5 pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 3.4, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749932924/EDIT_BY_SOLU-00697_yslbus.jpg"
                            )
                          }
                          className="w-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/dilb4d364/image/upload/w_1000/q_auto/f_auto/v1749932924/EDIT_BY_SOLU-00697_yslbus.jpg')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>
                        <motion.div
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 3.5, ease: "easeOut" }}
                          onClick={() =>
                            handleImageClick(
                              "https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732278086/unsplash_OcF9ZomsdL8_amvapd.png"
                            )
                          }
                          className="w-full rounded-3xl relative "
                          style={{
                            backgroundImage:
                              "url('https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto/f_auto/v1732278086/unsplash_OcF9ZomsdL8_amvapd.png')",
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
                          <div className="text-white text-center h-full flex items-end pb-3 justify-center font-semibold text-lg 2xl:text-2xl relative z-10"></div>
                        </motion.div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
