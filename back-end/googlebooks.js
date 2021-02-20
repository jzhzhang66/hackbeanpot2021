var axios = require('axios')
const key = 'AIzaSyBJjCaB2t7ItBY0P2NcjMu9fvd8KysKIOc'
const url = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey'

async function getBooksByTitle() {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBJjCaB2t7ItBY0P2NcjMu9fvd8KysKIOc')
        .then(response => console.log(response.data))
    return response.data
}
module.exports = {
    getBooksByTitle
}