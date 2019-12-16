import React from "react";
import './Playground.css'

type Props = {
  isGreaterThan2: boolean,
}

const Playground = ({
  isGreaterThan2,
}: Props) => {

  return (
    <div id='container2'>
      <h4> Test connectGetter </h4>
      <h6>is it greater than 2 ?  {isGreaterThan2 ? "true" : "false"} </h6>
    </div>
  );
};


export default Playground;
