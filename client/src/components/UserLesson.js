import { useState } from "react";
import ReactPlayer from "react-player";

import PaymentBuyNowModal from 'components/PaymentBuyNowModal';

//UserLesson renders a lesson to the user
const UserLesson = (props) => {

  const [buyNowModalShow, setBuyNowModalShow] = useState(false);

  const { lesson, access, userId, subscriptions, setSubscription } = props;

  const handlePurchase = () => {
    setBuyNowModalShow(true);
  };

  return (
    <div className="border m-3">
      {/* if the user does not have access to the lesson, show them a buy now button */}
      {!access && <button onClick={handlePurchase} className="btn btn-danger">Buy now!</button>} 
      <h4>{lesson.title}</h4>
      <p>{lesson.description}</p>   {/* it will come from the text editor, remove the p tags then */}
      <div>
      
      {/* if the user has access to the lesson show them the video
      otherwise just show them a picture of it */}
      {access && <ReactPlayer
        url={lesson.video_url}
        width="30%"
        controls
      />}
      {!access && <img 
        width="10%"
        src="https://cdn.pixabay.com/photo/2017/06/13/12/51/play-2398751_960_720.png"
        alt="senior fitness video"
         />}

      </div>
      <footer>
        <span>You can download the notes and list of musics!</span>
        {/* if the user has access to the lesson show them the link to download
        the pdf, otherwise just show them a disabled button */}
        {access && <a href={lesson.note_url} target="_blanck"><button>Download Now!</button></a>}
        {!access && <button disabled>Download Now!</button>}
      </footer>

      <PaymentBuyNowModal
        modalIsOpen={buyNowModalShow}
        setModalIsOpen={setBuyNowModalShow}
        price={lesson.price}
        lesson={lesson}
        userId={userId}
        subscriptions={subscriptions}
        setSubscription={setSubscription}
        />
    </div>
  );
};



export default UserLesson;


{/* <div className="d-flex flex-row justify-content-start pt-5 pl-5">
  <h2>{lesson.title}</h2>
  <div>{lesson.description}</div>
        <img src="https://picsum.photos/id/237/200/200" alt="video" />
        <div className="d-flex flex-column justify-content-between pl-3">
          <span>pdf file</span>
          <button className="btn btn-primary">Buy now!</button>
        </div>
      </div> */}