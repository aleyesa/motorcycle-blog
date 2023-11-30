import React, { useEffect, useState } from "react";
import axios from "axios";
import XSR700_img_1 from "../../../public/images/XSR700_img_1.jpg";

import ContentLayout from "./layout/content-layout";

const PresentTab = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        (async() => {
            const result = await axios.get('/images');
            setImages(result.data.images);

        })();
    }, []);

        return (
            <div className="present_tab_wrapper">
                <ContentLayout />
                {images.map(image => (
                    <figure key={image.image_id}>
                        <img className="present_tab_img" src={image.image_src}></img>
                    </figure>
                ))}
            </div>
        );
};

export default PresentTab;