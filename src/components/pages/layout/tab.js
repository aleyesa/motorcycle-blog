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
            image_selected: 0,

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

    setSelectedImage = (imageData) => {

        console.log(imageData);

    }

    delATabSection = (tab_section_data) => {
        
            if (this.state.authentication.jwt !== "") {
            delTab(this.state.tab_path, tab_section_data[this.state.tab_name_id], this.state.authentication)
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

            updateATabSection(this.state.tab_path, this.state.tab_name_id, tab_section_data, temp_image_id, this.state.authentication);

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

                        updateATabSection(this.state.tab_path, this.state.tab_name_id, tab_section_data, response.data.image_id, this.state.authentication); 
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

            <div className="tab-data-section">

                {(this.state.authentication.logged_in == 1 &&
                  this.state.authentication.editor_id !== null &&
                  this.state.authentication.jwt != null)  && 
                    <button className="edit-mode-btn" type="button" onClick={ e => 
                    {
                        if (this.state.edit_mode == false) {
                            this.setState({edit_mode: true});
                        } else {
                            this.setState({edit_mode: false});
                        }
                    }
                }>Edit Mode: {this.state.edit_mode === true ? "ON" : "OFF"}</button>
                }

                {this.state.edit_mode == true && <button className="new-section-btn" type="button" onClick={this.createATabSection}>Add New Section</button>}            
                
                {this.state.tab.length !== 0 && 

                    this.state.edit_mode !== true &&  
                    <div className="image-carousel"> 
                        <div >
                            <figure className="selected-img" key={this.state.tab[this.state.image_selected]["image_id"]} accessKey={this.state.tab[this.state.image_selected]["image_id"]}>
                                <img src={this.state.tab[this.state.image_selected]["image_src"]}></img>
                                <figcaption>{this.state.tab[this.state.image_selected]["image_name"]}</figcaption>
                            </figure>
                            <div>
                                {this.state.tab.map( (tab_param_name, index) => (
                                <div key={tab_param_name[this.state.tab_name_id]} accessKey={tab_param_name[this.state.tab_name_id]}>
                                        <figure key={"small-image" + tab_param_name.image_id} accessKey={"small-image" + tab_param_name.image_id}>
                                            <img className="small-tab-img" src={tab_param_name.image_src}
                                                onClick={e => {
                                                    this.setState({image_selected: index});
                                                }}
                                            ></img>
                                        </figure> 
                                </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2>{this.state.tab[this.state.image_selected]["content_title"]}</h2>
                            <p>{this.state.tab[this.state.image_selected]["content_details"]}</p>
                        </div>
                    </div>    
                }

                { (this.state.edit_mode == true) && (this.state.authentication.logged_in == 1) &&
                <div className="edit-tab-section">

                    {this.state.tab.map( (tab_param_name, index) => (

                    // show edit mode when logged in
                    <div className="tab-section-container" key={`tab-section-container_${index}`} accessKey={`tab-section-container_${index}`}> 
   
                            {tab_param_name.image_ref_id !== 1 && 
                            <button className="delete-section-btn" onMouseEnter={
                                e => {
                                    e.currentTarget.parentElement.style.borderColor = "red";
                                }
                            } onMouseLeave={
                                e => {
                                    e.currentTarget.parentElement.style.borderColor = "black";

                                }
                            } type="button" onClick={e => this.delATabSection(tab_param_name)}>Delete Section</button>}     
                            <form onSubmit={ (e) => {
                                e.preventDefault();

                                    this.submit(e, tab_param_name);

                                }
                            }>
                            {/* if tab section has a default image Do this */}
                            {tab_param_name.image_ref_id === 1 ? 
                            <div className="new-image">
                                <input
                                    onChange={e => this.setState({ new_image_src: e.target.files[0]})}
                                    type="file"
                                    accept="image/*"    
                                ></input>
                                <figure key={tab_param_name.image_ref_id} accessKey={tab_param_name.image_ref_id}>
                                    <img className="edit-tab-img" src={tab_param_name.image_src}></img>
                                </figure> 
                                <div>
                                <label>Image Name: </label>
                                <input className="new-image-name"
                                    onChange={e => this.setState({ new_image_name: e.target.value })}
                                    type="text"
                                    placeholder={tab_param_name.image_name}
                                ></input>    
                                </div> 
                            </div>  
                            // if there is image add delete image option
                            :
                            <div className="img-wrapper" key={tab_param_name[this.state.tab_name_id]} accessKey={tab_param_name[this.state.tab_name_id]}>
                                <button type="button" 
                                    onMouseEnter={
                                        e => {
                                
                                            e.currentTarget.nextElementSibling.style.border = "2px solid red";

                                        }
                                    } onMouseLeave={
                                        e => {

                                            e.currentTarget.nextElementSibling.style.border = "none";
                                            
                                        }
                                    }
                                onClick={() => this.replaceImage(tab_param_name)}>
                                    Replace Image
                                </button>
                                <figure key={tab_param_name.image_id} accessKey={tab_param_name.image_id}>
                                    <img className="edit-tab-img" src={tab_param_name.image_src}></img>
                                    <figcaption>Image Name: {tab_param_name.image_name}</figcaption>
                                </figure>
                            </div>    
                            }
                            {
                            // show edit mode for the tabs text
                            <div className="content-section" key={tab_param_name.content_id} accessKey={tab_param_name.content_id}>
                                <label>
                                Edit Content Title: 
                                <input
                                    onChange={e => this.setState({ new_content_title: e.target.value })}
                                    type="text"
                                    defaultValue={tab_param_name.content_title}
                                    size={25}
                                ></input> 
                                </label>     
                                <label> 
                                Edit Main Content:</label> 
                                <textarea
                                        onChange={e => this.setState({ new_content_details: e.target.value })}
                                        type="text"
                                        defaultValue={tab_param_name.content_details}
                                        rows={5} 
                                        cols={30}
                                    />
                                <button type="submit"
                                    onMouseEnter={
                                        e => {
                                            e.currentTarget.parentElement.parentElement.style.border = "2px solid yellow";

                                        }
                                    } onMouseLeave={
                                        e => {
                                            
                                            e.currentTarget.parentElement.parentElement.style.border = "none";    
                                        }
                                    }
                                >
                                    Update
                                </button>
                            </div>
                            }

                            </form>
                    </div> 
                    ))}
                </div>
                }
            </div>
            );
    }
}




