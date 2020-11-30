import {useState} from 'react';
import Modal from 'react-modal';

import '../style/modal.css';

Modal.setAppElement('#root');

const PaymentModal = (props) => {

  const {modalIsOpen, setModalIsOpen, price, handleForm} = props;

  const [state, setState] = useState({
    name: '',
    cardNumber: '',
    exp: '',
    cvc: ''
  });

  const handleChange = (evt) => {
    setState(prev => ({...prev, [evt.target.name]: evt.target.value }));
  }; 


  return(
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="Paymentmodal"
      overlayClassName="Overlay"
    >
      <div className="container">
        <form onSubmit={handleForm} autoComplete="off" spellCheck="false">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" className="form-control" type="text" name="name" value={state.name} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Card number</label>
            <input id="cardNumber" className="form-control" type="text" name="cardNumber" value={state.cardNumber} onChange={handleChange} required/>
          </div>
          <div className="d-flex flex-row form-group">
            <input id="exp" className="form-control" type="text" name="exp" placeholder="YY/MM" value={state.exp} onChange={handleChange} required/>
            <input id="cvc" className="form-control" type="text" name="cvc" placeholder="CVC" value={state.cvc} onChange={handleChange} required/>
          </div>
          <button className="btn btn-sm btn-outline-dark" type="submit">Pay ${price / 100}</button>
        </form>
      </div>
    </Modal>
  );

};


export default PaymentModal;