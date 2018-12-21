import {
  ADD_RESULT,
  // GET_EXAMS,
  // GET_EXAM,
  ADD_EXAM_RESULT,
  GET_ERRORS,
  RESULT_LOADING
  // DELETE_RESULT,
  //CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  results: [],
  examresults: [],
  result: {},
  loading: false
};

export default function(state = initialState, action) {
  console.log("action payload in resultReducer:", action.payload);
  switch (action.type) {
    case RESULT_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_RESULT:
      return {
        ...state,
        results: [action.payload, ...state.results]
      };
    case ADD_EXAM_RESULT:
      return {
        ...state,
        examresults: [action.payload, ...state.examresults]
      };
    //   case GET_EXAMS:
    //     return {
    //       ...state,
    //       exams: action.payload,
    //       loading: false
    //     };
    //   case GET_EXAM:
    //     return {
    //       ...state,
    //       exam: action.payload,
    //       loading: false
    //     };
    //   case DELETE_EXAM:
    //     return {
    //       ...state,
    //       exams: state.exams.filter(exam => exam._id !== action.payload)
    //     };
    default:
      return state;
  }
}
