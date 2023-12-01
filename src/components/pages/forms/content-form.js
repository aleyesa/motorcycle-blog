import React, { useState, useEffect} from 'react';
import axios from 'axios';

const ContentForm = () => {
    const [file, setImgSrc] = useState();
    const [imageName, setImageName] = useState("");
    const [images, setImages] = useState([]);

    const submit = async event => {
        event.preventDefault();

        const data = new FormData();
        data.append('image', file);
        data.append('image_name', imageName);

        const imageResults = await axios.post('/api/images', data);
        setImages([imageResults.data, ...images]);
    }

    return (
        <div className="content-form-wrapper">
            <form onSubmit={submit}>
                <input
                    filename={file}
                    onChange={e => setImgSrc(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    placeholder="content"
                ></input>
                <input
                onChange={e => setImageName(e.target.value)}
                type="text"
                ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ContentForm;