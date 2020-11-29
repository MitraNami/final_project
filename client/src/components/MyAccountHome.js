
import { Link } from 'react-router-dom';

import makeCardGrid from '../helpers/cardGrid';
import '../style/cardGrid.css';


const MyAccountHome = (props) => {

  const courses = props.courses.map(course => {
    let tag = "";
    const price = course.price;
    const subscription = course.subscription_based;
    if (price) {
      tag = tag + '$' + (price / 100);
    }
    if (subscription) {
      tag += ' Series';
    }

    return (

      <div id="grid" className="card border border-dark m-2 col" key={course.id}>
        <div className="card-body">
          <p className="card-text">{course.title} <br />{tag}</p>
          <Link className="card-link" to={`/courses/${course.id}/home`}>Read More</Link>
        </div>
      </div>
    );
  });

  //Arrange each course card in rows of three
  const gridCourses = makeCardGrid(courses);


  return (
      
      <div className="mb-5">

        <div className="container p-2 mt-2">
        <h3>Suggested Courses</h3>
          {gridCourses}
        </div>

      </div>
  );
};



export default MyAccountHome;