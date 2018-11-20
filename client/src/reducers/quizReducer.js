import {
  ADD_QUIZ,
  GET_QUIZS,
  GET_ERRORS,
  QUIZ_LOADING,
  DELETE_QUIZ
  //CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  quizzes: [],
  loading: false
};

export default function(state = initialState, action) {
  console.log("action payload in reducer:", action.payload);
  switch (action.type) {
    case QUIZ_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_QUIZ:
      return {
        ...state,
        quizzes: [action.payload, ...state.quizzes]
      };
    case GET_QUIZS:
      return {
        ...state,
        // quizz: action.payload,
        quizzes: action.payload,
        loading: false
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload)
      };
    default:
      return state;
  }
}
