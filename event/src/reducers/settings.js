const initialState = {timeLimit: '2'}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      const {timeLimit} = action

      return {
        timeLimit: timeLimit
      }

    default:
      return state
  }
}
