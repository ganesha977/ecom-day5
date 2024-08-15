import { Link } from "react-router-dom";

const Footer = () => {
  return (
  <div className="footer">
    <div
      className="text-center p-3">
    <h1 style={{textTransform:"uppercase"}}>all rights reserved &copy; rahul kallur </h1>
    </div>
    <div className="text-center mt-3 ">
      <Link to="/policy">policy</Link>
      <Link to="/about">about</Link>

      <Link to="/contact">policy</Link>
    </div>
  </div>
  )
};

export default Footer;
