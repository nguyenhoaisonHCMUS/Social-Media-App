import PostForm from '@/components/forms/PostForm';
import { GetPostOfID } from '@/service/app/PostService';
import { PostCardProps } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdatePost() {
    const { _id } = useParams();
    const [post, setPost] = useState<PostCardProps>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchApiPost = async () => {
            setLoading(true);
            const res = await GetPostOfID(_id as string);
            if (res.status === 200 && res.data) {
                setPost(res.data.data[0]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchApiPost();
    }, [_id]);
    return (
        <>
            {loading ? (
                <div>no</div>
            ) : (
                <div className=" px-10 py-10 w-full overflow-scroll">
                    <PostForm action="Update" post={post} />
                </div>
            )}
        </>
    );
}

export default UpdatePost;
