import axios from "axios";

const baseUrl = 'https://nc-news-api-qdyy.onrender.com/api'

export const getAllArticles = async () => {
    try {
        const response = await axios.get(`${baseUrl}/articles`);
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch articles');
    }
};

export const getArticleById = async (article_id) => {
    try {
        const response = await axios.get(`${baseUrl}/articles/${article_id}`);
        return response.data.article;
    } catch (error) {
        throw new Error('Failed to fetch article by ID');
    }
};

