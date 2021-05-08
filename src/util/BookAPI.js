const apiUrl = 'https://www.googleapis.com/books';

const searchBooksByTitle = (terms) => {
    return fetch(apiUrl + '/v1/volumes?q=search+' + terms).then(response => {
        return response.json();
    })
}

const searchBooksByAuthor = (terms) => {
    return fetch(apiUrl + '/v1/volumes?q=inauthor+' + terms).then(response => {
        return response.json();
    })
}

const searchBooksBySubject = (terms) => {
    return fetch(apiUrl + '/v1/volumes?q=subject:' + terms).then(response => {
        return response.json();
    })
}

const getBook = (id) => {
    return fetch(apiUrl + '/v1/volumes/' + id).then(response => {
        return response.json();
    })
}

export { searchBooksByTitle, searchBooksByAuthor, searchBooksBySubject, getBook };