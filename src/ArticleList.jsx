import React from "react";
import {Link} from "react-router-dom";

const ArticleList = ({articleList, onFilterByTopic}) => {
    const handleFilter = (topic) => {
        onFilterByTopic(topic);
    };
    return (
        <div className="article-list">
            <div>
                <button onClick={() => handleFilter(null)}>All</button>
                <button onClick={() => handleFilter('coding')}>Coding</button>
                <button onClick={() => handleFilter('football')}>Football</button>
                <button onClick={() => handleFilter('cooking')}>Cooking</button>
        </div>
            {articleList.map((article) => (
                <Link to={`/articles/${article.article_id}`} key={article.article_id} className="article-card">
                    <img src={article.article_img_url} alt={article.title} className="article-image"/>
                    <h3>{article.title}</h3>
                    <p>Author: {article.author}</p>
                    <p>Published on: {new Date(article.created_at).toLocaleDateString()}</p>
                    <p>Votes: {article.votes}</p>
                    <p>Comments: {article.comment_count}</p>
                </Link>
            ))}
        </div>
    )
}


export default ArticleList;