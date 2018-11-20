import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import reportReducer from "./reportReducer";
import questionReducer from "./questionReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  report: reportReducer,
  question: questionReducer,
  quiz: quizReducer
});
