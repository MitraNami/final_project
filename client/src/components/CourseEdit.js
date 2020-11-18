import React, { useState } from "react";
import axios from "axios";
import { SAVE_COURSE } from '../reducers/dataReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getCourseById } from '../helpers/selectors';

export default function CourseEdit(props) {

  const history = useHistory();
  const { courseId } = useParams();
  const [saving, setSaving] = useState(false);
  const course = { ...getCourseById(courseId, props.state.courses) };
  const [courseData, setCourseData] = useState(course.id || {
    title: '',
    description: '',
    price: '',
    subscription_based: false,
    authorized: false
  });
  console.log(courseData);

  return (
    <section className="courseEdit">
      <div className="container">
        <div className="row">
          <h4>
            {courseData.id && 'Edit Course'}
            {!courseData.id && 'Add Course'}
          </h4>
        </div>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Course name:
            </label>
            <div className="col-sm-10">
              <input
                name="title"
                type="text"
                value={courseData.title}
                placeholder="Enter Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Description:
            </label>
            <div className="col-sm-10">
              <input
                name="description"
                type="text"
                value={courseData.description}
                placeholder="Enter Description"
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
                value={courseData.price}
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
                  checked={courseData.subscription_based}
                  onChange={handleInputChange}
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Subscription
                </label>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input"
                  name="authorized"
                  type="checkbox"
                  checked={courseData.authorized}
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

        <div className="row">
          <h4>Lessons</h4>
        </div>
        {/* <LessonList lessons={props.state.courses.find(course => course.id === courseId).lessons} dispatch={props.dispatch} admin={true} /> */}
      </div>
    </section >

  );

  function handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.name === 'price') value = parseInt(value);
    setCourseData({
      ...courseData,
      [target.name]: value
    });
  }

  function cancel() {
    history.goBack();
  }

  function save() {
    console.log(courseData);
    // TODO: validate form data

    setSaving(true);

    if (courseData.id) {
      // Edit existing course
      // TODO: replace with HTTP PUT to /api/courses/:courseId, i.e.:
      //   courseData.id && axios.put(...)
      history.goBack();
    } else {
      // Adding new course
      axios.post(`/api/courses`, courseData)
        .then(res => {
          props.dispatch({ type: SAVE_COURSE, course: res.data });
          setSaving(false);
          history.goBack();
        });
    }
  }
};