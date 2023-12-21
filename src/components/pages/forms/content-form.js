// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import def_no_img from '../../../../static/assets/images/default-images/def_no_img.png';



// const ContentForm = (
//     [tab_name], tab_id) => {
    
//     // post image data
//     const [file, setImgSrc] = useState();
//     const [imageName, setImageName] = useState("");
//     //post content data
//     const [contentTitle, setContentTitle] = useState("");
//     const [contentDetails, setContentDetails] = useState("");   
//     //get imageById data
//     const [currImg, setImage] = useState({});
//     let current_image_data = {};

//     // EDIT mode:
//     //Toggle from edit to normal
//     //autofills data
//     // once submitted it updates the tab data table





//     const getImageById = (image_id) => {
//         if (image_id !== null) {
//             axios.get(`/api/image/id/${image_id}`)
//             .then(image => {
//                 current_image_data = image.data.image[0];
            
//             });
//         }
//     };   

//     useEffect(() => {
//         if (tab_name.length === 0) {
//             console.log("tab_name data not mounted");
//         } else {
//             console.log("tab_name mounted");
//             tab_name.map(tab_param_name => {
                
//                 if (tab_param_name.image_ref_id === null) {
//                     console.log("switch to add image html");
//                 } else {
//                     setImage(getImageById(tab_param_name.image_ref_id));
//                     console.log(currImg);
//                 }
//             });

//         }

//     }, [tab_name, currImg, getImageById]);

//     const delImageById = (image_id) => {

//         axios.delete(`/api/del/${image_id}`)
//         .then(data => {
//             return data;
//         });
//     }
//     const getContentById = (content_id) => {
//         axios.get(`/api/content/${content_id}`)
//         .then(data => {
//             return data;
//         });
//     }

//     const submit = async event => {
//         event.preventDefault();

//         const imageData = new FormData();
//         imageData.append('image', file);
//         imageData.append('image_name', imageName);

//         await axios.post('/api/image', imageData);

//         // const contentData = {
//         //     content_title: contentTitle,
//         //     content_details: contentDetails
//         // }    

//         // await axios.post('/api/content', contentData);
//     }

//     return (
//     tab_name.map(tab_param_name => (

//         <div className="tab_container"> 
//                 {/* if not logged in do this */}
//                 {console.log(currImg)}
//                 {1 === 0 ? 
//                     <div className="tap-wrapper">
//                         {
//                                 <div key={tab_param_name[tab_id]} accessKey={tab_param_name[tab_id]}>
//                                     <figure key={tab_param_name.image_id} accessKey={tab_param_name.image_id}>
//                                         <img className="tab_img" src={tab_param_name.image_src}></img>
//                                         <figcaption>{tab_param_name.image_name}</figcaption>
//                                     </figure>     
//                                     <div key={tab_param_name.content_id} accessKey={tab_param_name.content_id}>
//                                     <h1>{tab_param_name.content_title}</h1>
//                                         <p>{tab_param_name.content_details}</p>
//                                     </div>
//                                 </div>
//                         }  
//                     </div>
//                 : 
//                 // show edit mode when logged in
//                     <div className="tab_wrapper">
//                         <div className="content-wrapper">
//                             <form onSubmit={submit}>
//                                 {/* if no image Do this */}

//                                 {1 === 0 || tab_param_name.image_ref_id === null ? 
//                                     <div>
//                                         <input
//                                             filename={file}
//                                             onChange={e => setImgSrc(e.target.files[0])}
//                                             type="file"
//                                             accept="image/*"    
//                                             placeholder="image src"
//                                         ></input>
//                                         <figure key="default_img" accessKey="default_img">
//                                             <img className="tab_img" src={def_no_img}></img>
//                                         </figure>   
//                                         <input
//                                             onChange={e => setImageName(e.target.value)}
//                                             type="text"
//                                             placeholder="Image Name Here"
//                                         ></input>     
//                                     </div>  
//                                     // if there is image add delete image option
//                                     :
//                                             <div className="img_wrapper" key={tab_param_name[tab_id]} accessKey={tab_param_name[tab_id]}>
//                                                 <button onClick={delImageById(tab_param_name.image_id)}>Remove Image</button>
//                                                 <figure key={tab_param_name.image_id} accessKey={tab_param_name.image_id}>
//                                                     <img className="tab_img" src={tab_param_name.image_src}></img>
//                                                     <figcaption>{tab_param_name.image_name}</figcaption>
//                                                 </figure>
//                                             </div>    
//                                 }
//                                 {
//                                 // show edit mode for the tabs text
//                                         <div key={tab_param_name.content_id} accessKey={tab_param_name.content_id}>
//                                             <label>
//                                             Content Title:
//                                             <input
//                                                 onChange={e => setContentTitle(e.target.value)}
//                                                 type="text"
//                                                 defaultValue={tab_param_name.content_title}
//                                             ></input> 
//                                             </label>     
//                                             <label> 
//                                                 Edit content:     
//                                                 <textarea
//                                                     onChange={e => setContentDetails(e.target.value)}
//                                                     type="text"
//                                                     defaultValue={tab_param_name.content_details}
//                                                     rows={5} 
//                                                     cols={100}
//                                                 />
//                                             </label> 
//                                             <button type="submit">Update</button>
//                                         </div>
//                                 }

//                             </form>
//                         </div>
//                     </div> 
//                 }
//         </div>
//         ))

//     );
// };

// export default ContentForm;

import React, { Component } from "react";
import axios from "axios";

export default class ContentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      tab_data: [],
    };

    this.contentForm = this.contentForm.bind(this);
    // this.getImageById = this.getImageById.bind(this);
  }

  // getImageById = (image_id) => {
  //   if (image_id !== null) {
  //       axios.get(`/api/image/id/${image_id}`)
  //       .then(image => {
  //           this.setState.currentImage = image.data.image[0];
  //       });
  //   }
  // };  

  // getContentById = (content_id) => {
  //     axios.get(`/api/content/${content_id}`)
  //     .then(data => {
  //         console.log(data.data.contents[0]);
  //     });
  // }

  contentForm = ([tab_name], tab_id) => {
    // console.log(tab_name);
    // this.setState({
    //   tab_data: tab_name
    // });
    // this.setState({
    //   tab_data: tab_name
    // });
    this.state.tab_data = tab_name;
  };

  componentDidMount() {
    // this.getImageById(95);
    // console.log(this.state.currentImage);
    console.log(this.state.tab_data);
    console.log('component did mount');
  }

  componentDidUpdate() {
    //    this.getImageById(95);
    // console.log(this.state.currentImage);
    console.log('component did update');
  }

  render() {
    // if (this.state.isLoading) {
    //   return <div>Loading...</div>;
    // }

    return (
      <div>
        {console.log(this.state.tab_data)}
      </div>
    );
  }
}
