import React, { useEffect, useState } from "react";
import axios from "axios";

import ContentLayout from "./layout/content-layout";

const PresentTab = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        (async() => {
            const result = await axios.get('/api/images');
            setImages(result.data.images);
        })();
    }, []);

    const delImageById = (image_id) => {
        axios.delete(`/api/del/${image_id}`)
        .then(data => {
            return data;
        });
    }

    return (
        <div className="present_tab_wrapper">
            <ContentLayout />
            {images.map(image => (
                <figure key={image.image_id} accessKey={image.image_id}>
                    <button onClick={() => { 
                            return delImageById(image.image_id);
                        }
                    }>Delete</button>
                    <img className="present_tab_img" src={image.image_src}></img>
                    <figcaption>{image.image_name}</figcaption>
                </figure>
            ))}
        </div>
    );
};

export default PresentTab;