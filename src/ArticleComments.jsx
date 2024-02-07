import React, {useState, useEffect} from "react";
import {getCommentByArticleById, voteArticle, getArticleVotes} from './api';
import { useParams } from 'react-router-dom';

const ArticleComments = () => {
    const [comments, setComments] = useState([]);
    const [articleVotes, setArticleVotes] = useState(0);
    const [voteMessage, setVoteMessage] = useState('');
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

        const fetchArticleVotes = async () => {
            try {
                const votes = await getArticleVotes(article_id);
                setArticleVotes(votes);
            } catch (error) {
                console.error('Error fetching article votes:', error);
            }
        }

        fetchComments();
        fetchArticleVotes();
    }, [article_id]);

    const handleArticleVote = async (increment) => {
        try {
            const newArticleVotes = increment ? articleVotes + 1 : articleVotes - 1;
            setArticleVotes(newArticleVotes);
            await voteArticle(article_id, increment);
            setVoteMessage(`Votes: ${newArticleVotes}`);
        } catch (error) {
            console.error('Error voting on article:', error);
            setVoteMessage('Failed to vote on article');
        }
    };

    return (
        <>
        <div>
            <p>Article Votes: {articleVotes}</p>
            {voteMessage && <p className="vote-message">{voteMessage}</p>}
            <button onClick={() => handleArticleVote(true)}>Upvote Article</button>
            <button onClick={() => handleArticleVote(false)}>Downvote Article</button>
          </div>
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
        </>
      );
}

export default ArticleComments;