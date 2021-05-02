import {fetchGraphql} from './fetchGQL.js';
const apiUrl = 'https://booksight.jelastic.metropolia.fi/review';

const getAllBookReviews = async (BookID) => {
    const queryA = {
        query:`
             {
                reviewsByBook(BookID: "${BookID}"){
                id, 
                Title, 
                Content,
                BookTitle,
                BookID,
                UserID {
                    id,
                    username
                  }
                }
            }`
    }
    const data = await fetchGraphql(queryA);
    return data.reviewsByBook;
}

const getAllUserReviews = async (UserID) => {
    const queryB = {
        query:`
             {
                reviewsByUser(UserID: "${UserID}"){
                id, 
                Title, 
                Content,
                BookTitle,
                BookID,
                UserID {
                    id,
                    username
                  }
                }
            }`
    }
    const data = await fetchGraphql(queryB);
    return data.reviewsByUser;
}

const getSingleReview = async (id) => {
    const queryC = {
        query:`
             {
                review(id: "${id}"){
                id, 
                Title, 
                Content,
                BookTitle,
                BookID,
                UserID {
                    id
                    username
                  }
                }
            }`
    }
    const data = await fetchGraphql(queryC);
    return data.review;
}

const addNewReview = async (review) => {
    const queryD = {
        query:`
            mutation {
                addReview(
                BookID: "${review.BookID}", 
                BookTitle: "${review.BookTitle}", 
                UserID: "${review.UserID}",
                Title: "${review.Title}",
                Content: "${review.Content}"
                ) {
                id, 
                Title, 
                Content
                }
            }`
    }
    const data = await fetchGraphql(queryD);
    return data.addReview;
}

const editReview = async (review, id) => {
    const queryE = {
        query:`
            mutation {
                modifyReview(
                id: "${id}",
                Title: "${review.Title}",
                Content: "${review.Content}"
                ) {
                id, 
                Title, 
                Content
                }
            }`
    }
    const data = await fetchGraphql(queryE);
    return data.modifyReview;
}
/*
const editReview = (data, id, token) => {
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

const deleteReview = async (id) => {
    const queryF = {
        query:`
            mutation {
                deleteReview(id: "${id}"){
                    id
                }
            }`
    }
    const data = await fetchGraphql(queryF);
    return data.deleteReview;
}

export { 
    getAllBookReviews, 
    getAllUserReviews, 
    getSingleReview, 
    addNewReview, 
    editReview, 
    deleteReview 
};