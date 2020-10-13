import React from 'react';

const TitleText = (props) => {
  return ( 
    <div className="TitleText">
      <h2>{props.children}</h2>
    </div>
   );
}
 
export default TitleText;