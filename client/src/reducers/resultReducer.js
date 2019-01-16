import {
  ADD_RESULT,
  ADD_EXAM_RESULT,
  GET_EXAMS_RESULTS,
  GET_EXAM_RESULT,
  RESULT_LOADING
  // GET_ERRORS,
  // DELETE_RESULT,
  //CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  results: [],
  result: {},
  examsresults: [],
  examresult: {},
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
        examsresults: [action.payload, ...state.examsresults]
      };
    case GET_EXAMS_RESULTS:
      return {
        ...state,
        examsresults: action.payload,
        loading: false
      };
    case GET_EXAM_RESULT:
      return {
        ...state,
        examresult: action.payload,
        loading: false
      };
    //   case DELETE_EXAM:
    //     return {
    //       ...state,
    //       exams: state.exams.filter(exam => exam._id !== action.payload)
    //     };
    default:
      return state;
  }
}
