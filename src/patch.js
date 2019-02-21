import { withReducer } from 'recompose';


const loggedUseReduce = (stateName, dispatchName, reducer, initial) => (Component) => {
  const log = (state, action) => {
    console.log('previous state:', state);
    console.log(`${action.type}`, action.payload);
    const nextState = reducer(state, action);
    console.log('next state:', nextState);
    return nextState;
  };

  return withReducer(stateName, dispatchName, log, initial)(Component);
};

export default loggedUseReduce;
