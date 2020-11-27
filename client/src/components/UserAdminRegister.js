import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import useRegistrationData from 'hooks/useRegistrationData';
import { getUserById } from "helpers/selectors"

export default function UserAdminRegister(props) {

  const { userId } = useParams();
  const history = useHistory();
  const { registerUser } = useRegistrationData();
  const user = getUserById(userId, props.state.users);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);

  const courseList = props.state.courses && props.state.courses.map(c =>
    <div className="form-group row" key={c.id}>
      <div className="col">
        <div className="form-check">
          <input className="form-check-input"
            name="courses"
            type="radio"
            checked={!!course && course.id === Number(c.id)}
            value={c.id}
            id={`course${c.id}`}
            onChange={handleCourseChange}
          />
          <label className="form-check-label" htmlFor={`course${c.id}`}>
            {c.title}
          </label>
        </div>
      </div>
    </div>
  );

  return (<>
    { user &&
      <section className="userAdminRegister">
        <div className="container">
          <div className="row">
            <h4>Register user {user.first_name} {user.last_name}</h4>
          </div>
          <div className="row">
            <h5>Select course:</h5>
          </div>
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            {courseList}
          </form>
          <div className="row">
            {!saving && (<button className="btn btn-primary" type="submit" onClick={register} disabled={!course}>Register</button>)}
            {!saving && (<button className="btn btn-primary" type="button" onClick={cancel}>Cancel</button>)}
            {saving && (<span>Saving...</span>)}
          </div>
        </div>
      </section>
    }
  </>);

  function handleCourseChange(event) {
    setCourse(props.state.courses.find(c => c.id === Number(event.target.value)));
  }

  function cancel() {
    history.goBack();
  }

  function register() {
    setSaving(true);
    registerUser(user.id, course.id).then(() => {
      history.goBack();
    });
  }
}
