import axios from "axios";

export function getMainComments() {

    return axios.get('/api/main/comments');

};

export function getReplies(comment_ref) {

    return axios.get(`/api/replies/${comment_ref}`);

};

export function createComment(commentor, comment, comment_ref) {

    axios.post('/api/create/comment', {commentor, comment, comment_ref});

};