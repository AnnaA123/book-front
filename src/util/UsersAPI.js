const apiUrl = 'http://localhost:8000/user';

const getSingleUser = (id) => {
    return fetch(apiUrl + '/' + id).then(response => {
        return response.json();
    }).catch(error => console.error('Error:', error));;
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

const deleteUser = (id, token) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'bearer ' + token,
        },
    };
    return fetch(apiUrl + '/' + id, options).then(response => {
        return response.json();
    })
} 

export { getSingleUser, register, deleteUser };