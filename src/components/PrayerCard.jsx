import React from 'react';
import { TitleText, BodyText, Button } from "./index";
const PrayWithUs = () => {
  return ( 
    <div className="PrayWithUs">
      <TitleText>PRAY WITH US</TitleText>
      <BodyText>
        <p>The Restoration is a growing family of 
        Catholics who support the Institute's mission
        to spread the reign of our Lord Jesus Christ in
        all spheres of human life.</p>
        <p>The most fundamental means of this support
          is praying the Memorare everyday.
        </p>
        <p>
          When you join The Restoration we will send
          you a new Memorare prayer card every season
          to remind you of your critical role in this
          divine mission.
        </p>
        <p>Will you pray the Memorare with us daily?</p>
          <p>{"  "}</p>
        <Button text="YES, PLEASE SEND ME MY FIRST PRAYER CARD!" handleClick={() => console.log('Prayer Card -> click')} />
      </BodyText>
    </div>
   );
}

export default PrayWithUs;