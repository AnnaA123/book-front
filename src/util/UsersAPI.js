import {fetchGraphql} from './fetchGQL.js';

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


export { getSingleUser, register, editUser, deleteUser };