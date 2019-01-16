import axios from "axios";

import {
  ADD_EXAM,
  GET_EXAMS,
  GET_EXAM,
  EXAM_LOADING,
  DELETE_EXAM,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Add Exam
export const buildExam = newExam => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/exams", newExam)
    .then(res =>
      dispatch({
        type: ADD_EXAM,
        payload: res.data
      })
    )
    .then(console.log("ADD_EXAM payload:", dispatch.payload))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Exams
export const getExams = () => dispatch => {
  dispatch(setExamLoading());
  axios
    .get("/api/exams")
    .then(res => {
      console.log("GET_EXAMS payload:", res.data);
      dispatch({
        type: GET_EXAMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EXAMS,
        payload: null
      })
    );
  // console.log("GET_EXAMS payload:", payload);
};

// Get Exam
export const getExam = id => dispatch => {
  dispatch(setExamLoading());
  console.log("get exam action dispatched...");
  axios
    .get(`/api/exams/${id}`)
    .then(res => {
      console.log("GET_EXAM payload:", res.data);
      dispatch({
        type: GET_EXAM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EXAM,
        payload: null
      })
    );
};

// Delete Exam
export const deleteExam = id => dispatch => {
  axios
    .delete(`/api/exams/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EXAM,
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
export const setExamLoading = () => {
  return {
    type: EXAM_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
