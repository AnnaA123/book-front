const apiUrl = 'https://booksight.jelastic.metropolia.fi/login';

const login = (username, password) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
    }
    return fetch(apiUrl, settings).then(response => {
        return response.json();;
    })
}

export { login };