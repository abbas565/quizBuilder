import axios from "axios";

import {
  ADD_RESULT,
  ADD_EXAM_RESULT,
  // GET_EXAMS,
  // GET_EXAM,
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
    .then(console.log("ADD_EXAM_RESULT payload:", dispatch.payload))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        // // payload: err.response
        // payload: null
      })
    );
};

// Set loading state
export const setResultLoading = () => {
  return {
    type: RESULT_LOADING
  };
};

// // Add Exam
// export const buildExam = newExam => dispatch => {
//   // dispatch(clearErrors());
//   axios
//     .post("/api/exams", newExam)
//     .then(res =>
//       dispatch({
//         type: ADD_EXAM,
//         payload: res.data
//       })
//     )
//     .then(console.log("ADD_EXAM payload:", dispatch.payload))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Get Exams
// export const getExams = () => dispatch => {
//   dispatch(setExamLoading());
//   axios
//     .get("/api/exams")
//     .then(res => {
//       console.log("GET_EXAMS payload:", res.data);
//       dispatch({
//         type: GET_EXAMS,
//         payload: res.data
//       });
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_EXAMS,
//         payload: null
//       })
//     );
//   // console.log("GET_EXAMS payload:", payload);
// };

// // Get Exam
// export const getExam = id => dispatch => {
//   dispatch(setExamLoading());
//   console.log("get exam action dispatched...");
//   axios
//     .get(`/api/exams/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_EXAM,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_EXAM,
//         payload: null
//       })
//     );
// };

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
