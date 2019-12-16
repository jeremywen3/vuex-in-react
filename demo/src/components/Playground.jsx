import React from "react";
import PropTypes from "prop-types";

const Child1 = ({
  test,
  myCount,
  limitCount,
  isGreaterThan2,
  onIncrement,
  onIncrementAsync,
  children
}) => {
  function handleInc() {
    if (onIncrement) {
      onIncrement();
    }
  }

  function handleIncAsync() {
    if (onIncrementAsync) {
      onIncrementAsync().then(console.log);
    }
  }

  return (
    <div style={{ backgroundColor: "grey", padding: "20px" }}>
      Current count is {myCount !== undefined && `${myCount} `}
      <div>
        {handleInc && (
          <button type="button" onClick={handleInc}>
            Test + 1 count
          </button>
        )}
        {handleIncAsync && (
          <button type="button" onClick={handleIncAsync}>
            Test + 1 count async
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
  onIncrementAsync: undefined
};

Child1.propTypes = {
  children: PropTypes.node,
  isGreaterThan2: PropTypes.bool,
  limitCount: PropTypes.number,
  myCount: PropTypes.number,
  test: PropTypes.number,
  onIncrement: PropTypes.func,
  onIncrementAsync: PropTypes.func
};

export default Child1;
