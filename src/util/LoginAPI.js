import {fetchGraphql} from './fetchGQL.js';

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

export { login };