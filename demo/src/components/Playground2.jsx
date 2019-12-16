import React from "react";
import PropTypes from "prop-types";
import './Playground.css'

const Child1 = ({
  isGreaterThan2,
}) => {

  return (
    <div id='container2'>
      <h4> Test connectGetter </h4> 
      <h6>is it greater than 2 ?  {isGreaterThan2 ? "true" : "false"} </h6>
    </div>
  );
};

Child1.defaultProps = {
  children: undefined,
  isGreaterThan2: false,
};

Child1.propTypes = {
  children: PropTypes.node,
  isGreaterThan2: PropTypes.bool,
};

export default Child1;
