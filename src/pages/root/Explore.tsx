import { useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';

import { Input } from '@/components/ui/input';
import useDebounce from '../../hook/useDebounce';
import { GridPostList, Loader } from '@/components/shared';
import { icons } from '@/assets/icons';
import { POSTS } from '@/types';
import { INIT_STATE_POST } from '@/types/initValueType';
import { GetPostOfCaption, getAll } from '@/service/app/PostService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from '@/components/ui/use-toast';

export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: POSTS;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loader />;
    } else if (searchedPosts.length > 0) {
        return <GridPostList posts={searchedPosts} />;
    } else {
        return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
    }
};

const Explore = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<POSTS | POSTS[]>(INIT_STATE_POST);
    const debouncedSearch = useDebounce(searchValue, 1000);
    const userInfo = useSelector((state: RootState) => state.auth.currentUser);

    useEffect(() => {
        if (!debouncedSearch.trim()) {
            // setSearchResult([]);
            const fetchDataPostAll = async () => {
                const res = await getAll(userInfo.accessToken);
                console.log(res);
                if (!res || !res.data) {
                    toast({ title: 'request failed' });
                    return;
                }
                setSearchResult(res.data);
            };
            console.log('request');
            fetchDataPostAll();
            return;
        }
        const fetchDataPost = async () => {
            const res = await GetPostOfCaption(searchValue, userInfo.accessToken);
            console.log(res);
            if (!res || !res.data) {
                toast({ title: 'request failed' });
                return;
            }
            setSearchResult(res.data);
        };
        console.log('request');
        fetchDataPost();
    }, [debouncedSearch, userInfo.accessToken]);

    if (!searchResult) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
    }

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
                <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
                    <img src={icons.search} width={24} height={24} alt="search" />
                    <Input
                        type="text"
                        placeholder="Search"
                        className="explore-search"
                        value={searchValue}
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearchValue(value);
                        }}
                    />
                </div>
            </div>
            <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                <h3 className="body-bold md:h3-bold">Popular Today</h3>

                <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">All</p>
                    <img src={icons.filter} width={20} height={20} alt="filter" />
                </div>
            </div>
            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                {searchValue !== '' && !searchResult ? (
                    <SearchResults isSearchFetching={true} searchedPosts={searchResult} />
                ) : (
                    <GridPostList posts={searchResult} showStats={false} />
                )}
            </div>
        </div>
    );
};

export default Explore;
