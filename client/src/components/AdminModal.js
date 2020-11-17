
const AdminModal = (props) => {

  const handleSendMsg = () => {
      console.log('send msg to admin');
      props.cancelModal(false);
  };


  const handleCancel = () => {
    //close the admin modal
    props.cancelModal(false);
  };


  return (
    <div className="overlay">
      <div className="content">
        <h4>You need to request registration. Do you want to send a request to
          admin to be registered?
        </h4>
        <button type="submit" onClick={handleSendMsg}>OK</button>
        <br />
        <button type="submit" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};


export default AdminModal;