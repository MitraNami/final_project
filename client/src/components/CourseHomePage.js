import {useParams} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

import {isRegisteredForACourse} from '../helpers/selectors';

const CourseHomePage = (props) => {

  //const [registration , setRegistration ] = useState(props.token);
  const { courseId } = useParams();

  const handleClick = () => {
    if (props.token) {
      //the user is logged in, so we need to see if they are registered in this course

      axios.get('/api/users/registrations')
        .then(result => {
          console.log(result.data)
          if (isRegisteredForACourse(props.token.userId, courseId, result.data)) {
            ///show them the contenct of the course
          } else {
            //you need to register them in the course, there are three possibilities
            console.log('register them')
          }

        })

    } else {
      //the user is not logged in, show them signup/login modal
      console.log('not logged in')
    }

  };

  return(
    <div>
      Home page of course with Id: {courseId}
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Start the Course!</button>
    </div>
  )
};


export default CourseHomePage;