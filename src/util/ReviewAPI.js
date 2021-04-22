const apiUrl = 'http://localhost:8000/review';

const getAllBookReviews = (bookId) => {
    return fetch(apiUrl + '?book=' + bookId).then(response => {
        console.log('ReviewAPI working');
        return response.json();;
    })
}

const getSingleReview = (reviewId) => {
    return fetch(apiUrl + reviewId).then(response => {
        return response.json();
    })
}

export { getAllBookReviews, getSingleReview };