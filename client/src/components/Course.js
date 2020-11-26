import axios from "axios";
import React, { useState } from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import { DELETE_COURSE } from '../reducers/dataReducer';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';

export default function Course(props) {

  const { url } = useRouteMatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="row">
      <div className="col">
        {props.title} {props.subscription_based ? '(subscription)' : ''}
      </div>
      { props.admin && (<div className="col-1"><Link className="btn btn-primary" to={`${url}/courses/${props.id}`}>Edit</Link></div>)}
      { props.admin && (<div className="col-1"><button type="submit" className="btn btn-primary" onClick={handleDeleteClick}>Delete</button></div>)}
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
