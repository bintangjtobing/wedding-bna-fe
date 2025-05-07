'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { useUser } from "@/context/UserContext";

interface Props {
  openGuest: boolean;
  setOpenGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

// Inner component that uses useSearchParams
const GuestScreenContent = ({ openGuest, setOpenGuest }: Props) => {
  const { setUser } = useUser();
  const [name, setName] = useState<string>("");
  const searchParams = useSearchParams();
  const invite = searchParams.get('we-invite');

  const variant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  useEffect(() => {
    const getData = async () => {
      if (!invite) return;
      
      try {
        const response = await fetch(
          `https://wedding-api.bintangtobing.com/api/invitation/${invite}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setName(result.data.name);
        setUser({
          name: result.data.name,
          username: result.data.username,
          phone_number: result.data.phone_number || ''
        });
      } catch (error) {
        console.error("Error fetching invitation data:", error);
      }
    };

    getData();
  }, [invite, setUser]);

  return (
    <AnimatePresence>
      {openGuest && (
        <motion.section
          key="guest-screen"
          variants={variant}
          initial={{ opacity: 0 }}
          animate="visible"
          exit="exit"
          onClick={() => {
            if(name) {
              setOpenGuest(false)
            }
          }}
          className="fixed inset-0 h-screen w-screen bg-[#141414] flex items-center justify-center z-50"
        >
          <div className="text-center">
            <h1 className="text-4xl font-medium text-white mb-3">{`Kami dengan hormat mengundang`}</h1>
            <div>
              <Image
                width={200}
                height={200}
                className="mx-auto cursor-pointer"
                src="https://res.cloudinary.com/du0tz73ma/image/upload/v1733748883/Screenshot_2024-12-02_at_19.50.56_1_1_vyki1m.png"
                alt="Guest Avatar"
              />
              <p className="text-gray-500 mt-5 font-light">{name || 'Loading guest name...'}</p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

// Loading fallback component
const GuestScreenLoading = ({ openGuest }: { openGuest: boolean }) => {
  if (!openGuest) return null;
  
  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#141414] flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl font-medium text-white mb-3">Loading invitation...</h1>
      </div>
    </div>
  );
};

// Main component with Suspense wrapper
export const GuestScreen: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<GuestScreenLoading openGuest={props.openGuest} />}>
      <GuestScreenContent {...props} />
    </Suspense>
  );
};