import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import questionReducer from "./questionReducer";
import quizReducer from "./quizReducer";
import examReducer from "./examReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  question: questionReducer,
  quiz: quizReducer,
  exam: examReducer
});
