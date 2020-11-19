import React, { useState } from "react";
import axios from "axios";
import { ADD_COURSE, EDIT_COURSE } from '../reducers/dataReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getCourseById } from '../helpers/selectors';
import { Link, useRouteMatch } from 'react-router-dom';
import useContentData from 'hooks/useContentData';
import LessonList from './LessonList';

export default function CourseEdit(props) {

  const history = useHistory();
  const { courseId } = useParams();
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(courseId
    ? { ...getCourseById(courseId, props.state.courses) }
    : {
      title: '',
      description: '',
      price: '',
      subscription_based: false,
      authorized: false
    });
  const { lessons } = useContentData(courseId);
  const { url } = useRouteMatch();

  return (
    <section className="courseEdit">
      <div className="container">
        <div className="row">
          <h4>
            {course.id && 'Edit Course'}
            {!course.id && 'Add Course'}
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
                value={course.title}
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
                value={course.description}
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
                value={course.price}
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
                  checked={course.subscription_based}
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
                  checked={course.authorized}
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
        <LessonList lessons={lessons} dispatch={props.dispatch} admin={true} />
        <div className="col">
          <Link className="btn btn-primary" to={`${url}/course/lesson/new`}>Add lesson</Link>
        </div>
      </div>
    </section >

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
    history.goBack();
  }

  function save() {
    // TODO: validate form data

    setSaving(true);

    if (course.id) {
      // Edit existing course
      axios.put(`/api/courses/${courseId}`, course)
        .then(res => {
          props.dispatch({ type: EDIT_COURSE, course: res.data });
          setSaving(false);
          history.goBack();
        });
    } else {
      // Adding new course
      axios.post(`/api/courses`, course)
        .then(res => {
          props.dispatch({ type: ADD_COURSE, course: res.data });
          setSaving(false);
          history.goBack();
        });
    }
  }
};