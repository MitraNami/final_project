import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import { getLessonById } from '../helpers/selectors';

export default function LessonEdit(props) {

  const history = useHistory();
  const { courseId, lessonId } = useParams();
  const [saving, setSaving] = useState(false);
  const [lesson, setLesson] = useState(lessonId
    ? { ...getLessonById(lessonId, props.state.lessons) }
    : {
      title: '',
      description: '',
      release_date: '',
      video_url: '',
      note_url: '',
      price: '',
      course_id: courseId
    });

  return (
    <section className="lessonEdit">
      <div className="container">
        <div className="row">
          <h4>
            {lesson.id && 'Edit lesson'}
            {!lesson.id && 'Add lesson'}
          </h4>
        </div>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Name:
            </label>
            <div className="col-sm-10">
              <input
                name="title"
                type="text"
                value={lesson.title}
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
                value={lesson.description}
                placeholder="Enter Description"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Release date:
            </label>
            <div className="col-sm-10">
              <input
                name="release_date"
                type="date"
                value={lesson.release_date}
                placeholder="Enter date"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Video:
            </label>
            <div className="col-sm-10">
              <input
                name="video_url"
                type="text"
                value={lesson.video_url}
                placeholder="Enter video URL"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Note:
            </label>
            <div className="col-sm-10">
              <input
                name="note_url"
                type="text"
                value={lesson.note_url}
                placeholder="Enter note URL"
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
                value={lesson.price}
                placeholder="Enter price"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {!saving && (<button className="btn btn-primary" type="submit" onClick={save}>Save</button>)}
          {!saving && (<button className="btn btn-primary" type="button" onClick={cancel}>Cancel</button>)}
          {saving && (<span>Saving...</span>)}
        </form>
      </div>
    </section >

  );

  function handleInputChange(event) {
    const target = event.target;

    setLesson({
      ...lesson,
      [target.name]: target.value
    });
  }

  function cancel() {
    history.goBack();
  }

  function save() {
    // TODO: validate form data

    setSaving(true);

    if (lesson.id) {
      // TODO: Edit existing lesson
    } else {
      // Add new lesson
      axios.post(`/api/lessons`, lesson)
        .then(res => {
          setSaving(false);
          history.goBack();
        });
    }
  }
};