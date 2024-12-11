import { motion, AnimatePresence } from "framer-motion";

interface Props {
  openGuest: boolean;
  setOpenGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GuestScreen: React.FC<Props> = ({ openGuest, setOpenGuest }) => {
  const variant = {
    // hidden: {
    //   opacity: 0,
    // },
    visible: {
      opacity: 1,
      scale: 1, // Modal membesar ke ukuran normal
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {openGuest && (
        <motion.section
          key="guest-screen"
          variants={variant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setOpenGuest(false)}
          className="fixed inset-0 h-screen w-screen bg-[#141414] flex items-center justify-center z-50"
        >
          <div className="text-center">
            <h1 className="text-4xl font-medium text-white mb-3">Who's watching?</h1>
            <div>
              <img
                className="mx-auto cursor-pointer"
                src="https://res.cloudinary.com/du0tz73ma/image/upload/v1733748883/Screenshot_2024-12-02_at_19.50.56_1_1_vyki1m.png"
                alt="Guest Avatar"
              />
              <p className="text-gray-500 mt-5 font-light">Guest</p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
