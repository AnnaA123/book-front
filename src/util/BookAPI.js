const apiUrl = 'https://www.googleapis.com/books';

const searchBooksByTitle = (terms) => {
    return fetch(apiUrl + '/v1/volumes?q=search+' + terms).then(response => {
        return response.json();
    })
}

const searchBooksByAuthor = (terms) => {
    console.log('API terms: ' + terms)
    return fetch(apiUrl + '/v1/volumes?q=inauthor+' + terms).then(response => {
        return response.json();
    })
}

const getBook = (id) => {
    return fetch(apiUrl + '/v1/volumes/' + id).then(response => {
        return response.json();
    })
}

export { searchBooksByTitle, searchBooksByAuthor, getBook };