import {
  ADD_REPORT,
  GET_REPORTS,
  GET_REPORT,
  DELETE_REPORT,
  REPORT_LOADING
} from "../actions/types";

const initialState = {
  reports: [],
  report: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REPORT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: action.payload,
        loading: false
      };
    case GET_REPORT:
      return {
        ...state,
        report: action.payload,
        loading: false
      };
    case ADD_REPORT:
      return {
        ...state,
        reports: [action.payload, ...state.reports]
      };
    case DELETE_REPORT:
      return {
        ...state,
        reports: state.reports.filter(report => report._id !== action.payload)
      };
    default:
      return state;
  }
}
