import 'style/logo.css';

import useWindowsHeight from 'hooks/useWindowsHeight';

const Footer = () => {

  const {viewHeight, documentHeight} = useWindowsHeight();

  //If the document height is smaller than viewport height, place the footer
  //at the end of the view port

  const classname = documentHeight < viewHeight ? "fixed-bottom bg-dark mt-5" : "bg-dark mt-5";

  return (
    <nav className={classname}>

      <div className="d-flex flex-row justify-content-between">

        <img src="https://res.cloudinary.com/dxc1pdflu/image/upload/v1606716109/social_media_tuxjvk.png" alt="social media" useMap="#social_media" />
        <map name="social_media">
          <area target="_blank" alt="facebook" href="https://www.facebook.com/" coords="42,26,20" shape="circle" />
          <area target="_blank" alt="tweeter" href="https://twitter.com/" coords="95,10,77,31,98,46,118,14" shape="poly" />
          <area target="_blank" alt="instagram" href="https://www.instagram.com/" coords="148,28,19" shape="circle" />
        </map>

        <span className="text-light align-self-center pr-3">StrongerU Inc.</span>
      </div>
    </nav>
  );
};


export default Footer;