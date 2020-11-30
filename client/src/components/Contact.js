import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import axios from 'axios';
import Modal from 'react-modal';

import '../style/modal.css';

import Logo from 'components/Logo';

Modal.setAppElement('#root');

const Contact = () => {

  const { url } = useRouteMatch();

  const [state, setState] = useState({
    name: '',
    email: '',
    msg: '',
    status: 'Submit',
    modalShow: false,
    sent: false
  });

  const setModalShow = show => setState(prev => ({ ...prev, modalShow: show }));
  const setSent = sent => setState(prev => ({ ...prev, sent }));

  const handleChange = (evt) => {
    setState(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    setState(prev => ({ ...prev, status: 'Sending' }));

    axios.post('/api/contact', {
      name: state.name,
      email: state.email,
      msg: state.msg
    })
      .then(result => {
        if (result.data.status === "sent") {
          setSent(true);
        } else if (result.data.status === "failed") {
          setSent(false);
        }
        setModalShow(true);

      })
      .catch(error => console.log(error, 'did not contact successfully'));
  };

  const reset = () => {
    setState(prev => ({ name: '', email: '', msg: '', status: 'Submit' }));
  };



  return (

    <div className="container">
      {url === '/contact' && <Logo />}
      <form className="border border-dark p-2" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" className="form-control" type="text" name="name" value={state.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" className="form-control" type="email" name="email" value={state.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="msg">Message</label>
          <textarea id="msg" className="form-control" name="msg" value={state.msg} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-outline-dark">{state.status}</button>
      </form>

      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={state.modalShow}
      >
        <div className="d-flex flex-column justify-content-center">
          <p className="text-center">
            {state.sent ? "Message Sent" : "Message Failed"}
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm btn-dark" onClick={reset}>OK</button>
          </div>
        </div>
      </Modal>

    </div>

  );

};


export default Contact;