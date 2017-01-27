const initialState = {timeLimit: 120};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      const {timeLimit} = action

      return {
        timeLimit: Number.parseInt(timeLimit, 10)
      };

    default:
      return state;
  }
};
