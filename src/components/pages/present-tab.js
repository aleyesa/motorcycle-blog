import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import ContentLayout from "./layout/content-layout";

export default class PresentTab extends Component {
    constructor() {
        super();

        const [images, setImages] = useState([]);

        useEffect(() => {
            (async() => {
                const result = await axios.get('/images');
                setImages(result.data.images);

            })();
        }, []);
    }

    render() {

        return (
            <div>
                <ContentLayout />
                {images.map(image => (
                    <figure key={image.image_id}>
                        <img src={image.image_src}></img>
                    </figure>
                ))}
            </div>
        );
    }
}