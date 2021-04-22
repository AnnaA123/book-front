const apiUrl = 'http://localhost:8000/login';

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