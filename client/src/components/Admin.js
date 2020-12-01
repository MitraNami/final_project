import React from "react";
import CourseList from 'components/CourseList';
import UserList from 'components/UserList';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Admin(props) {

  const { url } = useRouteMatch();

  return (
    <div className="container">
      <h4>Admin Account</h4>
      <section className="border border-dark p-3 my-3">
        <h5>Courses</h5>
        <CourseList courses={props.state.courses} dispatch={props.dispatch} />
        <Link className="btn btn-secondary mr-2" to={`${url}/courses/new`}>Add Course</Link>
      </section>
      <section className="border border-dark p-3 my-3">
        <h5>Users</h5>
        <UserList users={props.state.users} />
      </section>
    </div>
  );
};
