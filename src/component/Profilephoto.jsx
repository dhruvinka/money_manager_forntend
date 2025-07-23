import { Trash, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function ProfilePhoto({ imageFile, setImageFile }) {
    const inputRef = useRef(null);
    const [showUrl, setShowUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setShowUrl(previewUrl);
        }
    };

    const handleRemove = (e) => {
        e.preventDefault();
        setImageFile(null);
        setShowUrl(null);
    };

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!imageFile ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <User className="text-purple-500" size={35} />
                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
                    >
                        <Upload size={15} className="text-purple-700" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={showUrl}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1"
                    >
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
}
