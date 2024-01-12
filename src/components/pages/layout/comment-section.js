import React, { Component } from "react";
import { getAllComments, createComment } from "../../api/comments";

export default class CommentSection extends Component {

    constructor(props) {

        super(props);

        this.state = {
            comments: [],
            comment: ""
        }

        this.setCommentsData = this.setCommentsData.bind(this);

    }

    componentDidMount() {

        this.setCommentsData();

    }

    componentDidUpdate() {

        this.state.main_comments;

    }

    setCommentsData = () => {

        getAllComments()
        .then(response => {
           
            this.setState({
                comments: response.data
            });

        })
        .catch(error => {

            return error;

        });

    }

    render() {

        return (
            <div className="comments-section">
            { this.state.comments.map( comment=> 
            
                <div accessKey={comment.comment_id} key={comment.comment_id}>
                    <p>{comment.commentor}</p>
                    <p>{comment.comment}</p>
                </div>
               
             )}
                <div >
                    <form onSubmit={e => {
                        e.preventDefault();
                        if(localStorage.getItem("commentor")) {
                            createComment(localStorage.getItem("commentor"), this.state.comment);     
                        } else {
                            console.log("Create a commentor key for use");
                            localStorage.setItem("commentor", "Moto-Enthusiast"+ (this.state.comments.length + 1)); 
                            createComment(localStorage.getItem("commentor"), this.state.comment);    
                        }
                        this.setCommentsData();
                    }}>
                        <input 
                            type="text"
                            onChange={e => this.setState({ comment: e.target.value})}
                        />
                        <button type="submit"  >Create Comment</button>
                    </form>
                </div>
            </div>
        );
    }
}