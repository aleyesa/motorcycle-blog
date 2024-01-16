import axios from "axios";

export function getEditor(editor_id, jwt) {
    const headers = {
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` 
        }
    }

    return axios.get(`/api/editor/${editor_id}`, headers);
}

export function createEditorAccount(username, password) {

    return axios.post('/api/editor/creation', 
    {
        
        username,
        password
    
    });


}

export function validateLogin(username, password) {

    return axios.post('/api/editor/login', 
    {
        
        username,
        password
    
    });
}

export function updateLoginStatus(authentication) {

    const headers = {
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authentication.jwt}` 
        }
    }

    const editorData = {
        editor_id: authentication.editor_id,
        logged_in: authentication.logged_in
    } 

    if (authentication.logged_in === 0) {
        editorData.logged_in = 1;
    } else {
        editorData.logged_in = 0;
    }

    axios.put(`/api/editor/${editorData.editor_id}`, editorData, headers)
    .then(response => {
        if(editorData.logged_in == 1) {
            sessionStorage.setItem("editor_id", editorData.editor_id);
            sessionStorage.setItem("logged_in", editorData.logged_in);
            sessionStorage.setItem("jwt", authentication.jwt);
        }

        
        
    })
    .catch(error => {
        console.log(error);
        return error;
    });

}

export function changePassword(editor_id, password, jwt) {
    const headers = {
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` 
        }
    }

    const editorData = {
        editor_id,
        password
    } 

    axios.put(`/api/editor/password/${editor_id}`, editorData, headers)
    .then(response => {

    })
    .catch(error => {
        console.log(error);
        return error;
    });

}

export function deleteEditorAccount(editor_id, jwt) {
    const headers = {
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` 
        }
    }

    axios.delete(`/api/editor/delete/${editor_id}`, headers)
    .then(response => {
        console.log(response);
        sessionStorage.clear();
    })
    .catch(error => {
        console.log(error);
        return error;
    });
}