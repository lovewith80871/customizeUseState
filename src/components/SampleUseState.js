import React from 'react';
import { render } from 'react-dom';
let memoizedState = [];
let cursor = 0;
const useState = (initialValue) => {
  if (typeof initialValue === 'function') {
    memoizedState[cursor] = memoizedState[cursor] || initialValue();
  } else {
    memoizedState[cursor] = memoizedState[cursor] || initialValue;
  }
  const currentCursor = cursor;
  const callback = (newState) => {
    if (typeof newState === 'function') {
      memoizedState[currentCursor] = newState(memoizedState[currentCursor]);
    } else {
      memoizedState[currentCursor] = newState;
    }
    cursor = 0;
    render(<SampleUseState />, document.getElementById('root'));
  };
  return [memoizedState[cursor++], callback];
};
const expensive = () => {
  console.log('expensive');
  return 0;
};
const SampleUseState = () => {
  const [count, setCount] = useState(() => expensive());
  const clickHandler = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => clickHandler()}>Click me</button>
    </div>
  );
};

export default SampleUseState;
