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
    <div className="container">
      <h4>
        {lesson.id && 'Edit lesson'}
        {!lesson.id && 'Add lesson'}
      </h4>
      <section className="border border-dark p-3 my-3">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="title">Name:</label>
            <div className="input-group mb-3">
              <input className="form-control"
                name="title"
                id="title"
                type="text"
                value={lesson.title}
                placeholder="Enter Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <ReactQuill
              theme="snow"
              value={lesson.description}
              modules={modules}
              formats={formats}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="release_date">Release date:</label>
            <div className="input-group mb-3">
              <input className="form-control"
                name="release_date"
                id="release_date"
                type="datetime-local"
                value={toLocalDatetime(new Date(lesson.release_date))}
                placeholder="Enter date"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="video_url">Video:</label>
            <div className="input-group mb-3">
              <input className="form-control"
                name="video_url"
                id="video_url"
                type="text"
                value={lesson.video_url}
                placeholder="Enter video URL"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note_url">Note:</label>
            <div className="input-group mb-3">
              <input className="form-control"
                name="note_url"
                id="note_url"
                type="text"
                value={lesson.note_url}
                placeholder="Enter note URL"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input className="form-control"
                name="price"
                id="price"
                type="number"
                value={lesson.price / 100}
                placeholder="Enter Price"
                onChange={handleInputChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
        </form>
      </section>
      {!saving && (<button className="btn btn-secondary" type="submit" onClick={save}>Save</button>)}
      {!saving && (<button className="btn btn-outline-secondary ml-2" type="button" onClick={cancel}>Cancel</button>)}
      {saving && (<span>Saving...</span>)}
    </div>
  );

  function handleInputChange(event) {
    const target = event.target;
    if (target.name === 'price') target.value = parseInt(target.value) * 100;
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