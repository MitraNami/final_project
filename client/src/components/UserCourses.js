import {Link} from 'react-router-dom';

import useRegistraionDate from 'hooks/useRegistrationData';
import {isRegisteredForACourse} from '../helpers/selectors';


const UserCourses = (props) => {

  const {userId, courses} = props;
  const {registrations} = useRegistraionDate();

  const coursesList = courses.reduce((acc, course) => {
    const courseId = course.id;
    if (isRegisteredForACourse(userId, courseId, registrations)) {
      acc.push(
        <div className="card border" key={courseId}>
          <div className="card-body">
            <p className="card-text">{course.title}</p>
            <Link className="card-link" to={`/courses/${courseId}/content`}>
              <button className="btn btn-primary btn-sm">Continue</button>
            </Link>
          </div>
        </div>
      );
    }
    return acc;

  }, []);
  return (
    <div className="container p-2 mt-2">
      {coursesList}
    </div>

  );

};


export default UserCourses;