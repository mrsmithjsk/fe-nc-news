import React, {useState, useEffect} from "react";
import ArticleList from "./ArticleList";
import {getAllArticles} from './api';

const Homepage = () => {
    const [articleList, setArticleList] = useState([]);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
              const articles = await getAllArticles();
              setArticleList(articles);
            } catch (error) {
              console.error('Error fetching articles:', error);
            }
        }
        fetchArticles();
    }, []);

    return(
        <div>
            <h2>All Articles</h2>
            <ArticleList articleList={articleList} />
        </div>
    );

};

export default Homepage;