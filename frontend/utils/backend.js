import axios from 'axios'

export async function getComments(poisId) {
    const { data } = await axios.get(`/api/comments/${poisId}`)
    return data
}

export async function postComment(comment) {
    const { data } = await axios.post('/api/comments', comment)
    return data
}
export async function updateComment(comment, poisId) {
    const { data } = await axios.put(`/api/comments/${poisId}`, comment)
    return data
}

export async function deleteComment(poisId) {
    const { data } = await axios.delete(`/api/comments/${poisId}`)
    return data
}