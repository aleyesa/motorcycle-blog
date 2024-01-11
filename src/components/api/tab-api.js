import axios from "axios";

export function getTab(tab_name) {
   return axios.get(`api/${tab_name}`);
}

export function createTab(tab_path, content_id, authentication) {

    const headers = {
        headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authentication.jwt}` 
            }
        
    };

    return axios.post(`/api/${tab_path}`, 
    {
        image_ref_id: 1, //default image
        content_ref_id: content_id
    },
        headers
    );
}

export function updateATabSection(tab_path, tab_section_data, new_image_id, authentication) {
    const headers = {
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authentication.jwt}` 
        }
    }

    const presentTabData = {
        present_id: tab_section_data.present_id,
        image_ref_id: new_image_id,
        content_ref_id: tab_section_data.content_id
    }

    axios.put(`/api/${tab_path}/${presentTabData.present_id}`, presentTabData, headers);

}

export function delTab(tab_path, present_id, authentication) {

    const headers = {
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authentication.jwt}` 
        }
    }

   return axios.delete(`/api/${tab_path}/${present_id}`, headers);

}

