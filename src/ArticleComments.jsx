import React, {useState, useEffect} from "react";
import {getCommentByArticleById, voteArticle, getArticleVotes, postCommentById, deleteCommentById} from './api';
import { useParams } from 'react-router-dom';

const ArticleComments = () => {
    const [comments, setComments] = useState([]);
    const [articleVotes, setArticleVotes] = useState(0);
    const [voteMessage, setVoteMessage] = useState('');
    const [voted, setVoted] = useState(false);
    const [commentMessage, setCommentMessage] = useState('');
    const [newComment, setNewComment] = useState({ username: '', body: '' });
    const [deletingCommentId, setDeletingCommentId] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);


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
            setSubmitting(true);
            const { body } = newComment;
            if(!body) {
                setCommentMessage('Please fill out all required fields');
                setTimeout(() => {
                    setCommentMessage('');
                }, 3000);
                return;
            }

            await postCommentById(article_id, {username: hardcodedUsername, body});

            setCommentMessage('Comment posted!')
            setTimeout(() => {
                setCommentMessage('');
            }, 3000);
            setNewComment({/*username: '',*/ body: '' });

            const commentsData = await getCommentByArticleById(article_id);
            setComments(commentsData);
        } catch (error) {
            console.error('Error submitting comment:', error);
            setCommentMessage('Failed to submit comment');
        } finally {
            setSubmitting(false);
        }
    };


    const handleCommentDelete = async (comment_id) => {
        try {
            setComments((prevComments) =>
            prevComments.map((comment) =>
            comment.comment_id === comment_id ? { ...comment, deleting: true } : comment
            ));
            setDeletingCommentId(comment_id);
            await deleteCommentById(comment_id);
            setFeedbackMessage('Comment deleted successfully!');
            setTimeout(() => {
                setFeedbackMessage('');
            }, 3000);
            setComments((prevComments) =>
            prevComments.filter((comment) => comment.comment_id !== comment_id)
    );
        } catch (error) {
            console.error('Error deleting comment:', error);
            setFeedbackMessage('Failed to delete comment. Please try again.');
            setTimeout(() => {
                setFeedbackMessage('');
            }, 3000);
        } finally {
            setDeletingCommentId(null);
        }
    };



    return (
        <>
        <div>
            {voteMessage && <p className="vote-message">{voteMessage}</p>}
            <button onClick={() => handleArticleVote(true)}>Upvote Article</button>
            <button onClick={() => handleArticleVote(false)}>Downvote Article</button>
          </div>
        <div>
        <form onSubmit={handleCommentSubmit} className="comment-form">
                {/* <label className="form-label">
                    Username:
                    <input
                        type="text"
                        value={newComment.username}
                        onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                        className="form-input"
                    />
                </label> */}
                <br />
                <label className="form-label">
                    <textarea
                        value={newComment.body}
                        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                        className="form-textarea"
                    />
                </label>
                <br />
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Comment'}
                    </button>
            </form>
            {commentMessage && <p className="comment-message">{commentMessage}</p>}
        </div>
        {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
        <div>
          <h3 className="comment-heading">Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.comment_id} className={`comment-container ${comment.deleting ? 'deleting' : ''}`}>
                  <p className="comment-body">{comment.body}</p>
                  <p className="comment-author">Author: {comment.author}</p>
                  {comment.author === 'cooljmessy' && (
                  <button onClick={() => handleCommentDelete(comment.comment_id)}
                  disabled={deletingCommentId === comment.comment_id}>
                    {deletingCommentId === comment.comment_id ? 'Deleting...' : 'Delete Comment'}
                    </button>
                    )}
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