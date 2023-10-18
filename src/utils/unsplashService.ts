// src/unsplashService.ts

import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.API_ACCESS_KEY;
const API_URL = 'https://api.unsplash.com/search/photos';

export const getImages = async (query: string): Promise<any> => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
        throw error;
    }
};
