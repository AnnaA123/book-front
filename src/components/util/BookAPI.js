const apiUrl = 'https://www.googleapis.com/books';

const searchBooks = (terms) => {
    return fetch(apiUrl + '/v1/volumes?q=search+' + terms).then(response => {
        return response.json();
    })
}

export { searchBooks };