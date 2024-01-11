import React, { Component } from "react";
import { getMainComments, getReplies, createComment } from "../../api/comments";
import Replies from "./replies";

export default class CommentSection extends Component {

    constructor(props) {

        super(props);

        this.state = {
            main_comments: [],
            comment: "",
            replies: [],
            reply: "",
            hide: true
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

        getMainComments()
        .then(response => {
           
            this.setState({
                main_comments: response.data
            });

        })
        .catch(error => {

            return error;

        });

    }

    render() {

        return (
            <div className="comments-section">

            { this.state.main_comments.map( comment=> 
                <div>
                    <div accessKey={comment.comment_id} key={comment.comment_id}>
                        <p>{comment.commentor}</p>
                        <p>{comment.comment}</p>
                    </div>


                    <form onSubmit={e => {
                        e.preventDefault();
                        if(localStorage.getItem("commentor")) {
                            createComment(localStorage.getItem("commentor"), this.state.reply, comment.comment_id);    

                        } else {
                            console.log("Create a commentor key for use");
                            localStorage.setItem("commentor", "Moto-Enthusiast"+ (this.state.comments.length + 1)); 
                            createComment(localStorage.getItem("commentor"), this.state.reply, comment.comment_id);     
                        }

                        this.setCommentsData();
                        }}>
                        <input 
                            type="text"
                            onChange={e => this.setState({ reply: e.target.value })}
                        />
                        <button type="submit"  >Reply</button>
                    </form>


                    <div>
                        <button onClick={e => {
                            this.setState({
                                 hide: false,
                                 comment: comment
                                })
                            }}>show replies</button>
           

            
                    </div>



            </div>
             
             )}
            {console.log(this.state.comment.comment_id)}
            {this.state.hide === false && 

                <Replies comment_id={this.state.comment.comment_id} />
            }

     
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