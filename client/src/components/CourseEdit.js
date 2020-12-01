import React, { useState } from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ADD_COURSE, EDIT_COURSE } from 'reducers/dataReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getCourseById } from 'helpers/selectors';
import { Link, useRouteMatch } from 'react-router-dom';
import useContentData from 'hooks/useContentData';
import { modules, formats } from 'helpers/quill'
import LessonList from 'components/LessonList';
import UserList from 'components/UserList';
import useRegistrationData from 'hooks/useRegistrationData';

export default function CourseEdit(props) {

  const history = useHistory();
  const { courseId } = useParams();
  const [saving, setSaving] = useState(false);
  const courseObj = courseId && getCourseById(courseId, props.state.courses);
  const [course, setCourse] = useState(courseId && courseObj
    ? { ...courseObj }
    : {
      title: '',
      description: '',
      price: '',
      subscription_based: false,
      authorized: false
    });
  const { lessons, deleteLesson } = useContentData(courseId);
  const { registrations } = useRegistrationData();
  const { url } = useRouteMatch();

  let registeredUserIds = new Set(registrations.filter(r => r.course_id === Number(courseId)).map(r => r.user_id));

  if (courseId && courseObj && !course.id) {
    setCourse({ ...courseObj });
  }

  return (
    <div className="container">
      {course.id && <h4>Edit Course</h4>}
      {!course.id && <h4>Add Course</h4>}
      <section className="border border-dark p-3 my-3">
        <h5>Course Info</h5>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="title">Course name:</label>
            <input className="form-control"
              name="title"
              id="title"
              type="text"
              value={course.title}
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <ReactQuill
              theme="snow"
              value={course.description}
              modules={modules}
              formats={formats}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input className="form-control"
                name="price"
                id="price"
                type="number"
                value={course.price / 100}
                placeholder="Enter Price"
                onChange={handleInputChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input"
                name="subscription_based"
                type="checkbox"
                checked={course.subscription_based}
                onChange={handleInputChange}
                id="subscription_based"
              />
              <label className="form-check-label" htmlFor="subscription_based">Subscription</label>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input"
                name="authorized"
                type="checkbox"
                checked={course.authorized}
                onChange={handleInputChange}
                id="authorized"
              />
              <label className="form-check-label" htmlFor="authorized">Authorized</label>
            </div>
          </div>

          {!saving && (<button className="btn btn-secondary" type="submit" onClick={save}>
            {course.id && 'Save'}
            {!course.id && 'Add'}
          </button>)}
          {!saving && !course.id && (<button className="btn btn-outline-secondary ml-2" type="button" onClick={cancel}>Cancel</button>)}
          {saving && (<span>Saving...</span>)}
        </form>
      </section>

      {courseId && (<>
        <section className="border border-dark p-3 my-3">
          <h5>Course Lessons</h5>
          <LessonList lessons={lessons} deleteLesson={deleteLesson} />
          <Link className="btn btn-secondary mr-2" to={`${url}/lesson/new`}>Add Lesson</Link>
        </section>

        <section className="border border-dark p-3 my-3">
          <h5>Registered Users</h5>
          <UserList users={props.state.users.filter(u => registeredUserIds.has(u.id))} />
        </section>

        <button className="btn btn-outline-secondary mr-2" type="button" onClick={cancel}>Cancel</button>
      </>)}
    </div>
  );

  function handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.name === 'price') value = parseInt(value) * 100;
    setCourse({
      ...course,
      [target.name]: value
    });
  }

  function handleDescriptionChange(description) {
    setCourse({
      ...course,
      description
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