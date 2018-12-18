import {
  ADD_EXAM,
  GET_EXAMS,
  GET_EXAM,
  GET_ERRORS,
  EXAM_LOADING,
  DELETE_EXAM
  //CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  exams: [],
  exam: {},
  loading: false
};

export default function(state = initialState, action) {
  console.log("action payload in examReducer:", action.payload);
  switch (action.type) {
    case EXAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_EXAM:
      return {
        ...state,
        exams: [action.payload, ...state.exams]
      };
    case GET_EXAMS:
      return {
        ...state,
        exams: action.payload,
        loading: false
      };
    case GET_EXAM:
      return {
        ...state,
        exam: action.payload,
        loading: false
      };
    case DELETE_EXAM:
      return {
        ...state,
        exams: state.exams.filter(exam => exam._id !== action.payload)
      };
    default:
      return state;
  }
}
