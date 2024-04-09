import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';
import { icons } from '@/assets/icons';

type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

    console.log(fileUrl);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [file],
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
    });

    return (
        <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
            <input {...getInputProps()} type="file" name="create_post_pic" className="cursor-pointer block" />

            {fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="image" className="file_uploader-img" />
                    </div>
                    <p className="file_uploader-label">Click or drag photo to replace</p>
                </>
            ) : (
                <div className="file_uploader-box ">
                    <img src={icons.file_upload} width={96} height={77} alt="file upload" />

                    <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
                    <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

                    <Button type="button" className="shad-button_dark_4">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
