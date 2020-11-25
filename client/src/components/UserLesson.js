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

  const createMarkup = msg => {
    return {__html: `${msg}`};
  };
  
  const lessonDes = msg => {
    return <div dangerouslySetInnerHTML={createMarkup(msg)} />;
  };
  

  return (
    <div className="border border-dark rounded p-2 mt-3 mb-1">
      {/* if the user does not have access to the lesson, show them a buy now button */}
      {!access && <button onClick={handlePurchase} className="btn btn-danger">Buy now!</button>} 
      <h4>{lesson.title}</h4>
      {lessonDes(lesson.description)}
      <div className="m-1">
      
      {/* if the user has access to the lesson show them the video
      otherwise just show them a picture of it */}
      {access && <ReactPlayer
        url={lesson.video_url}
        width="50%"
        controls
      />}
      {!access && <img 
        width="10%"
        src="https://cdn.pixabay.com/photo/2017/06/13/12/51/play-2398751_960_720.png"
        alt="senior fitness video"
         />}

      </div>
      <footer>
        <span className="p-2">Choreography notes and list of musics:</span>
        {/* if the user has access to the lesson show them the link to download
        the pdf, otherwise just show them a disabled button */}
        {access && <a href={lesson.note_url} target="_blanck"><button className="btn btn-sm btn-primary rounded">Download</button></a>}
        {!access && <button className="btn btn-sm btn-primary rounded" disabled>Download</button>}
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
