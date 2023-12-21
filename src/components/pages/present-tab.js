import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import ContentForm from "./forms/content-form";


export default class PresentTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            present_tab: [],
            edited_tab_data: [],
            file: {},
            image_name: {},
            image_src: {},            
            content_title: {},
            content_details: {}

        }

    this.getPresents = this.getPresents.bind(this);
    this.submit = this.submit.bind(this);
    this.delImageById = this.delImageById.bind(this);
    this.replaceImage = this.replaceImage.bind(this);
    this.updatePresentTab = this.updatePresentTab.bind(this);
    this.createContent = this.createContent.bind(this);
    this.updateContent = this.updateContent.bind(this);
    }


    getPresents = () => {
        axios.get("api/presents")
        .then(response => {
   
            this.setState({
                present_tab: response.data.presents
            });
        })
        .catch(error => {
            return error;
        });

    }

    componentDidMount() {
        this.getPresents();
    }

    componentDidUpdate() {
        this.state.present_tab;
        this.state.file;
        this.state.edited_tab_data;
    }

    delImageById = (image_id) => {

        axios.delete(`/api/del/${image_id}`)
        .then(data => {
            return data;
        });
    }

    updatePresentTab = (present_id, image_id, content_id) => {
        const presentTabData = {
            present_id,
            image_ref_id: image_id,
            content_ref_id: content_id
        }

        axios.put(`/api/present/${present_id}`, presentTabData);
    }

    updateContent = (content_id, content_title, content_details) => {
        const contentData = {
            content_id,
            content_title, 
            content_details,
        }

        axios.put(`/api/content/${content_id}`, contentData);
    }

    replaceImage = (currentPresentData) => {
        const present_id = currentPresentData.present_id;
        const temp_image_id = 97;
        const current_image_id = currentPresentData.image_ref_id;
        const content_ref_id = currentPresentData.content_ref_id;
        this.setState({edited_tab_data: currentPresentData});
        this.updatePresentTab(present_id, temp_image_id, content_ref_id);
        this.delImageById(current_image_id);
    }

    createContent = (currentPresentData) => {
        const content_title = currentPresentData.content_title;
        const content_details = currentPresentData.content_details; 

        const contentData = {
            content_title,
            content_details
        }

        axios.post('/api/content', contentData);
    };

    submit = async event => {
        event.preventDefault();



        if (this.state.edited_tab_data.image_ref_id === 97) {

            const imageData = new FormData();

            imageData.append('image', this.state.image_src);
            imageData.append('image_name', this.state.image_name);

            await axios.post('/api/image', imageData)
            .then(response => {
                this.updateContent(this.state.edited_tab_data.content_ref_id, this.state.content_title, this.state.content_details);
                this.updatePresentTab(this.state.edited_tab_data.present_id, response.data.image_id, this.state.edited_tab_data.content_ref_id);
            })
            .catch(error => {
                return error;
            });
        } else {

            this.updateContent(this.state.edited_tab_data.content_ref_id, this.state.content_title, this.state.content_details);
            this.updatePresentTab(this.state.edited_tab_data.present_id, this.state.edited_tab_data.image_ref_id, this.state.edited_tab_data.content_ref_id);
        }
    }

    render() {

        return (
            this.state.present_tab.map(tab_param_name => (

                <div className="tab_container"> 
                        {/* if not logged in do this */}
                        {1 === 0 ? 
                            <div className="tap-wrapper">
                                {
                                        <div key={tab_param_name[tab_id]} accessKey={tab_param_name[tab_id]}>
                                            <figure key={tab_param_name.image_id} accessKey={tab_param_name.image_id}>
                                                <img className="tab_img" src={tab_param_name.image_src}></img>
                                                <figcaption>{tab_param_name.image_name}</figcaption>
                                            </figure>     
                                            <div key={tab_param_name.content_id} accessKey={tab_param_name.content_id}>
                                            <h1>{tab_param_name.content_title}</h1>
                                                <p>{tab_param_name.content_details}</p>
                                            </div>
                                        </div>
                                }  
                            </div>
                        : 
                        // show edit mode when logged in
                            <div className="tab_wrapper">
                                <div className="content-wrapper">
                                    <form onSubmit={ (e) => {
                                        e.preventDefault();
                                        // console.log(tab_param_name.content_title);
                                            this.setState({ edited_tab_data: tab_param_name });
                                            {
                                                Object.keys(this.state.content_title).length === 0 ?
                                                    this.setState({ content_title: tab_param_name.content_title})
                                                :
                                                null
                                            }
                                            {
                                                Object.keys(this.state.content_details).length === 0 ?
                                                    this.setState({ content_details: tab_param_name.content_details})
                                                :
                                                null
                                            }
                                            this.submit(e);
                                        }
                                        
                                        }>
                                        {/* if no image Do this */}

                                        {1 === 0 || tab_param_name.image_ref_id === 97 ? 
                                            <div>
                                                <input
                                                    filename={this.state.file}
                                                    onChange={e => this.setState({ image_src: e.target.files[0]})}
                                                    type="file"
                                                    accept="image/*"    
                                                    placeholder="image src"
                                                ></input>
                                                <figure key={tab_param_name.image_ref_id} accessKey={tab_param_name.image_ref_id}>
                                                    <img className="tab_img" src={tab_param_name.image_src}></img>
                                                </figure>   
                                                <input
                                                    onChange={e => this.setState({ image_name: e.target.value })}
                                                    type="text"
                                                    placeholder={tab_param_name.image_name}
                                                ></input>     
                                            </div>  
                                            // if there is image add delete image option
                                            :
                                                    <div className="img_wrapper" key={tab_param_name.present_id} accessKey={tab_param_name.present_id}>
                                                        <button type="button" onClick={() => this.replaceImage(tab_param_name)}>Remove Image</button>
                                                        <figure key={tab_param_name.image_id} accessKey={tab_param_name.image_id}>
                                                            <img className="tab_img" src={tab_param_name.image_src}></img>
                                                            <figcaption>{tab_param_name.image_name}</figcaption>
                                                        </figure>
                                                    </div>    
                                        }
                                        {
                                        // show edit mode for the tabs text
                                                <div key={tab_param_name.content_id} accessKey={tab_param_name.content_id}>
                                                    <label>
                                                    Content Title:
                                                    <input
                                                        onChange={e => this.setState({ content_title: e.target.value })}
                                                        type="text"
                                                        defaultValue={tab_param_name.content_title}
                                                        size={100}
                                                    ></input> 
                                                    </label>     
                                                    <label> 
                                                        Edit content:     
                                                        <textarea
                                                            onChange={e => this.setState({ content_details: e.target.value })}
                                                            type="text"
                                                            defaultValue={tab_param_name.content_details}
                                                            rows={5} 
                                                            cols={100}
                                                        />
                                                    </label> 
                                                    <button type="submit">Update</button>
                                                </div>
                                        }

                                    </form>
                                </div>
                            </div> 
                        }
                </div>
                ))

            );
    }



}
