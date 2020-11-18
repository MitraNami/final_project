export const SET_USERS = 'SET_USERS';
export const SET_TOKEN = "SET_TOKEN";
export const SET_COURSES = 'SET_COURSES';
export const ADD_COURSE = 'ADD_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,

      }

    case SET_TOKEN:
      return { ...state, token: action.token }

    case SET_COURSES:
      return {
        ...state,
        courses: action.courses,
        loading: false,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: state.courses.concat([action.course])
      };
    case EDIT_COURSE:
      return {
        ...state,
        courses: state.courses.map(c => c.id === action.course.id ? action.course : c)
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(c => c.id !== action.id)
      };
    default:
      return state;
  }
}

export default dataReducer;