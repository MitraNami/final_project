import axios from "axios";
import React, { useState } from "react";
import { ADD_COURSE } from '../reducers/dataReducer';

export default function NewCourse(props) {
  const [course, setCourse] = useState({
    title: '',
    content: '',
    price: '',
    subscription_based: false,
    authorized: false
  });
  const [saving, setSaving] = useState(false);

  return (
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Course name:
        </label>
        <div className="col-sm-10">
          <input
            name="title"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Content:
        </label>
        <div className="col-sm-10">
          <input
            name="content"
            type="text"
            placeholder="Enter Content"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Price:
        </label>
        <div className="col-sm-10">
          <input
            name="price"
            type="text"
            placeholder="Enter Price"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input"
              name="subscription_based"
              type="checkbox"
              onChange={handleInputChange}
              id="defaultCheck1"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Subscription
            </label>
          </div>
        </div>
        
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input"
              name="authorized"
              type="checkbox"
              onChange={handleInputChange}
              id="defaultCheck2"
            />
            <label className="form-check-label" htmlFor="defaultCheck2">
              Authorized
            </label>
          </div>
        </div>
      </div>

      {!saving && (<button className="btn btn-primary" type="submit" onClick={save}>Save</button>)}
      {!saving && (<button className="btn btn-primary" type="button" onClick={cancel}>Cancel</button>)}
      {saving && (<span>Saving...</span>)}
    </form>
  );

  function handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.name === 'price') value = parseInt(value);
    setCourse({
      ...course,
      [target.name]: value
    });
  }

  function cancel() {
    props.onClose();
  }

  function save() {
    // TODO: validate form data

    setSaving(true);
    return axios.post(`/api/courses`, course)
      .then(res => {
        props.dispatch({ type: ADD_COURSE, course: res.data });
        setSaving(false);
        props.onClose();
      });
  }
}