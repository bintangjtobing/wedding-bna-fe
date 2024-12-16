// components/ImageModal.tsx

'use client'

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg focus:outline-none z-50"
        >
          <div className="relative">
            <Dialog.Close asChild>
              <button
                className="absolute right-2.5 top-2.5 inline-flex h-[30px] w-[30px] items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
            <img
              src={imageUrl}
              alt="Enlarged"
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageModal;
