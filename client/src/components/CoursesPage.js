
import { Link, useRouteMatch } from 'react-router-dom';


const CoursesPage = (props) => {

  const { url } = useRouteMatch();

  const courses = props.courses.map(course => {
    let tag = "";
    const price = course.price;
    const subscription = course.subscription_based;
    if (price) {
      tag = tag + '$' + (price / 1000);
    }
    if (subscription) {
      tag += ' Series';
    }
    
    return (
      <div className="card border border-dark m-2" key={course.id}>
        <div className="card-body">
          <p className="card-text">{course.title} <br />{tag}</p>

          <Link className="card-link" to={`${url}/${course.id}/home`}>Read More</Link>

        </div>
      </div>
      
      // <Link key={course.id} to={`${url}/${course.id}/home`}>
      //   <Course
      //     title={course.title}
      //     description={course.description}
      //     subscription_based={course.subscription_based} />
      // </Link>
    );
  });

  const myStyle = {
    
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '90vh',
    display: 'block',
    margin: '0 auto'

  };
  
  return (
    <div className="mb-5">
      
      <img style={myStyle} src="https://res.cloudinary.com/dxc1pdflu/image/upload/v1606336861/samples/SeniorYoga_cryk0v.png" alt="senior yoga" />
      
      <div className="card-group container p-2 mt-2">
        {courses}
      </div>

    </div>
  );

};

export default CoursesPage;