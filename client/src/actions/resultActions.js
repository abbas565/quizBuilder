import axios from "axios";

import {
  ADD_RESULT,
  ADD_EXAM_RESULT,
  GET_EXAMS_RESULTS,
  GET_EXAM_RESULT,
  GET_ERRORS,
  RESULT_LOADING
  // DELETE_RESULT,
  //CLEAR_ERRORS,
} from "./types";

// Add Question Answer
export const buildQuestionResult = newQuestionAnswer => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("/api/results", newQuestionAnswer)
    .then(res =>
      dispatch({
        type: ADD_RESULT,
        payload: res.data
      })
    )
    .then(console.log("ADD_RESULT payload:", dispatch.payload))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        // // payload: err.response
        // payload: null
      })
    );
};

// Add Exam Result
export const buildExamResult = newExamId => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("/api/results/examresult", newExamId)
    .then(res =>
      dispatch({
        type: ADD_EXAM_RESULT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        // payload: err.response.data
        // payload: err.response
        payload: null
      })
    );
};

// Get ExamResult
export const getExamResult = id => dispatch => {
  // dispatch(setResultLoading());
  console.log("getExamResult action dispatched...");
  axios
    .get(`/api/results/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXAM_RESULT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Get Exams Results
export const getExamsResults = () => dispatch => {
  dispatch(setResultLoading());
  axios
    .get("/api/results")
    .then(res => {
      console.log("GET_EXAMS_RESULTS payload:", res.data);
      dispatch({
        type: GET_EXAMS_RESULTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EXAMS_RESULTS,
        payload: null
      })
    );
  // console.log("GET_EXAMS payload:", payload);
};

// Set loading state
export const setResultLoading = () => {
  return {
    type: RESULT_LOADING
  };
};

// // Delete Exam
// export const deleteExam = id => dispatch => {
//   axios
//     .delete(`/api/exams/${id}`)
//     .then(res =>
//       dispatch({
//         type: DELETE_EXAM,
//         payload: id
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS
//   };
// };
