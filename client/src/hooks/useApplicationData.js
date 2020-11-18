import { useEffect, useReducer } from 'react';
import dataReducer, { SET_USERS, SET_COURSES } from '../reducers/dataReducer';

import axios from 'axios';

const useApplicationData = () => {
    const [state, dispatch] = useReducer(dataReducer, {
        users: [],
        courses: [],
        loading: true,
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

    function deleteCourse(id) {
        const course = {
            ...state.courses[id]
        };

        return axios.delete(`/admin/account/courses/${id}`)
            .then(() => dispatch({ ...state, course }));
    }

    return {
        state,
        dispatch,
        deleteCourse
    };
};

export default useApplicationData;