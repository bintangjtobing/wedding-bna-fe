import Image from "next/image"
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface MessageData {
    id: number;
    name: string;
    message: string;
    attendance: string;
    created_at: string;
    contact?: {
        id: number;
        name: string;
        username: string;
    };
}

interface MessagesProps {
    handleClickOpenModalGift: () => void;
}

export const Messages: React.FC<MessagesProps> = ({ handleClickOpenModalGift }) => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const motionVariants = {
        hidden: { x: "80%", opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://wedding-api.bintangtobing.com/api/invitation/messages/all');
                
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

    return (
        <>
            <div className="mt-8">
                <h2 className="lg:text-3xl text-2xl font-bold mb-8">
                    Wish for couples
                </h2>
                <div className="space-y-5">
                    {loading ? (
                        <p className="text-gray-300">Loading messages...</p>
                    ) : error ? (
                        <p className="text-red-400">{error}</p>
                    ) : messages.length === 0 ? (
                        <p className="text-gray-300">No messages yet. Be the first to send your wishes!</p>
                    ) : (
                        <>
                            {messages.slice(0, 4).map((message, index) => (
                                <div key={message.id} className="flex lg:gap-10 gap-5 relative">
                                    <Image
                                        src="https://res.cloudinary.com/du0tz73ma/image/upload/v1733497935/Screenshot_2024-12-02_at_19.50.56_1_xe6zau.png"
                                        width={200}
                                        height={200}
                                        alt="User Avatar"
                                        className="w-10 h-10"
                                    />
                                    <div>
                                        <h3 className="lg:text-2xl text-base font-medium mb-1 lg:mb-3">
                                            {message.contact?.name || message.name || "Wedding Guest"}
                                        </h3>
                                        <p className="text-gray-300 text-sm lg:text-base w-max">
                                            {message.message || "Congratulations on your wedding day!"}
                                        </p>
                                    </div>
                                    {index === 2 && (
                                        <motion.div
                                            onClick={handleClickOpenModalGift}
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
                                            className="border-l-4 border-gray-400 absolute right-[-2rem] lg:right-[-2.5rem] py-2 pr-10 pl-3 will-change-auto"
                                        >
                                            <p className="text-sm">Sending gift?</p>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}