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
      <div style={{fontSize: 20}}>
        {this.props.tracking
          ?
          <button onClick={() => this.props.stopAction()}>Stop</button>
          :
          <div style={{width: 200, height: 100, display: 'flex', flexDirection: "column", alignItems: "flex-end", justifyContent: "space-evenly"}}>
            <div>
              <button style={{fontSize: 20}} onClick={() => this.props.startAction(this.state.timeLimit || this.props.defaultTimeLimit)}>
                Start
              </button>
            </div>
            <div>
              with
              <input
                type="text"
                style={{"width": 35, fontSize: 20, margin: 5}}
                value={this.state.timeLimit === 'default'
                  ? this.props.defaultTimeLimit
                  : this.state.timeLimit}
                onChange={(e) => (this.setState({timeLimit: e.target.value}))}
              />
              seconds limit
            </div>
          </div>
        }
        {/*<pre>
          {JSON.stringify(this.props.state, null, 2)}
        </pre>*/}
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
