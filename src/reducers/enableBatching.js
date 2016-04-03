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
