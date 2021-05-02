import {fetchGraphql} from './fetchGQL.js';
const apiUrl = 'https://booksight.jelastic.metropolia.fi/login';

const login = async (user) => {
    const queryA = {
        query:`
            {
                login(
                username: "${user.username}",
                password: "${user.password}"
                ) {
                id,
                username,
                token
                }
            }`
    }
    const data = await fetchGraphql(queryA);
    return data.login;
}
/*
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
*/
export { login };