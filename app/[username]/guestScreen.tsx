import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  openGuest: boolean;
  setOpenGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GuestScreen: React.FC<Props> = ({ openGuest, setOpenGuest }) => {
  const [name, setName] = useState<string>("")
  const [profil_picture, setProfile_picture] = useState<string>('')
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

  const params = useParams();
  const username = params.username;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://wedding-api.bintangtobing.com/api/invitation/${username}`)
      const result = await response.json()
      setName(result.name)
      setProfile_picture(result.profile_picture)
    }

    getData()
  }, [username])
  

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
            <h1 className="text-4xl font-medium text-white mb-3">{`Who's watching?`}</h1>
            <div>
              <Image
                width={200}
                height={200}
                className="mx-auto cursor-pointer"
                src={profil_picture}
                alt="Guest Avatar"
              />
              <p className="text-gray-500 mt-5 font-light">{name}</p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};