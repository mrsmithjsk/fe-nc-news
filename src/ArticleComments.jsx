import React, {useState, useEffect} from "react";
import {getCommentByArticleById, voteArticle, getArticleVotes, postCommentById} from './api';
import { useParams } from 'react-router-dom';

const ArticleComments = () => {
    const [comments, setComments] = useState([]);
    const [articleVotes, setArticleVotes] = useState(0);
    const [voteMessage, setVoteMessage] = useState('');
    const [voted, setVoted] = useState(false);
    const [commentMessage, setCommentMessage] = useState('');
    const [newComment, setNewComment] = useState({ username: '', body: '' });
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
            if(!voted) {
                const newArticleVotes = increment ? articleVotes + 1 : articleVotes - 1;
                setArticleVotes(newArticleVotes);
                setVoted(true);
                
                if(navigator.onLine) {
                    await voteArticle(article_id, increment);
                } else {
                console.log('You are currently offline.');
            }

            setVoteMessage(`Votes: ${newArticleVotes}`);
        } else {
            console.log('You have already voted.');
        }
        } catch (error) {
            console.error('Error voting on article:', error);
            setArticleVotes(articleVotes);
            setVoted(false);
            setVoteMessage('Failed to vote on article');
        }
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const hardcodedUsername = 'cooljmessy';
        try {
            const { body } = newComment;
            if(!body) {
                setCommentMessage('Please fill out all required fields');
                return;
            }

            await postCommentById(article_id, {username: hardcodedUsername, body});

            setCommentMessage('Comment posted!')
            setNewComment({username: '', body: ''});

            const commentsData = await getCommentByArticleById(article_id);
            setComments(commentsData);
        } catch (error) {
            console.error('Error submitting comment:', error);
            setCommentMessage('Failed to submit comment');
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
        <form onSubmit={handleCommentSubmit} className="comment-form">
                <label className="form-label">
                    Username:
                    <input
                        type="text"
                        value={newComment.username}
                        onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                        className="form-input"
                    />
                </label>
                <br />
                <label className="form-label">
                    Comment:
                    <textarea
                        value={newComment.body}
                        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                        className="form-textarea"
                    />
                </label>
                <br />
                <button type="submit">
                    Submit Comment
                    </button>
            </form>
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