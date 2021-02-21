import axios from "axios";

export function getTones(text) {
    console.log(text)
    return axios.get('http://localhost:8080/tones', {params: {text}, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }})
        .then(response => response.data)
}

export function getSongs(tone, artists) {
    console.log(tone, artists)
    return axios.get('http://localhost:8080/songs', {params: {tone, artists}, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }})
        .then(response => response.data)
}
