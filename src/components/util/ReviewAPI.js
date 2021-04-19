const apiUrl = 'http://localhost:8000/review';

const getAllReviews = () => {
    return fetch(apiUrl).then(response => {
        console.log('ReviewAPI working');
        return response.json();;
    })
}

const getSingleReview = (reviewId) => {
    return fetch(apiUrl + reviewId).then(response => {
        return response.json();
    })
}

export { getAllReviews, getSingleReview };