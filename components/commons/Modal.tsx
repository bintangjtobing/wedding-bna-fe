'use client'

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const ModalWelcome = () => {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed z-50 inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed z-50 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-[25px] shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
                        <Dialog.Title className="m-0 text-[20px] font-bold text-gray-800 text-center">
                            Hello, Dear Guests!
                        </Dialog.Title>
                        <Dialog.Description className="mb-5 mt-3 text-[16px] leading-relaxed text-gray-700 text-center">
                            Selamat datang di cerita cinta kami! Kami sangat
                            bersemangat untuk membagikan momen spesial ini dengan Anda. Jangan lupa untuk meninggalkan pesan cinta Anda untuk kami di buku tamu!
                        </Dialog.Description>
                        <div className="mt-[25px] flex justify-center">
                            <Dialog.Close asChild>
                                <button
                                    className="inline-flex h-[40px] items-center justify-center rounded bg-pink-500 px-[20px] text-white font-medium hover:bg-pink-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                    onClick={() => setOpen(false)}
                                >
                                    Let's Celebrate!
                                </button>
                            </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute right-2.5 top-2.5 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                            >
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};

export default ModalWelcome;
