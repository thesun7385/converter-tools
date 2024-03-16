import PropTypes from "prop-types";
import "./Header.css";

function Header({ content, logoImg }) {
  return (
    <header className="content">
      <img src={logoImg} alt="" />
      <h1>{content}</h1>
    </header>
  );
}

// validate the type of the prop
Header.propTypes = {
  content: PropTypes.string.isRequired,
  logoImg: PropTypes.string.isRequired,
};

export default Header;
