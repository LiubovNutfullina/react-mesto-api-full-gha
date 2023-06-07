import React from "react";
import "../blocks/footer/__copyright/footer__copyright.css";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
    </div>
  );
}

export default Footer;
