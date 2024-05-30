import React, { FormEvent, useState, useEffect } from 'react';
import { PostCardProps } from '@/types';
import { icons } from '@/assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createPost, updatePost } from '@/service/app/PostService';
import { toast } from '../ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

type PostFormProps = {
    post?: PostCardProps;
    action: 'Create' | 'Update';
};
interface CustomFile extends File {
    fieldname?: string;
}

const PostForm: React.FC<PostFormProps> = ({ action, post }) => {
    const user = useSelector((state: RootState) => state.persistedReducer.auth.currentUser);
    // console.log('post: ', post);

    const [caption, setCaption] = useState<string>(post?.caption || '');
    const [location, setLocation] = useState<string>(post?.location || '');
    const [tags, setTags] = useState<string>(post?.tags || '');
    const [image, setImage] = useState<File | ''>('');
    const [previewImage, setPreviewImage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (image instanceof File) {
                URL.revokeObjectURL(previewImage); // Revoke the Object URL to free resources
            }
        };
    }, [image, previewImage]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files && event.target.files[0];
        if (selectedImage) {
            const fieldName = selectedImage.name;
            const modifiedFile: CustomFile = new File([selectedImage], fieldName, { type: selectedImage.type });
            modifiedFile.fieldname = fieldName;

            setImage(modifiedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (action === 'Create') {
            if (!location || !tags || !caption || !image) {
                event.preventDefault();
                toast({ title: 'Please fill in all information!!' });
                return;
            }
            event.preventDefault();
            // const tagsArray = tags.split(',');
            const formData = new FormData();
            formData.append('caption', caption);
            formData.append('location', location);
            formData.append('tags', tags);
            formData.append('creator', user.user._id);
            formData.append('image_post', image);

            const res = await createPost(formData);
            if (!res) {
                toast({ title: 'create Post FAILED!!' });
                return;
            }
            navigate('/');
        } else if (action === 'Update') {
            event.preventDefault();

            const res = await updatePost({
                data: {
                    location,
                    caption,
                    tags,
                    image_post: image as File,
                },
                _id: post?._id as string,
            });
            console.log('update post res: ', res);
            if (res.status === 200) {
                toast({ title: 'Update post successfull' });
                navigate(`/post/${post?._id}`);
            } else {
                toast({ title: 'Update post failed' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-9 w-full  max-w-5xl relative">
            <label htmlFor="caption" className="shad-form_label text-xl">
                Caption
            </label>
            <input
                type="text"
                id="caption"
                name="caption"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shad-input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />

            <label htmlFor="location" className="shad-form_label text-xl">
                Location
            </label>
            <input
                type="text"
                id="location"
                name="location"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shad-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <label htmlFor="tags" className="shad-form_label text-xl">
                Tags
                <p className=" text-sm text-white">Each tag is separated by a comma</p>
            </label>
            <input
                type="text"
                id="tags"
                name="tags"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shad-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <label htmlFor="image" className="shad-form_label text-xl">
                Choose an image
                {previewImage ? (
                    <>
                        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                            <img src={previewImage} alt="image" className="file_uploader-img" />
                        </div>
                        <p className="file_uploader-label">Click or drag photo to replace</p>
                    </>
                ) : (
                    <div className="file_uploader-box ">
                        <img src={icons.file_upload} width={96} height={77} alt="file upload" />

                        <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
                        <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
                    </div>
                )}
            </label>
            <input
                type="file"
                id="image"
                name="image_post"
                className=" hidden items-center justify-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shad-input"
                accept="image/*"
                onChange={handleImageChange}
            />

            <div className=" flex items-center justify-end gap-3 flex-1">
                {action === 'Update' && (
                    <Link
                        className=" min-w-[240px] hover:opacity-90 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shad-button_primary"
                        to={`/`}
                    >
                        Cancel
                    </Link>
                )}
                <input
                    type="submit"
                    value={action === 'Create' ? 'Upload' : 'Update'}
                    className=" min-w-[240px] hover:opacity-90 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shad-button_primary"
                />
            </div>
        </form>
    );
};

export default PostForm;
