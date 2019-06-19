const initialState = {
    loading: false,
    data: [],
    err: null
};

export default function ArticlesReducer(state = initialState, action){
    switch(action.type){
        case "ARTICLES_FETCH_REQUESTED":
            return {...state, loading: true};
        case "ARTICLES_FETCH_SUCCEEDED":
            return {...state, loading: false, data: action.payload};
        case "ARTICLES_FETCH_FAILED":
            return {...state, loading: false, err: action.payload};
        default:
            return state;
    }
}