var axios = require('axios')
const key = 'AIzaSyBJjCaB2t7ItBY0P2NcjMu9fvd8KysKIOc'
const url = 'https://www.googleapis.com/books/v1/volumes?'


async function getBooksByTitle(title) {
    const bookResults = await axios.get(`${url}q=${title}&key=${key}`)
        .then(response => response.data.items)
    const listOfBooks = []
    for (var i = 0; i < bookResults.length; i++) {
        const curr = bookResults[i]
        const book = {
            id: curr.id,
            title: curr.volumeInfo.title,
            authors: curr.volumeInfo.authors,
            description: curr.volumeInfo.description
        }
        listOfBooks.push(book)
    }
    return listOfBooks
}

module.exports = {
    getBooksByTitle
}