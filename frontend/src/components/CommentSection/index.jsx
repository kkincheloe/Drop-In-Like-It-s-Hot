import { useState, useEffect } from "react";
import { postComment, getComments } from "../../../utils/backend";
import Comment from "../Comment";
import './styles.css';

export default function CommentSection({ poisId }) {
    const [comments, setComments] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    });

    useEffect(() => {
        refreshComments();
    }, [poisId]);

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm);
    }

    function refreshComments() {
        getComments(poisId)
            .then(newCommentData => setComments(newCommentData));
    }

    function handleSubmit(event) {
        event.preventDefault();
        postComment({ ...createFormData, poisId: poisId })
            .then(() => {
                refreshComments();
                setCreateFormData({ name: '', content: '' }); 
                setShowCreateForm(false); 
            });
    }

    let btnText = showCreateForm ? 'Close' : 'Create';

    return (
        <div className="comment-section">
            <h1 className='text-xl font-bold'>Comments</h1>
            <button
                onClick={toggleCreateForm}
                className="create-close-button">
                {btnText}
            </button>

            {showCreateForm && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        name="name"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="content"
                        placeholder="Share your thoughts!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="comment-button">Post Comment</button>
                </form>
            )}

            {comments.length > 0 ? (
                comments.map(comment => (
                    <Comment key={comment._id} data={comment} refreshComments={refreshComments} />
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}
