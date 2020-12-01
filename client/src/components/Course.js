import axios from "axios";
import React, { useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import { DELETE_COURSE } from '../reducers/dataReducer';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';

export default function Course(props) {

  const { url } = useRouteMatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="row mx-0 my-2 bg-light rounded">
      <div className="col align-self-center">
        {props.title} {props.subscription_based ? '(subscription)' : ''}
      </div>
      <div className="col-3 align-self-center text-right">
        <Link className="btn btn-secondary my-1" to={`${url}/courses/${props.id}`}>Edit</Link>
        <button type="submit" className="btn btn-secondary my-1 ml-1" onClick={handleDeleteClick}>Delete</button>
      </div>
      <ConfirmDeleteModal modalIsOpen={modalShow} setModalIsOpen={setModalShow} onDelete={delCourse} />
    </div>
  );

  function handleDeleteClick() {
    setModalShow(true);
  }

  function delCourse() {
    return axios.delete(`/api/courses/${props.id}`)
      .then(() => props.dispatch({ type: DELETE_COURSE, id: props.id }));
  }
}
