import EmojiPicker from 'emoji-picker-react';
import { Image, X } from 'lucide-react';
import React, { useState } from 'react';

export default function EmojiPickerPopup({ icon, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-7 relative'>
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <span className='text-2xl'>{icon}</span>
                    ) : (
                        <Image />
                    )}
                </div>
                <p className="text-sm text-purple-500">{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-black/20 w-full h-full flex justify-center pt-10">
                    <div className="relative bg-white p-4 rounded-lg shadow-lg">
                        <button
                            onClick={() => setIsOpen(false)}
                            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                        >
                            <X size={12} />
                        </button>

                        <EmojiPicker
                            onEmojiClick={(emojiData) => {
                                onSelect(emojiData.emoji);
                                setIsOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
