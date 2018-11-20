import axios from "axios";

import {
  ADD_QUIZ,
  DELETE_QUIZ,
  GET_QUIZS,
  GET_ERRORS,
  //CLEAR_ERRORS,
  GET_QUESTIONS,
  BUILD_QUIZ,
  GET_RESULTS,
  GET_RESULT,
  QUIZ_LOADING,
  DELETE_RESULT
} from "./types";

// Add Quiz
export const buildQuiz = newQuiz => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("/api/quizzes", newQuiz)
    .then(res =>
      dispatch({
        type: ADD_QUIZ,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  console.log("ADD_QUIZ payload:", dispatch.payload);
};

// // Get Quiz
// export const selectQuestion = () => dispatch => {
//   dispatch(setQuizLoading());
//   axios
//     .get("/api/questions")
//     .then(res =>
//       dispatch({
//         type: GET_QUESTIONS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_QUESTIONS,
//         payload: null
//       })
//     );
// };
// Get Quizs
export const getQuizs = () => dispatch => {
  dispatch(setQuizLoading());
  axios
    .get("/api/quizzes")
    .then(
      res => {
        console.log("GET_QUIZ payload:", res.data);
        dispatch({
          type: GET_QUIZS,
          payload: res.data
        });
      }
      // dispatch({
      //   type: GET_QUIZS,
      //   payload: res.data
      // })
    )
    .catch(err =>
      dispatch({
        type: GET_QUIZS,
        payload: null
      })
    );
  // console.log("GET_QUIZ payload:", payload);
};

// // // Get Question
// // export const getQuestion = id => dispatch => {
// //   dispatch(setQuestionLoading());
// //   console.log("get question action dispatched...");
// //   axios
// //     .get(`/api/questions/${id}`)
// //     .then(res =>
// //       dispatch({
// //         type: GET_QUESTION,
// //         payload: res.data
// //       })
// //     )
// //     .catch(err =>
// //       dispatch({
// //         type: GET_QUESTION,
// //         payload: null
// //       })
// //     );
// // };

// Delete Quiz
export const deleteQuiz = id => dispatch => {
  axios
    .delete(`/api/quizs/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_QUIZ,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setQuizLoading = () => {
  return {
    type: QUIZ_LOADING
  };
};

// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS
//   };
// };
