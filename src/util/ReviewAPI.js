const apiUrl = 'http://localhost:8000/review';

const getAllBookReviews = (bookId) => {
    return fetch(apiUrl + '?book=' + bookId).then(response => {
        return response.json();;
    })
}

const getAllUserReviews = (userId) => {
    return fetch(apiUrl + '?user=' + userId).then(response => {
        return response.json();;
    })
}

const getSingleReview = (reviewId) => {
    return fetch(apiUrl + '/' + reviewId).then(response => {
        return response.json();
    })
}

const addNewReview = (data, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + token,
        },
        body: JSON.stringify(data),
    };
    console.log('REVIEWAPIIIIIIIII: ' + options.headers.authorization);
    return fetch(apiUrl, options).then(response => {
        return response.json();
    })
}

export { getAllBookReviews, getAllUserReviews, getSingleReview, addNewReview };