import axios from "axios";

export function getTones(text) {
    console.log(text)
    return axios.get('http://localhost:8080/tones', {params: {text}, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }})
        .then(response => console.log(response.data))
}
