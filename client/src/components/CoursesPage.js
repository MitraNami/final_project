import Course from './Course';
import { Link, useRouteMatch} from 'react-router-dom';


const CoursesPage = (props) => {

  const { path, url } = useRouteMatch();

  const courses = props.courses.map(course => {
    return (
      <Link key={course.id} to={`${url}/${course.id}/home`}>
        <Course
          title={course.title}
          description={course.description}
          subscription_based={course.subscription_based} />
      </Link>
    );
  });

  return (
    <div>
      <h2>Available Courses</h2>
      {courses}
    </div>
  );

};

export default CoursesPage;