import { useEffect, useReducer } from 'react';
import dataReducer, { SET_USERS, SET_COURSES } from '../reducers/dataReducer';
import axios from 'axios';

const useApplicationData = () => {
    const [state, dispatch] = useReducer(dataReducer, {
        users: [],
        courses: [],
        loading: true,
        addingCourse: false,
        token: JSON.parse(localStorage.getItem('token'))
    });

    useEffect(() => {
        Promise.all([
            axios.get("/api/users"),
            axios.get("/api/courses")
        ]).then(all => {
            dispatch({ type: SET_USERS, users: all[0].data });
            dispatch({ type: SET_COURSES, courses: all[1].data });
        });
    }, []);

    return {
        state,
        dispatch,
    };
};

export default useApplicationData;