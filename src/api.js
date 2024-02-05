import axios from "axios";

const baseUrl = 'https://nc-news-api-qdyy.onrender.com/api'

export const getAllArticles = async () => {
    try {
        const response = await axios.get(`${baseUrl}/articles`);
        console.log('API Response:', response.data);
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch articles');
    }
};

