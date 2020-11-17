import {useEffect, useState} from 'react';
import axios from 'axios';

const useRegistrationData = () => {
  const [state, setState] = useState({
    registrations: [],
    modalShow: false,
    adminModalShow: false,
    redirectToContent: false,
  });

  const setModalShow = (show) => setState(prev => ({...prev, modalShow: show}));
  const setAdminModalShow = (show) => setState(prev => ({...prev, adminModalShow: show}));
  const setRedirectToContent = (redirect) => setState(prev => ({...prev, redirectToContent: redirect}));

  useEffect(() => {
      axios.get('/api/users/registrations')
        .then(result  => {
          setState(prev => ({...prev, registrations: result.data}));
    })
  }, []);



// it will send a register request to the database
//for a given user and course
  const registerUser = (userId, courseId) => {
    return axios.post('/api/users/registrations', {
      start_date: new Date(),
      user_id: userId,
      course_id: courseId
    })
    .then(result => {
      //successful registraiton update the state registrations
      const newRegistration = result.data;
      setState(prev => ({...prev, registrations: [...prev.registrations, newRegistration]}));
    })
  };

  const registrations = state.registrations;
  const modalShow = state.modalShow;
  const adminModalShow = state.adminModalShow;
  const redirectToContent = state.redirectToContent;

  return {
    registrations,
    registerUser,
    modalShow,
    setModalShow,
    adminModalShow,
    setAdminModalShow,
    redirectToContent,
    setRedirectToContent
  }
};


export default useRegistrationData;
