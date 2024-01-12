import React, { Component } from "react";

import {
    getTab,
    createTab,
    updateATabSection,
    delTab
} from "../../api/tab-api";

import {
    createImage,
    delImageById
} from "../../api/images-api";

import { 
    createContent,
    updateContent,
    delContentById 
} from "../../api/contents-api";

export default class Tab extends Component {

    constructor(props) {

        super(props);

        this.state = {
            tab: [],
            tab_name: props.tab_name,
            tab_path: props.tab_path,
            tab_name_id: props.tab_name_id,

            new_image_name: "",
            new_image_src: "", 

            new_content_title: "",
            new_content_details: "",

            edit_mode: false,

            authentication: {
                editor_id: "" || sessionStorage.getItem("editor_id"),
                logged_in: (sessionStorage.getItem("logged_in") == null && sessionStorage.setItem("logged_in", "0")) || sessionStorage.getItem("logged_in"),
                jwt: "" || sessionStorage.getItem("jwt")
            }

        }
        
    this.setTabData = this.setTabData.bind(this);
    this.submit = this.submit.bind(this);
    this.replaceImage = this.replaceImage.bind(this);
    this.createATabSection = this.createATabSection.bind(this);
    this.delATabSection = this.delATabSection.bind(this);

    }

    componentDidMount() {

        this.setTabData();

    }

    componentDidUpdate() {

        this.state.tab;
        sessionStorage.length;

    }

    setTabData = () => {

        getTab(this.state.tab_name)
        .then(response => {
           
            this.setState({
                tab: response.data[this.state.tab_name]
            });

        })
        .catch(error => {

            return error;

        });
    }

    delATabSection = (tab_section_data) => {
        
            if (this.state.authentication.jwt !== "") {
            delTab(this.state.tab_path, tab_section_data.present_id, this.state.authentication)
            .then(response => {

                delImageById(tab_section_data.image_ref_id, tab_section_data.image_src, this.state.authentication);
                delContentById(tab_section_data.content_ref_id, this.state.authentication);
                this.setTabData();

            })        
            .catch(error => {

                return error;
                
            });  
        } else {
            console.log("Not Authorized");
        }
    }

    replaceImage = (tab_section_data) => {

        const temp_image_id = 1;
        const current_image_id = tab_section_data.image_ref_id;
        const current_image_src = tab_section_data.image_src;

        if (this.state.authentication.jwt !== "") {

            updateATabSection(this.state.tab_path, tab_section_data, temp_image_id, this.state.authentication);

            delImageById(current_image_id, current_image_src, this.state.authentication);
            this.setTabData();

        } else {
            console.log("Not Authorized");
        }
 
    }

    createATabSection = () => {

        if (this.state.authentication.jwt !== "") {

            createContent(this.state.authentication)
            .then(response => {

                createTab(this.state.tab_path, response.data.content_id, this.state.authentication);
                const data = response.data;
                this.setTabData();
            })
            .catch(error => {

                return error;

            });  
        } else {
            console.log("Not Authorized");
        }

    }

    submit = async (event, tab_section_data) => {

        event.preventDefault();

        if (this.state.authentication.jwt !== "") {

            if (tab_section_data.image_ref_id === 1) {
                
                if (this.state.new_image_src !== "" && this.state.new_image_name !== "") { 

                    createImage(this.state, this.state.authentication)
                    .then(response => {

                        updateATabSection(this.state.tab_path, tab_section_data, response.data.image_id, this.state.authentication); 
                        this.setTabData();   
                    
                    })
                    .catch(error => {

                        return error;

                    }); 
                } else {

                    // alert("Need to include new image and an image name");

                }
            }

            updateContent(tab_section_data, this.state, this.state.authentication);
            this.setTabData();
        } else {
            console.log("Not Authorized");
        }
        
    }

    render() { 

        return (

            <div>

                {(this.state.authentication.logged_in == 1 &&
                  this.state.authentication.editor_id !== null &&
                  this.state.authentication.jwt != null)  && 
                    <button type="button" onClick={ e => {
                        if (this.state.edit_mode == false) {
                            this.setState({edit_mode: true});
                        } else {
                            this.setState({edit_mode: false});
                        }
                    }
                }>Edit</button>
                }

                {this.state.edit_mode == true && <button type="button" onClick={this.createATabSection}>+</button>}
        
                {this.state.tab.map( (tab_param_name, index) => (

                    <div className="tab_section_container" key={`tab_section_container_${index}`} accessKey={`tab_section_container_${index}`}> 

                            {/* if not logged in do this */}
                            { (this.state.edit_mode == false) && (this.state.authentication.logged_in == 0) ||
                              (this.state.edit_mode == false) && (this.state.authentication.logged_in == 1)  ? 


                            <div className="tab_section">
                                {
                                    <div key={tab_param_name[this.state.tab_name_id]} accessKey={tab_param_name[this.state.tab_name_id]}>
                                        <h1>{tab_param_name.content_title}</h1>
                                        <figure key={tab_param_name.image_id} accessKey={tab_param_name.image_id}>
                                            <img className="tab_img" src={tab_param_name.image_src}></img>
                                            <figcaption>{tab_param_name.image_name}</figcaption>
                                        </figure>     
                                        <div key={tab_param_name.content_id} accessKey={tab_param_name.content_id}>
                                            <p>{tab_param_name.content_details}</p>
                                        </div>
                                    </div>
                                }  
                            </div>
                            : 
                            // show edit mode when logged in
                            <div className="edit_tab_section">
                                    {tab_param_name.image_ref_id !== 1 && <button type="button" onClick={e => this.delATabSection(tab_param_name)}>X</button>}     
                                    <form onSubmit={ (e) => {
                                        e.preventDefault();

                                            this.submit(e, tab_param_name);

                                        }
                                    }>
                                    {/* if tab section has a default image Do this */}
                                    {tab_param_name.image_ref_id === 1 ? 
                                    <div>
                                        <input
                                            onChange={e => this.setState({ new_image_src: e.target.files[0]})}
                                            type="file"
                                            accept="image/*"    
                                        ></input>
                                        <figure key={tab_param_name.image_ref_id} accessKey={tab_param_name.image_ref_id}>
                                            <img className="tab_img" src={tab_param_name.image_src}></img>
                                        </figure>   
                                        <input
                                            onChange={e => this.setState({ new_image_name: e.target.value })}
                                            type="text"
                                            placeholder={tab_param_name.image_name}
                                        ></input>     
                                    </div>  
                                    // if there is image add delete image option
                                    :
                                    <div className="img_wrapper" key={tab_param_name[this.state.tab_name_id]} accessKey={tab_param_name[this.state.tab_name_id]}>
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
                                            onChange={e => this.setState({ new_content_title: e.target.value })}
                                            type="text"
                                            defaultValue={tab_param_name.content_title}
                                            size={100}
                                        ></input> 
                                        </label>     
                                        <label> 
                                            Edit content:     
                                            <textarea
                                                onChange={e => this.setState({ new_content_details: e.target.value })}
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
                            }
                    </div>
                ))}
            </div>
            );

    }



}
