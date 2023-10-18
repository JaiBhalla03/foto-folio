import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Card, Modal} from 'antd';
import SkeletonCard from './SkeletonCard';
import Navbar from './Navbar';
import { AiOutlineLike } from 'react-icons/ai';
import {CiLocationOn} from "react-icons/ci";


const Gallery = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [selectedCard, setSelectedCard] = useState<any>(null);

    const baseUrlRef = useRef<string | null>(null);

    const REACT_APP_API_ACCESS_KEY = process.env.REACT_APP_API_ACCESS_KEY;

    const fetchData1 = async () => {
        try {
            if (baseUrlRef.current) {
                const response = await axios.get(baseUrlRef.current);
                setData(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            if (baseUrlRef.current) {
                const response = await axios.get(baseUrlRef?.current);
                setData(response.data.results);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (searchTerm !== '') {
            baseUrlRef.current = `https://api.unsplash.com/search/photos/?client_id=${REACT_APP_API_ACCESS_KEY}&query=${searchTerm}&per_page=30`;
            fetchData2();
        } else {
            baseUrlRef.current = `https://api.unsplash.com/photos/?client_id=${REACT_APP_API_ACCESS_KEY}&per_page=30`;
            fetchData1();
        }
    }, [searchTerm, REACT_APP_API_ACCESS_KEY]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    };

    const handleCardClick = (card: any) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };


    return (
        <>
            <Navbar searching={handleSearch} onThemeChange={handleThemeChange} />
            <div className={`pt-10 px-4 md:px-20 flex w-full justify-center ${theme === 'dark' ? 'bg-[#101010]' : 'bg-gray-200'}`}>
                {loading ? (
                    <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 w-full mx-auto space-y-8 pb-28'}>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                        <SkeletonCard isDarkMode={theme}/>
                    </div>
                ) : (
                    <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 w-full mx-auto space-y-8 pb-28'}>
                        {Array.isArray(data) ? (
                            data?.map((card: any) => (
                                <div
                                    onClick={() => handleCardClick(card)}
                                    key={card?.id}
                                    className={'hover:scale-110 transition-all duration-300 h-min m-2 break-inside-avoid flex justify-center'}
                                >
                                    <Card
                                        hoverable={true}
                                        style={{
                                            width: '100%', // Set width to 100% for mobile view
                                            maxWidth: '360px', // Set maximum width for larger screens
                                            margin: 'auto', // Center the card
                                        }}
                                        cover={<img alt="example" src={card.urls.full} />}
                                        className={`${theme === 'dark' ? 'bg-[#151515]' : 'bg-gray-300'} border-none`}
                                    >
                                        <div className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                            <p className={'text-xl font-bold'}>{card?.sponsorship?.sponsor?.username}</p>
                                            <p className={'text-md font-normal'}>{card?.alt_description} </p>
                                            <div className={'w-full flex justify-end gap-1 items-center'}>
                                                {card?.likes}
                                                <AiOutlineLike />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <p>No array</p>
                        )}
                    </div>
                )}
            </div>
            {selectedCard && (
                <Modal
                    open={!!selectedCard}
                    onCancel={handleCloseModal}
                    footer={null}
                    centered
                >
                    <div className={'flex flex-col md:flex-row items-center gap-4'}>
                        <div className={'w-full md:w-1/2'}>
                            <img alt="example" src={selectedCard.urls.full} className={'rounded-lg h-full w-auto object-cover'}/>
                        </div>
                        <div className={'w-96 w-full md:w-1/2 flex flex-col gap-2'}>
                            <div className={'flex flex-col gap-1'}>
                                <div className={'font-bold text-lg'}>DESCRIPTION</div>
                                <p className={'font-normal text-md'}>{selectedCard.alt_description}</p>
                            </div>
                            <div className={'flex gap-2 items-center'}>{selectedCard.likes} <AiOutlineLike/></div>
                            <div className={'flex flex-col gap-1'}>
                                <div className={'text-lg font-bold'}>DEMENSIONS</div>
                                <div className={'bg-gray-300 w-32 flex items-center justify-center p-1 rounded-md'}>{selectedCard?.width} x {selectedCard?.height}</div>
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <div className={'font-bold text-lg'}>COLOR</div>
                                <p className={'font-normal text-md'}>{selectedCard?.color}</p>
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <div className={'font-bold text-lg'}>USERNAME</div>
                                <div>{
                                    selectedCard?.sponsorship?.sponsor?.username ? (
                                        <p>{selectedCard?.sponsorship?.sponsor?.username}</p>
                                    ) : (<p>NOT AVAILABLE</p>)
                                }</div>
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <div className={'font-bold text-lg'}>BIO</div>
                                <div>{
                                    selectedCard?.sponsorship?.sponsor?.bio ? (
                                        <p>{selectedCard?.sponsorship?.sponsor?.bio}</p>
                                    ) : (<p>NOT AVAILABLE</p>)
                                }</div>
                            </div>
                            <div className={'flex items-center gap-1'}>
                                <div className={'font-bold text-lg'}><CiLocationOn/></div>
                                <div>{
                                    selectedCard?.sponsorship?.sponsor?.location ? (
                                        <p>{selectedCard?.sponsorship?.sponsor?.location}</p>
                                    ) : (<p>NOT AVAILABLE</p>)
                                }</div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Gallery;
