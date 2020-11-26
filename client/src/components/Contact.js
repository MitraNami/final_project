import { useState } from 'react';

import axios from 'axios';

const Contact = () => {

  const [state, setState] = useState({
    name: '',
    email: '',
    msg: '',
    status: 'Submit'
  });

  const handleChange = (evt) => {
    setState(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setState(prev => ({...prev, status: 'Sending'}));

    axios.post('/contact', {
      ...state
    })
    .then(result => {
      if (result.data.status === "sent") {
        alert("Message Sent");
        setState(prev => ({name: '', email: '', msg: '', status: 'Submit'}));
      } else if (result.data.status === "failed") {
        alert("Message Failed")
      }
      
    })
    .catch(error => console.log(error, 'did not contact successfully'));
  };

  return (

    <div className="container">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{state.status}</button>
      </form>
    </div>
    
  );

};


export default Contact;