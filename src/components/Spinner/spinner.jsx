import React from 'react';
const loadingImg = "/loading.svg";

const Spinner = () => (
      <div className="spinner">
        <img src={loadingImg} alt="Loading..." />
      </div>
    );
 
export default Spinner;