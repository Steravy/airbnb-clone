'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";


declare global {
    var cloudinary: any;
}

interface ImageUploaderProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange, value }) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            // cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            onUpload={handleUpload}
            uploadPreset="grv8p1ql"
            options={{ maxFiles: 1 }}
        >
            {({ open }) => {
                return (
                    <article
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover-:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                    >
                        <TbPhotoPlus size={40} />
                        <span className="font-semibold text-lg" >Click to upload</span>
                        {
                            value && (
                                <article className="absolute inset-0 w-full h-full" >
                                    <Image alt="Uploaded image" src={value} fill style={{ objectFit: 'cover' }} />
                                </article>
                            )
                        }
                    </article>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUploader;