import axios from "axios";
const url = 'https://booktoons-backend.herokuapp.com'

export function getTones(text) {
    console.log(text)
    return axios.get(`${url}/tones`, {params: {text}, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }})
        .then(response => response.data)
}

export function getSongs(tone, artists) {
    console.log(tone, artists)
    return axios.get(`${url}/songs`, {params: {tone, artists}, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }})
        .then(response => response.data)
}
