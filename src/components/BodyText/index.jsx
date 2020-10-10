import React from 'react';
import "./bodyStyle.css";

const BodyText = (props) => {

  if (props.children){
    return ( 
      <div className="BodyText">
        {props.children}
      </div>
     );
  }
  return ( 
    <div className="BodyText">
      <p>{props.children}</p>
      <pre>paragraph not included</pre>
    </div>
   );

}
 
export default BodyText;