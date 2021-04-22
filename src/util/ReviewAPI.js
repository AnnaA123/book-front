const apiUrl = 'http://localhost:8000/review';


// example:  http://localhost:3000/review/5GbdTc9OJ78C
const getAllBookReviews = (bookId) => {
    return fetch(apiUrl + '?book=' + bookId).then(response => {
        console.log('ReviewAPI working ' + response);
        return response.json();;
    })
}

const getSingleReview = (reviewId) => {
    return fetch(apiUrl + '/' + reviewId).then(response => {
        return response.json();
    })
}

export { getAllBookReviews, getSingleReview };