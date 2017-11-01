import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeLimit: 'default'
    }
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', flexDirection: "row", justifyContent: "flex-end"}}>
          {this.props.tracking
            ?
            <button onClick={() => this.props.stopAction()}>Stop</button>
            :
            <div>
              <button onClick={() => this.props.startAction(this.state.timeLimit || this.props.defaultTimeLimit)}>
                Start
              </button>
              with
              <input
                type="text"
                style={{"width": 20}}
                value={this.state.timeLimit === 'default'
                  ? this.props.defaultTimeLimit
                  : this.state.timeLimit}
                onChange={(e) => (this.setState({timeLimit: e.target.value}))}
              />
              seconds limit
            </div>
          }
        </div>
        <pre>
          {JSON.stringify(this.props.state, null, 2)}
        </pre>
      </div>
    )
  }

}

function startAction(timeLimit) {
  return {
    type: 'INITIATE_TRACKING',
    timeLimit
  }
}

function stopAction() {
  return {
    type: 'STOP_TRACKING',
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    tracking: state.tracking,
    defaultTimeLimit: state.settings && state.settings.timeLimit || 0,
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAction: (timeLimit) => dispatch(startAction(timeLimit)),
  stopAction: () => dispatch(stopAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
