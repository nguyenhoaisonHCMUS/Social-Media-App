import { icons } from '@/assets/icons';
import { toast } from '@/components/ui/use-toast';
import { RootState } from '@/redux/store';
import { updateProfile, updateUserReqType } from '@/service/app/UserService';
import { CircleUserRound } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface CustomFile extends File {
    fieldname?: string;
}

function UpdateProfile() {
    const user = useSelector((state: RootState) => state.auth.currentUser);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState<File | ''>('');
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();

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
        event.preventDefault();
        const data: updateUserReqType = {
            data: {
                name,
                email,
                file: image as File,
            },
            _id: parseInt(user.user._id),
        };
        const res = await updateProfile(data);
        console.log(res);
        if (res.status == 200) {
            toast({ title: 'update user successfull' });
            navigate(`/profile/${user.user._id}`);
        } else {
            toast({ title: 'update user failed' });
        }
    };

    return (
        <div className=" flex-center w-full">
            <div className=" px-10 py-10 w-full overflow-scroll">
                <div className=" flex items-center justify-start gap-1 mb-5 w-[90%]">
                    <CircleUserRound strokeWidth={2} width={36} height={36} />
                    <h2 className=" h3-bold md:h2-bold text-left w-full ">Edit profile</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-9 w-full  max-w-5xl relative">
                    <input
                        type="file"
                        id="image"
                        name="image_user"
                        className=" hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image" className="shad-form_label text-xl">
                        Choose an avatar
                        {previewImage ? (
                            <div className=" flex-center flex-col">
                                <div className="flex justify-center w-[200px] h-[200px] rounded-full overflow-hidden bg-slate-600 p-2 lg:p-5">
                                    <img src={previewImage} alt="image" className=" w-full object-cover rounded-full" />
                                </div>
                                <p className="file_uploader-label w-fit">Click or drag photo to replace</p>
                            </div>
                        ) : (
                            <div className=" flex items-center justify-center">
                                <div className=" w-fit">
                                    <img src={icons.file_upload} className=" rounded-full" alt="file upload" />

                                    <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
                                    <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
                                </div>
                            </div>
                        )}
                    </label>
                    <label htmlFor="profile_name" className="shad-form_label text-xl">
                        Name
                    </label>
                    <input
                        type="text"
                        id="profile_name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shad-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="profile_email" className="shad-form_label text-xl">
                        Email
                    </label>
                    <input
                        type="text"
                        id="profile_email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shad-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className=" flex justify-end gap-4">
                        <div
                            onClick={() => {
                                navigate(`/profile/${user.user._id}`);
                            }}
                            className=" bg-slate-700 min-w-72 hover:opacity-90 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-xl font-semibold"
                        >
                            Cancel
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className=" min-w-72 hover:opacity-90 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-xl font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shad-button_primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
