import React, {useState, useEffect} from "react";
import {getArticleById} from './api';
import { useParams } from 'react-router-dom';

const Article = () => {
    const [article, setArticle] = useState(null);
    const { article_id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
              const article = await getArticleById(article_id);
              setArticle(article);
            } catch (error) {
              console.error('Error fetching articles:', error);
            }
        }
        fetchArticle();
    }, [article_id]);
    
    if(!article) {return <div className="loading">Loading...</div>;}

    return (
        <div>
            <div className="article-container">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-metadata">
                <span className="article-author">Author: {article.author}</span>
                <span className="article-date">Published on: {new Date(article.created_at).toLocaleDateString()}</span>
            </p>
            <img className="article-image" src={article.article_img_url} alt={article.title} />
            <p className="article-body">{article.body}</p>
        </div>
        </div>
    )
};

export default Article;