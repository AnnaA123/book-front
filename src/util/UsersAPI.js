const apiUrl = 'http://localhost:8000/user';

const getSingleUser = (id) => {
    return fetch(apiUrl + '/' + id).then(response => {
        return response.json();
    });
}

//add a new user at SignUpForm.js
const register = (user) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };
    return fetch(apiUrl, settings).then(response => {
        return response.json();
    })
}

export { getSingleUser, register };