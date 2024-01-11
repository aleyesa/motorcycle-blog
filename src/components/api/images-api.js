import axios from "axios";

export function createImage(current_state_data, authentication) {

    const headers = {
        headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authentication.jwt}` 
            }
        
    };

    const imageData = new FormData(); 

    imageData.append('image_file', current_state_data.new_image_src);
    imageData.append('image_name', current_state_data.new_image_name);

    return axios.post('/api/image', imageData, headers);   

}

export function delImageById(image_id, image_src, authentication) {

    const headers = {
            
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.jwt}` 
        
    };

    axios.delete(`/api/image/delete/${image_id}`, 
    {
        headers,
        data: {
            image_id,
            image_src
        }
    })
    .then(data => {

        return data;
        
    });
}