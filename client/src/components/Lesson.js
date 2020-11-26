import React, { useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';

export default function Lesson(props) {

  const { url } = useRouteMatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="row">
      <div className="col">
        {props.title}
      </div>
      { props.admin && (<div className="col-1"><Link className="btn btn-primary" to={`${url}/lesson/${props.id}`}>Edit</Link></div>)}
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary" onClick={handleDeleteClick}>Delete</button></div>)}
      <ConfirmDeleteModal modalIsOpen={modalShow} setModalIsOpen={setModalShow} onDelete={deleteLesson} />
    </div>
  );

  function handleDeleteClick() {
    setModalShow(true);
  }

  function deleteLesson() {
    props.deleteLesson(props.id);
  }
}
