import Logo from 'components/Logo';
import Contact from 'components/Contact';

import 'style/logo.css';

const Home = () => {

  return (
    <div className="container">
      <Logo />
      <div style={{ backgroundColor: '#f7c8e6' }} className="row mb-4 p-3">
        <div className="col-md-8 align-self-center">
          <img className="logo" src="https://res.cloudinary.com/dxc1pdflu/image/upload/v1606710322/jared-rice-NTyBbu66_SI-unsplash_simfxf.jpg" alt="yoga" />
        </div>
        <div className="col align-self-center mt-1">
          <article>
            <h3>About StrongerU Senior Fitness</h3>
            <p className="text-justify">
              StrongerU Senior Fitness addresses a need for
              quality and consistent senior fitness programming. Group fitness has increasingly shifted toward the
              pre-choreographed model, where instructors receive class content containing an instructional video, choreography notes, and suggested music.
              As a recreation or fitness professional, your time is valuable. The less time you spend choreographing, the more time you can spend making a
              difference in the lives of the seniors you work with. By 2030, there will be over 85 million seniors making up over 20% of the North American population. Currently about 90% of seniors live with at least one chronic health condition.
            </p>
          </article>
        </div>
      </div>

      <div style={{ backgroundColor: '#f7f272' }} className="row mb-4 p-3">
        <div className="col-md-8 align-self-center">
          <img className="logo" src="https://res.cloudinary.com/dxc1pdflu/image/upload/v1606709842/pexels-anna-shvets-4587426_qzwhgn.jpg" alt="cardio" />
        </div>
        <div className="col align-self-center mt-1">
          <article>
            <h3>StrongerU Stretch</h3>
            <p className="text-justify">
              StrongerU Stretch begins with a dynamic warm-up before progressing into head to toe static stretching aimed at maintaining
              and increasing flexibility and range of motion. The program ends with a guided relaxation and purposeful breathing. Each class
              includes a component of mindfulness, purposeful breathing, and guided relaxation. StrongerU Circuit uses an air-light ball to
              complete drills and exercises which promote increased balance and falls prevention.
            </p>
          </article>
        </div>
      </div>

      <h3 className="pl-2">Contact Us</h3>
      <Contact />

    </div>
  );
}


export default Home;