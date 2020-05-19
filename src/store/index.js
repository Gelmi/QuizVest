import { createStore } from 'redux';

const INITIAL_STATE = {
    questions: [],
    progressArray: [],
    relDay: 0,
};

function infoReducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case 'ADD_QUESTIONS':
            return { ...state, questions: action.data};
        case 'ADD_PROGRESS_ARRAY': 
            return { ...state, progressArray: action.data };
        case 'SET_RELDAY': 
            return { ...state, relDay: action.data };
        default: 
            return state;
    }
}

const store = createStore(infoReducer);

export default store;