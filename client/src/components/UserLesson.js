
//UserLesson renders a lesson to the user
const UserLesson = ({videoUrl, noteUrl}) => {

  return (
    <div>
      <div className="d-flex flex-row justify-content-start pt-5 pl-5">
        <img src="https://picsum.photos/id/237/200/200" alt="video" />
        <div className="d-flex flex-column justify-content-between pl-3">
          <span>pdf file</span>
          <button className="btn btn-primary">Buy now!</button>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-start pt-5 pl-5">
        <img src="https://picsum.photos/id/237/200/200" alt="video" />
        <div className="d-flex flex-column justify-content-between pl-3">
          <span>pdf file</span>
          <button className="btn btn-primary">Buy now!</button>
        </div>
      </div>

    </div>
  );
};



export default UserLesson;