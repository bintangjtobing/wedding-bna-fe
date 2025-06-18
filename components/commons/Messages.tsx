import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { useTranslate } from "@/context/LanguageContext";
import { trackSendingGiftClick } from "@/utils/analytics";

interface MessageData {
  id: number | string;
  contact_id?: number;
  name: string;
  message: string;
  attendance: string;
  is_approved?: number;
  created_at: string;
  updated_at: string;
  isNew?: boolean; // Flag to track new messages from Pusher
  contact?: {
    id: number;
    name: string;
    username?: string;
    admin_id?: number;
    country?: string;
    country_code?: string;
    greeting?: string;
    invitation_status?: string;
    phone_number?: string;
    sent_at?: string | null;
  };
}

interface PusherMessageData {
  message?: {
    id?: number | string;
    name?: string;
    message?: string;
    attendance?: string;
    created_at?: string;
    updated_at?: string;
    contact?: Record<string, unknown>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface PusherErrorEvent {
  type: string;
  data: {
    code: number;
    message: string;
  };
}

interface MessagesProps {
  handleClickOpenModalGift: () => void;
}

// Komponen Avatar Statis untuk Messages
const StaticAvatar = ({
  name,
  messageId,
}: {
  name: string;
  messageId: string | number;
}) => {
  // Fungsi untuk generate inisial (maksimal 2 karakter untuk ukuran kecil)
  const getInitials = (fullName: string): string => {
    if (!fullName) return "G";

    const words = fullName.trim().split(/\s+/);
    let initials = "";

    // Ambil huruf pertama dari 2 kata pertama
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      if (words[i] && words[i].length > 0) {
        initials += words[i][0].toUpperCase();
      }
    }

    return initials || "G";
  };

  // Fungsi untuk generate warna berdasarkan nama + messageId untuk variasi
  const getGradientColor = (
    name: string,
    messageId: string | number
  ): string => {
    if (!name) return "from-gray-400 to-gray-600";

    const gradients = [
      "from-pink-400 to-purple-500",
      "from-blue-400 to-cyan-500",
      "from-green-400 to-emerald-500",
      "from-yellow-400 to-orange-500",
      "from-purple-400 to-pink-500",
      "from-indigo-400 to-blue-500",
      "from-teal-400 to-green-500",
      "from-red-400 to-pink-500",
      "from-orange-400 to-red-500",
      "from-cyan-400 to-blue-500",
      "from-emerald-400 to-teal-500",
      "from-violet-400 to-purple-500",
      "from-rose-400 to-red-500",
      "from-lime-400 to-green-500",
      "from-sky-400 to-blue-500",
      "from-amber-400 to-yellow-500",
      "from-fuchsia-400 to-pink-500",
      "from-slate-400 to-gray-500",
    ];

    // Combine nama dan messageId untuk membuat hash yang unik per pesan
    const combinedString = `${name}-${messageId}`;
    let hash = 0;

    for (let i = 0; i < combinedString.length; i++) {
      hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const initials = getInitials(name);
  const gradientClass = getGradientColor(name, messageId);

  return (
    <div
      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-md`}
    >
      <span className="text-white font-semibold text-xs">{initials}</span>
    </div>
  );
};

export const Messages: React.FC<MessagesProps> = ({
  handleClickOpenModalGift,
}) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const newMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation for "sending gift" element
  const motionVariants = {
    hidden: { x: "80%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const handleSendingGiftClick = () => {
    // Track the sending gift click
    trackSendingGiftClick();

    // Call the original function
    handleClickOpenModalGift();
  };

  // Initial data fetch
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://wedding-api.bintangtobing.com/api/invitation/messages/all"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMessages(data.data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Cleanup any timeout on unmount
  useEffect(() => {
    return () => {
      if (newMessageTimeoutRef.current) {
        clearTimeout(newMessageTimeoutRef.current);
      }
    };
  }, []);

  // Pusher setup
  useEffect(() => {
    // Initialize Pusher only once
    const pusher = new Pusher("7e45d0fe0e2b99ef0b11", {
      cluster: "ap1",
      forceTLS: true,
    });

    // Subscribe to the 'messages' channel
    const channel = pusher.subscribe("messages");

    // Listen for the 'new-message' event with proper error handling
    channel.bind("new-message", (newData: PusherMessageData) => {
      console.log("New message received: ", newData);

      try {
        // Check if data is in expected format and extract it properly
        const messageData = newData.message || newData;

        // Ensure we have a proper object with required fields
        if (typeof messageData === "object" && messageData !== null) {
          // Generate a unique ID if none is provided
          const messageId: string | number =
            typeof messageData.id === "string" ||
            typeof messageData.id === "number"
              ? messageData.id
              : `temp-${Date.now()}`;

          // Get name with fallback
          const messageName: string =
            typeof messageData.name === "string" ? messageData.name : "Guest";

          // Get message content with fallback
          const messageContent: string =
            typeof messageData.message === "string" ? messageData.message : "";

          // Get attendance with fallback
          const messageAttendance: string =
            typeof messageData.attendance === "string"
              ? messageData.attendance
              : "";

          // Get timestamps with fallbacks
          const createdAt: string =
            typeof messageData.created_at === "string"
              ? messageData.created_at
              : new Date().toISOString();

          const updatedAt: string =
            typeof messageData.updated_at === "string"
              ? messageData.updated_at
              : new Date().toISOString();

          // Create a properly formatted message object with only the fields we need
          const formattedMessage: MessageData = {
            id: messageId,
            name: messageName,
            message: messageContent,
            attendance: messageAttendance,
            created_at: createdAt,
            updated_at: updatedAt,
            isNew: true, // Flag this as a new message for animation
          };

          // Add contact if it exists
          if (messageData.contact && typeof messageData.contact === "object") {
            // Type assertion with proper check
            const contact = messageData.contact as {
              id?: number;
              name?: string;
              username?: string;
              [key: string]: unknown;
            };

            if (contact && typeof contact.id === "number") {
              formattedMessage.contact = {
                id: contact.id,
                name: typeof contact.name === "string" ? contact.name : "Guest",
                username:
                  typeof contact.username === "string"
                    ? contact.username
                    : undefined,
              };
            }
          }

          // Update state with the properly formatted message
          setMessages((prevMessages) => [formattedMessage, ...prevMessages]);

          // Clear isNew flag after animation completes
          if (newMessageTimeoutRef.current) {
            clearTimeout(newMessageTimeoutRef.current);
          }

          newMessageTimeoutRef.current = setTimeout(() => {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === messageId ? { ...msg, isNew: false } : msg
              )
            );
          }, 3000);
        }
      } catch (error) {
        console.error("Error processing new message:", error);
      }
    });

    // Error handling for pusher connection
    pusher.connection.bind("error", (err: PusherErrorEvent) => {
      console.error("Pusher connection error:", err);
    });

    // Cleanup when component unmounts
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("messages");
      pusher.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div className="mt-8">
        <h2 className="lg:text-3xl text-2xl font-bold mb-8">
          {t("ucapan.judul")}
        </h2>
        <div className="space-y-5">
          {loading ? (
            <p className="text-gray-300">Loading messages...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-300">
              No messages yet. Be the first to send your wishes!
            </p>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {messages.slice(0, 4).map((message, index) => {
                  // Only add animation class for new messages
                  const newMessageClass = message.isNew
                    ? "border border-white/30 rounded-lg bg-white/5"
                    : "";

                  // Define animation based on whether this is a new message
                  const isNewItem = message.isNew;

                  // Get the display name for avatar
                  const displayName =
                    message.contact?.name || message.name || "Guest";

                  return (
                    <motion.div
                      key={`message-${message.id}`}
                      className={`flex lg:gap-10 gap-5 relative p-2 ${newMessageClass}`}
                      layout
                      initial={
                        isNewItem ? { opacity: 0, y: -50 } : { opacity: 1 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        delay: isNewItem ? 0 : index * 0.1, // Stagger delay for existing items
                      }}
                    >
                      <StaticAvatar name={displayName} messageId={message.id} />
                      <div className="flex-1">
                        <h3 className="lg:text-2xl text-base font-medium mb-1 lg:mb-3">
                          {displayName}
                        </h3>
                        <p className="text-gray-300 text-sm lg:text-base w-max">
                          {typeof message.message === "string"
                            ? message.message
                            : "Congratulations on your wedding day!"}
                        </p>
                      </div>
                      {index === 2 && (
                        <motion.div
                          onClick={handleSendingGiftClick}
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
                            willChange: "transform, opacity",
                          }}
                          className="border-l-4 border-red-500 absolute right-[-2rem] lg:right-[-2.5rem] py-2 pr-10 pl-3 will-change-auto"
                        >
                          <p className="text-sm">🎁 Wedding Gift?</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </>
  );
};
