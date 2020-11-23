// the logic of subscription to a course is here

import {useState, useEffect} from 'react';
import axios from 'axios';

const useSubscriptionData = (userId, courseId) => {

  const [state, setState] = useState({
    subscriptions: [],
    cancelSubModalShow: false
  });

  const setCancelSubModalShow = show => setState(prev => ({...prev, cancelSubModalShow: show}));

  const setSubscription = subscriptions => setState(prev => 
    ({...prev, subscriptions}));

  //Get subscriptions for a specific user in a specific course
  useEffect(() => {
    axios.get(`/api/subscriptions/${userId}&${courseId}`)
    .then(result => {
      const subscriptions = result.data;
      setState(prev => ({...prev, subscriptions}));
    })

  }, [courseId, userId]);


  const subscriptions = state.subscriptions;
  const cancelSubModalShow = state.cancelSubModalShow;

  return {
    subscriptions,
    setSubscription,
    cancelSubModalShow,
    setCancelSubModalShow
  }

};


export default useSubscriptionData;