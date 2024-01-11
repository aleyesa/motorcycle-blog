import React, { Component } from "react";
import { createComment, getReplies } from "../../api/comments";

export default class Replies extends Component {

    constructor(props) {

        super(props);

        this.state = {
            comment: "",
            replies: [],
            reply: "",
            hide: true
        }

        this.setRepliesData = this.setRepliesData.bind(this);

    }

    componentDidMount() {
        this.setRepliesData(this.props.comment_id);

    }

    componentDidUpdate() {

        this.state.replies;

    }

    setRepliesData = (comment_id) => {

        getReplies(comment_id)
        .then(response => {
            this.setState({
                replies: response.data
            });

        })
        .catch(error => {

            return error;

        });

    }

    render() {

        return (
            this.state.replies.map(reply => 

                <div className="replies-section">
                                    {console.log(this.state.replies)}
                    <div>
                        <div accessKey={reply.comment_id} key={reply.comment_id}>
                            <p>{reply.commentor}</p>
                            <p>{reply.comment}</p>
                        </div>



                        <form onSubmit={e => {
                            e.preventDefault();
                            if(localStorage.getItem("commentor")) {
                                createComment(localStorage.getItem("commentor"), this.state.reply, reply.comment_id);    

                            } else {
                                console.log("Create a commentor key for use");
                                localStorage.setItem("commentor", "Moto-Enthusiast"+ (this.state.comments.length + 1)); 
                                createComment(localStorage.getItem("commentor"), this.state.reply, reply.comment_id);     
                            }

                            }}>
                            <input 
                                type="text"
                                onChange={e => this.setState({ reply: e.target.value })}
                            />
                            <button type="submit"  >Reply</button>
                        </form>

                        
                        {/* <button onClick={e => {
                            
                            this.setState({
                                hide: false,
                                comment: reply
                            });
                            

                            {console.log(this.state.comment.comment_id)}
                            }}>show replies</button>
                            {this.state.hide === false && 
                                this.setRepliesData(this.state.comment.comment_id)
        

                            
                            } */}
                    </div>        
                </div>
            )
        );
    }
}