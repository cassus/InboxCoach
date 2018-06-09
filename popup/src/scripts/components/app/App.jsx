import React, {Component} from 'react'
import {connect} from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _timeLimit: 'default' // access with this.getTimeLimit()
    }
  }

  getTimeLimit() {
    return this.state._timeLimit === 'default'
    ? this.props.defaultTimeLimit
    : this.state._timeLimit
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.start()
    }
  }

  start() {
    this.props.startAction(this.getTimeLimit())
  }

  render() {
    return (
      <div style={{fontSize: 20}}>
        {this.props.tracking
          ?
          <div>
            <button onClick={() => this.props.stopAction()}>Stop</button>
            {this.getTimeLimit()} seconds limit
          </div>
          :
          <div style={{width: 200, height: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
            <div>
              <button style={{fontSize: 20}} onClick={() => this.start()}>
                Start
              </button>
            </div>
            <div>
              with
              <input
                type="text"
                style={{'width': 35, fontSize: 20, margin: 5}}
                value={this.getTimeLimit()}
                onChange={(e) => this.setState({_timeLimit: e.target.value})}
                onKeyPress={(e) => this.handleKeyPress(e)}
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
    type: 'STOP_TRACKING'
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    tracking: state.tracking,
    defaultTimeLimit: state.settings && state.settings.timeLimit || 0
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAction: (timeLimit) => dispatch(startAction(timeLimit)),
  stopAction: () => dispatch(stopAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
