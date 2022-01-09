import { FETCH_ALL, UPDATE, DELETE, CREATE } from '../constants/actionTypes';

const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            // remember the map method always return an array which can be updated
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}

export default postsReducer;