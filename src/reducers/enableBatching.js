// A higher-order reducer to enable the passed reducer to respond to an array of actions and produce a single state
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
