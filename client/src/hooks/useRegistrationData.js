import {useEffect, useState} from 'react';
import axios from 'axios';

const useRegistrationData = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
      axios.get('/api/users/registrations')
        .then(result  => {
          setRegistrations(prev => result.data);
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
    .then((newRegistration) => {
      //successful registraiton update the state registrations
      console.log(newRegistration)
      setRegistrations(prev => [...prev, newRegistration])
    })
  };


  return {
    registrations,
    registerUser
  }
};


export default useRegistrationData;
