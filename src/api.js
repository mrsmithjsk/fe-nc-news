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

export const getCommentByArticleById = async (article_id) => {
    try {
        const response = await axios.get(`${baseUrl}/articles/${article_id}/comments`)
        return response.data.comments;
    } catch (error) {
        throw new Error('Failed to fetch comments by ID');
    }
}

export const voteArticle = async (article_id, increment) => {
    try {
        const response = await axios.patch(`${baseUrl}/articles/${article_id}`, {
            inc_votes: increment ? 1 : -1,
        });
        return response.data.article;
    } catch (error) {
        throw new Error('Failed to vote on the article');
    }
};

export const getArticleVotes = async (article_id) => {
    try {
        const response = await axios.get(`${baseUrl}/articles/${article_id}`);
        return response.data.article.votes;
    } catch (error) {
        throw new Error('Failed to get article votes');
    }
};

export const postCommentById = async (article_id, { username, body }) => {
    try {
        const hardcodedUsername = 'cooljmessy'; 
        const response = await axios.post(`${baseUrl}/articles/${article_id}/comments`, { username: hardcodedUsername, body });
        return response.data.comments;
    } catch (error) {
        throw new Error('Failed to submit comment');
    }
};