import React from "react";
import ReactDom from 'react-dom';

import "./modal.less";

const Modal = ({ open, children }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="Overlay">
      <div className="Modal">{children}</div>
    </div>, document.getElementById('portal')
  );
};

export default Modal;
