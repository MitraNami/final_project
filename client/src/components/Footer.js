import 'style/logo.css';

const Footer = () => {

  return (
    <nav className="bg-dark mt-5">
      <div className="d-flex flex-row justify-content-between">

        <img src="https://res.cloudinary.com/dxc1pdflu/image/upload/v1606716109/social_media_tuxjvk.png" alt="social media" useMap="#social_media" />
        <map name="social_media">
          <area target="_blank" alt="facebook" href="https://www.facebook.com/" coords="42,26,20" shape="circle" />
          <area target="_blank" alt="tweeter" href="https://twitter.com/" coords="95,10,77,31,98,46,118,14" shape="poly" />
          <area target="_blank" alt="instagram" href="https://www.instagram.com/" coords="148,28,19" shape="circle" />
        </map>

        <span className="text-light align-self-center pr-3">StongorU Inc.</span>
      </div>
    </nav>
  );
};


export default Footer;