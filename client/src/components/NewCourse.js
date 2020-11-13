import axios from "axios";
import React, { useState } from "react";
import { SAVE_COURSE } from '../reducers/dataReducer';

export default function NewCourse(props) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        name="name"
        type="text"
        placeholder="Enter Course Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      { !saving && (<button onClick={save}>Save</button>)}
      { saving && (<span>Saving...</span>)}
    </form>
  );

  function save() {
    setSaving(true);
    const course = {
      title: name,
      content: '',
      subscription_based: false
    };

    return axios.post(`/api/courses`, course)
      .then(res => {
        props.dispatch({ type: SAVE_COURSE, course: res.data });
        setSaving(false);
      });
  }
}