import React from "react";
import CourseList from 'components/CourseList';
import UserList from 'components/UserList';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Admin(props) {

  const { url } = useRouteMatch();

  return (
    <section className="admin">
      <section className="courseAdmin">
        <div className="container">
          <div className="row">
            <h4>Courses</h4>
          </div>
          <CourseList courses={props.state.courses} dispatch={props.dispatch} admin={true} />
          <div className="row">
            <Link className="btn btn-primary" to={`${url}/courses/new`}>Add course</Link>
          </div>
        </div>
      </section>
      <section className="userAdmin">
        <div className="container">
          <div className="row">
            <h4>Users</h4>
          </div>
          <UserList users={props.state.users} />
        </div>
      </section>
    </section >
  );
};
