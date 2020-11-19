import ReactPlayer from "react-player";
import {Link} from 'react-router-dom';

//UserLesson renders a lesson to the user
const UserLesson = (props) => {

  const { lesson, access } = props;

  return (
    <div className="border m-3">

      <h4>{lesson.title}</h4>
      <p>{lesson.description}</p>   {/* it will come from the text editor, remove the p tags then */}
      <div>
      
      <ReactPlayer
        url={lesson.video_url}
        width="50%"
        controls={access}
      />

      </div>
      <footer>
        <span>You can download the notes and list of musics!</span>
        <a href={lesson.note_url} target="_blanck"><button disabled={!access}>Download Now!</button></a>
      </footer>
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