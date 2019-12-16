import React from "react";
import './Playground.css'

type Props = {
  myCount: number,
  isGreaterThan2: boolean,
  onIncrement: Function,
  onIncrementAsync: Function,
  onDecrement: Function,
}

const Playground = ({
  myCount,
  isGreaterThan2,
  onIncrement,
  onIncrementAsync,
  onDecrement,
}: Props) => {
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

export default Playground;
