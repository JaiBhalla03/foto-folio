import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Skeleton } from 'antd';
import SkeletonCard from "./SkeletonCard";
import Navbar from "./Navbar";

const { Meta } = Card;

const Gallery = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    let baseUrl: string;

    const REACT_APP_API_ACCESS_KEY = process.env.REACT_APP_API_ACCESS_KEY

    const fetchData1 = async () => {
        try {
            const response = await axios.get(baseUrl);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const response = await axios.get(baseUrl);
            setData(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if(searchTerm !== ''){
            baseUrl = `https://api.unsplash.com/search/photos/?client_id=${REACT_APP_API_ACCESS_KEY}&query=${searchTerm}&per_page=30`;
            fetchData2()
        }
        else{
            baseUrl = `https://api.unsplash.com/photos/?client_id=${REACT_APP_API_ACCESS_KEY}&per_page=30`;
            fetchData1();
        }
    }, [searchTerm]);

    console.log(searchTerm);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    console.log('REACT_APP_API_ACCESS_KEY:', process.env.REACT_APP_API_ACCESS_KEY);

    console.log(data);

    return (
        <>
            <Navbar searching={handleSearch}/>
            <div className={'pt-20 px-20 flex w-full justify-center'}>
                {
                    loading ? (
                        <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 w-full mx-auto space-y-8 pb-28'}>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                        </div>
                    ) : (
                        <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 w-full mx-auto space-y-8 pb-28'}>
                            {Array.isArray(data) ? (
                                data?.map((card: any) => (
                                    <div key={card?.id} className={'hover:scale-110 transition-all duration-300 h-min m-2 break-inside-avoid flex justify-center'}>
                                        <Card
                                            hoverable={true}
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={card.urls.full} />}
                                            className={'bg-[#141414] border-none'}
                                        >
                                            <div className={'text-white'}>
                                                <p>{card?.sponsorship?.sponsor?.username}</p>
                                                <p>{card?.alt_description} </p>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            ): (
                                    <p>No array</p>
                            )}
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default Gallery;
