import React, { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import { getAllArticles } from './api';

const Homepage = () => {
  const [articleList, setArticleList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [originalArticleList, setOriginalArticleList] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getAllArticles();
        setArticleList(articles);
        setOriginalArticleList(articles); 
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    fetchArticles();
  }, []);

  const handleFilterByTopic = async (topic) => {
    try {
        let filteredArticles;
    
        if (topic) {
          filteredArticles = originalArticleList.filter(article => article.topic === topic);
        } else {
          filteredArticles = originalArticleList;
        }
        setArticleList(filteredArticles);
      } catch (error) {
        console.error('Error filtering articles:', error);
      }
    };

  return (
    <div>
    <h2>Articles</h2>
    {articleList.length > 0 ? (
      <>
        <ArticleList articleList={articleList} onFilterByTopic={handleFilterByTopic} />
      </>
    ) : (
      <p>No articles available.</p>
    )}
  </div>
  );
};

export default Homepage;
