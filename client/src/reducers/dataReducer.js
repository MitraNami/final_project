export const SET_USERS = 'SET_USERS';
export const SET_TOKEN = "SET_TOKEN";

const dataReducer = (state, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users,
                    loading: false,
            };
        }
        case SET_TOKEN: {
            return {...state, token: action.token}
        }
        default:
            return state;
    }
};

export default dataReducer;