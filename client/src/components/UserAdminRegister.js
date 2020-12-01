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
      <div className="container">
        <h4>Manual User Registration</h4>
        <form>
          <div className="form-group row mb-0">
            <label htmlFor="first_name" className="col-2 col-form-label">First name:</label>
            <div className="col">
              <input className="form-control-plaintext"
                type="text"
                id="first_name"
                value={user.first_name}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row mb-0">
            <label htmlFor="last_name" className="col-2 col-form-label">Last name:</label>
            <div className="col">
              <input className="form-control-plaintext"
                type="text"
                id="last_name"
                value={user.last_name}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-2 col-form-label">Email:</label>
            <div className="col">
              <input className="form-control-plaintext"
                type="text"
                id="email"
                value={user.email}
                readOnly
              />
            </div>
          </div>
        </form>
        <section className="border border-dark p-3 my-3">
          <h5>Select course:</h5>
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            {courseList}
          </form>
        </section>
        {!saving && (<button className="btn btn-secondary" type="submit" onClick={register} disabled={!course}>Register</button>)}
        {!saving && (<button className="btn btn-outline-secondary ml-2" type="button" onClick={cancel}>Cancel</button>)}
        {saving && (<span>Saving...</span>)}
      </div>
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
