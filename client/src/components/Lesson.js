import React, { useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';

export default function Lesson(props) {

  const { url } = useRouteMatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="row mx-0 my-2 bg-light rounded">
      <div className="col align-self-center">
        {props.title}
      </div>
      <div className="col-3 align-self-center text-right">
        <Link className="btn btn-secondary my-1" to={`${url}/lesson/${props.id}`}>Edit</Link>
        <button type="submit" className="btn btn-secondary my-1 ml-1" onClick={handleDeleteClick}>Delete</button>
      </div>
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
