import axios from "axios";

export function createContent(authentication) {

    const contentData = {
        content_title: "Input Section Title Here",
        content_details: "Input Section Details Here"
    }

    const headers = {
        headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authentication.jwt}` 
            }
        
    };

    return axios.post('/api/content', contentData, headers);
};

export function updateContent(tab_section_data, current_state_data, authentication) {

    const contentData = {
        content_id: tab_section_data.content_id, 
        content_title: current_state_data.new_content_title === ""? tab_section_data.content_title : current_state_data.new_content_title, 
        content_details: current_state_data.new_content_details === "" ? tab_section_data.content_details : current_state_data.new_content_details
    }
    
    const headers = {
        headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authentication.jwt}` 
            }
        
    };

        axios.put(`/api/content/${tab_section_data.content_id}`, 
            contentData, headers
        );

}

export function delContentById(content_id, authentication) {

    const headers = {
        headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authentication.jwt}` 
            }
        
    };

    axios.delete(`/api/content/${content_id}`, headers)
    .then(data => {

        return data;
        
    });
    
}
