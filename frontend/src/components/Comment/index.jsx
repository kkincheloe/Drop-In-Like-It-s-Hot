import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"
import './styles.css'

export default function Comment({ data, refreshComments }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    })

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowEditForm(false)
        updateComment(editFormData, data._id)
            .then(() => refreshComments())
    }

    function handleDelete() {
        deleteComment(data._id)
            .then(() => refreshComments())
    }

    if (showEditForm) {
        return (
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                <input
                    name="name"
                    className="px-2 py-1 w-full bg-gray-100"
                    placeholder="Your name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                />
                <br />
                <textarea
                    name="content"
                    className="p-2 my-2 h-[100px] w-[100px] bg-gray-100 flex-column"
                    placeholder="Write Your Comment!"
                    value={editFormData.content}
                    onChange={handleInputChange}
                />
                <div>
                    <button
                        onClick={() => { setShowEditForm(false) }}
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Close
                    </button>
                    <button
                        type="submit"
                        className="text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </div>
            </form>
        )

    } else {
        return (
            <div className="comment-container">
                <p className="comment-name">{data.name}</p>
                <p className="comment-content">{data.content}</p>
                <div className="flex justify-end">
                    <button onClick={() => { setShowEditForm(true) }} className="edit-button">Edit</button>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </div>
            </div>
        );
        
    }
}