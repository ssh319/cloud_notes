import axios from 'axios';


class API {
    /*
        API class for a single instance-client, 
        providing more abstract API calls for application.
    */

    constructor() {
        // protocol://api.serverDomainName
        this.baseURL = "http://localhost:8000";
    }

    async getNotes(token) {
        let response = await axios.get(`${this.baseURL}/notes`, { headers: { Authorization: "Token " + token } });
        let data = await response.data;
        return data;
    }

    async getNoteForEdit(id, token) {
        let response = await axios.get(`${this.baseURL}/notes/${id}`, { headers: { Authorization: "Token " + token } })
        let data = await response.data;
        return data;
    }

    async createNote(data, token) {
        await axios.post(`${this.baseURL}/notes`, data, { headers: { Authorization: "Token " + token } });
    }

    async saveChangedNote(data, id, token) {
        await axios.put(`${this.baseURL}/notes/${id}`, data, { headers: { Authorization: "Token " + token } });
    }

    async deleteNote(id, token) {
        await axios.delete(`${this.baseURL}/notes/${id}`, { headers: { Authorization: "Token " + token } });
    }

    async registerUser(data) {
        await axios.post(`${this.baseURL}/auth/signup`, data);
    }

    async authenticateUser(data) {
        let response = await axios.post(`${this.baseURL}/auth/login`, data);
        const token = await response.data.token;
        const username = await response.data.username;
        return [token, username];
    }
}


export const apiClient = new API();
