import React from "react";
import ReactDom from 'react-dom';

const Modal = ({ open, children, mclasses }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="Overlay">
      <div className={mclasses ? mclasses.modal : "Modal"}>{children}</div>
    </div>, document.getElementById('portal')
  );
};

export default Modal;
