var axios = require('axios')
const key = 'AIzaSyBJjCaB2t7ItBY0P2NcjMu9fvd8KysKIOc'
const url = 'https://www.googleapis.com/books/v1/volumes?'


async function getBooksByTitle(title) {
    const response = await axios.get(`${url}q=${title}&key=${key}`)
        .then(response => console.log(response.data))
    return response
}

module.exports = {
    getBooksByTitle
}