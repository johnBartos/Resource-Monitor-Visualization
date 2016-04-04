//A higher-order reducer to enable reducers to respond to an array of actions
export default reducer => {
  return (state, action) => {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.reduce(reducer, state);

      default:
        return reducer(state, action);
    }
  };
};
