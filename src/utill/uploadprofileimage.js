import { API_ENDPOINT } from "./apiEndpoint";

const CLOUDNARY_UPLOAD_PRESET = "moneymaneger";

export const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDNARY_UPLOAD_PRESET);

    try {
        const res = await fetch(API_ENDPOINT.UPLOAD_IMAGE, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            const er = await res.json();
            throw new Error(er.error?.message || "Failed to upload image");
        }

        const data = await res.json();
        console.log('Image uploaded successfully:', data);
        return data.secure_url;

    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
    }
};

export default uploadProfileImage;
