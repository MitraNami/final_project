// the logic of subscription to a course is here

import {useState, useEffect} from 'react';
import axios from 'axios';

const useSubscriptionData = (userId, courseId) => {

  const [state, setState] = useState({
    subscriptions: []
  });

  const setSubscription = (newSubscription) => setState(prev => 
    ({...prev, subscriptions:[...prev.subscriptions, newSubscription]}));

  //Get subscriptions for a specific user in a specific course
  useEffect(() => {
    axios.get(`/api/subscriptions/${userId}&${courseId}`)
    .then(result => {
      const subscriptions = result.data;
      setState(prev => ({...prev, subscriptions}));
    })

  }, [courseId, userId]);


  const subscriptions = state.subscriptions;

  return {
    subscriptions,
    setSubscription
  }

};


export default useSubscriptionData;