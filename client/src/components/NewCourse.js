import axios from "axios";
import React, { useState } from "react";
import { SAVE_COURSE } from '../reducers/dataReducer';

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
      <div className="form-group">
        <label>
          Course name:
        </label>
        <input
          name="title"
          type="text"
          placeholder="Enter Name"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>
          Content:
        </label>
        <input
          name="content"
          type="text"
          placeholder="Enter Content"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>
          Price:
        </label>
        <input
          name="price"
          type="text"
          placeholder="Enter Price"
          onChange={handleInputChange}
        />
      </div>


      <div className="form-group">
        <label>
          Subscription:
        </label>
        <input
          name="subscription_based"
          type="checkbox"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>
          Authorized:
        </label>
        <input
          name="authorized"
          type="checkbox"
          onChange={handleInputChange}
        />
      </div>




      { !saving && (<button onClick={save}>Save</button>)}
      { saving && (<span>Saving...</span>)}
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

  function save() {
    // TODO: validate form data

    setSaving(true);
    return axios.post(`/api/courses`, course)
      .then(res => {
        props.dispatch({ type: SAVE_COURSE, course: res.data });
        setSaving(false);
      });
  }
}