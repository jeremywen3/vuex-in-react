import React from "react";
import PropTypes from "prop-types";
import './Playground.css'

const Child1 = ({
  test,
  myCount,
  limitCount,
  isGreaterThan2,
  onIncrement,
  onIncrementAsync,
  onDecrement,
  children
}) => {
  function handleInc() {
    if (onIncrement) {
      onIncrement();
    }
  }

  function handleDec() {
    if (onDecrement) {
      onDecrement();
    }
  }

  function handleIncAsync() {
    if (onIncrementAsync) {
      onIncrementAsync().then(console.log);
    }
  }

  return (
    <div id='container'>
      <h4> Test connect  </h4> 
      <h6>Current count = {myCount !== undefined && `${myCount} `} </h6>
      <h6>is it greater than 2 ?  {isGreaterThan2 ? "true" : "false"} </h6>
      <div>
        {handleInc && (
          <button className="button" onClick={handleInc}>
            +1 count
          </button>
        )}
        {handleDec && (
          <button className="button" onClick={handleDec}>
            -1 count
          </button>
        )}
        {handleIncAsync && (
          <button className="button" onClick={handleIncAsync}>
            +1 count async
          </button>
        )}
      </div>
    </div>
  );
};

Child1.defaultProps = {
  children: undefined,
  isGreaterThan2: false,
  limitCount: 2,
  myCount: 0,
  test: undefined,
  onIncrement: undefined,
  onDecrement: undefined,
  onIncrementAsync: undefined
};

Child1.propTypes = {
  children: PropTypes.node,
  isGreaterThan2: PropTypes.bool,
  limitCount: PropTypes.number,
  myCount: PropTypes.number,
  test: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onIncrementAsync: PropTypes.func
};

export default Child1;
