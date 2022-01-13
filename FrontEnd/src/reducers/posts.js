import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, UPDATE, DELETE, CREATE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING: 
            return { ...state, isLoading: true};
        case END_LOADING: 
            return { ...state, isLoading: false};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_BY_CREATOR:
            return { ...state, posts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case COMMENT:
            return { ...state, 
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) return action.payload;
                    return post;
                })
            };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
            // remember the map method always return an array which can be updated
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}

export default postsReducer;