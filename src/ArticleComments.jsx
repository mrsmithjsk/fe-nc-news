import React, {useState, useEffect} from "react";
import {getCommentByArticleById} from './api';
import { useParams } from 'react-router-dom';

const ArticleComments = () => {
    const [comments, setComments] = useState([]);
    const { article_id } = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentByArticleById(article_id);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [article_id]);

    return (
        <div>
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.comment_id} className="comment-container">
                  <p className="comment-body">{comment.body}</p>
                  <p className="comment-author">Author: {comment.author}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments available</p>
          )}
        </div>
      );
}

export default ArticleComments;