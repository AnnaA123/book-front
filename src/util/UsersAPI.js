import {fetchGraphql} from './fetchGQL.js';
const apiUrl = 'https://booksight.jelastic.metropolia.fi/user';

const getSingleUser = async (id) => {
    const queryA = {
        query:`
             {
                user(id: "${id}"){
                    id, 
                    username,
                    email,
                    description
                }
            }`
    }
    const data = await fetchGraphql(queryA);
    return data.user;
}

/*
const getSingleUser = (id) => {
    return fetch(apiUrl + '/' + id).then(response => {
        return response.json();
    }).catch(error => console.error('Error:', error));;
}
*/
//add a new user at SignUpForm.js
const register = async (user) => {
    const queryB = {
        query:`
            mutation {
                signup(
                username: "${user.username}", 
                password: "${user.password}", 
                email: "${user.email}",
                description: "${user.description}",
                ){
                id, 
                username
                }
            }`
    }
    const data = await fetchGraphql(queryB);
    return data.signup;
}
/*
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
*/
const editUser = async (user, id) => {
    const queryC = {
        query:`
            mutation {
                modifyUser(
                id: "${id}",
                username: "${user.username}",
                email: "${user.email}",
                description: "${user.description}",
                ) {
                id, 
                username,
                description
                }
            }`
    }
    const data = await fetchGraphql(queryC);
    return data.modifyUser;
}
/*
const editUser = (data, id, token) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'bearer ' + token,
        },
        body: JSON.stringify(data),
    };
    return fetch(apiUrl + '/' + id, options).then(response => {
        return response.json();
    })
}
*/
const deleteUser = async (id) => {
    const queryE = {
        query:`
            mutation {
                deleteUser(id: "${id}"){
                    id
                }
            }`
    }
    const data = await fetchGraphql(queryE);
    return data.deleteUser;
}
/*
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
*/

export { getSingleUser, register, editUser, deleteUser };