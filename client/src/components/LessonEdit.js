import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import useLessonData from 'hooks/useLessonData';
import { toLocalDatetime } from 'helpers/datetime';

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
              <input class="form-control"
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
              <input class="form-control"
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
            <div className="input-group mb-3">
              <input class="form-control"
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
              <input class="form-control"
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
              <input class="form-control"
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
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input class="form-control"
                name="price"
                type="number"
                value={lesson.price}
                placeholder="Enter Price"
                onChange={handleInputChange}
              />
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
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

    setLesson(prev => ({
      ...prev,
      [target.name]: target.value
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