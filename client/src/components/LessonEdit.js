import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory, useParams } from 'react-router-dom';
import useLessonData from 'hooks/useLessonData';
import { toLocalDatetime } from 'helpers/datetime';
import { modules, formats } from 'helpers/quill'

export default function LessonEdit() {

  const history = useHistory();
  const { lessonId, courseId } = useParams();
  const [saving, setSaving] = useState(false);
  const { lesson, setLesson, saveLesson } = useLessonData(lessonId, courseId);

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
            <div className="input-group mb-3">
              <input className="form-control"
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
            <div className="input-group mb-3">
              <ReactQuill
                theme="snow"
                value={lesson.description}
                modules={modules}
                formats={formats}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Release date:
            </label>
            <div className="input-group mb-3">
              <input className="form-control"
                name="release_date"
                type="datetime-local"
                value={toLocalDatetime(new Date(lesson.release_date))}
                placeholder="Enter date"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Video:
            </label>
            <div className="input-group mb-3">
              <input className="form-control"
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
            <div className="input-group mb-3">
              <input className="form-control"
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
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input className="form-control"
                name="price"
                type="number"
                value={lesson.price/100}
                placeholder="Enter Price"
                onChange={handleInputChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
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
    if (target.name === 'price') target.value = parseInt(target.value)*100;
    setLesson(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  function handleDescriptionChange(description) {
    setLesson(prev => ({
      ...prev,
      description
    }));
  }

  function cancel() {
    history.goBack();
  }

  function save() {
    // TODO: validate form data

    setSaving(true);
    saveLesson()
      .then(() => {
        setSaving(false);
        history.goBack();
      });
  }
};