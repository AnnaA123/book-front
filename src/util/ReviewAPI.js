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
/*
const getAllBookReviews = (bookId) => {
    return fetch(apiUrl + '?book=' + bookId).then(response => {
        return response.json();;
    })
}
*/
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
/*
const getAllUserReviews = (userId) => {
    return fetch(apiUrl + '?user=' + userId).then(response => {
        return response.json();;
    })
}
*/
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
/*
const getSingleReview = (reviewId) => {
    return fetch(apiUrl + '/' + reviewId).then(response => {
        return response.json();
    })
}
*/
const addNewReview = async (review) => {
    const queryD = {
        query:`
            mutation {
                addReview(
                BookID: ${review.BookID}, 
                BookTitle: ${review.BookTitle}, 
                UserID: ${review.UserID},
                Title: ${review.Title},
                Content: ${review.Content}
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
/*
const addNewReview = (data, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'bearer ' + token,
        },
        body: JSON.stringify(data),
    };
    return fetch(apiUrl, options).then(response => {
        return response.json();
    })
}
*/

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
const deleteReview = (id, token) => {
    console.log('YES ' + id + token);
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

export { 
    getAllBookReviews, 
    getAllUserReviews, 
    getSingleReview, 
    addNewReview, 
    editReview, 
    deleteReview 
};