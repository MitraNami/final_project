import {Link} from 'react-router-dom';
import '../style/cardGrid.css';

import useRegistraionDate from 'hooks/useRegistrationData';
import {isRegisteredForACourse} from '../helpers/selectors';
import makeCardGrid from '../helpers/cardGrid';

const UserCourses = (props) => {

  const {userId, courses} = props;
  const {registrations} = useRegistraionDate();

  const coursesList = courses.reduce((acc, course) => {
    const courseId = course.id;
    if (isRegisteredForACourse(userId, courseId, registrations)) {
      acc.push(
        <div id="grid" className="card border border-dark m-2 col" key={courseId}>
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

    //Arrange course cards in rows of three
    const gridCourses = makeCardGrid(coursesList);

  return (
    <div className="container p-2 mt-2">
      {gridCourses}
    </div>

  );

};


export default UserCourses;