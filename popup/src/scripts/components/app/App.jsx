import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={{"display": 'flex', "flex-direction": "row", "justify-content": "flex-end"}}>
          {this.props.tracking
            ?
            <button onClick={() => this.props.stopAction()}>Stop</button>
            :
            <button onClick={() => this.props.startAction()}>Start</button>
          }
        </div>
        <pre>
          {JSON.stringify(this.props.state, null, 2)}
        </pre>
      </div>
    );
  }

}

function startAction() {
  return {
    type: 'INITIATE_TRACKING',
  };
}

function stopAction() {
  return {
    type: 'STOP_TRACKING',
  };
}

const mapStateToProps = (state) => ({
  state: state,
  tracking: state.tracking
})

const mapDispatchToProps = (dispatch) => ({
  startAction: () => dispatch(startAction()),
  stopAction: () => dispatch(stopAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
