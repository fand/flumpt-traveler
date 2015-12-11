import * as React    from 'react';
import { Component } from 'flumpt';

import { emitter, getState } from './traveler';

const panelStyle = {
  position   : 'fixed',
  top        : 0,
  right      : 0,
  width      : '300px',
  height     : '100%',
  padding    : '10px',
  background : '#246',
  color      : 'white',
};

const committedStateStyle = {
  color : '#FFFF99',
};

export class DebugPanel extends Component {

  constructor () {
    super();
    this.state = getState();
    emitter.emit('registerPanel', this);
    emitter.on('update', () => {
      this.setState(getState());
    })
  }

  renderHeader () {
    return (
      <div>
        <button onClick={() => emitter.emit('undo')}>Undo</button>
        <button onClick={() => emitter.emit('redo')}>Redo</button>
        <button onClick={() => emitter.emit('commit')}>Commit</button>
      </div>
    );
  }

  renderCommitted () {
    return (
      <div>
        <h2>commited</h2>
        <ul style={committedStateStyle}>
          <li>{JSON.stringify(this.state.committed)}</li>
        </ul>
      </div>
    );
  }

  renderStates () {
    const { states, undoCount } = this.state;
    const renderedStates = states.map((s, i) => {
      const style = {
        color: (i < states.length - undoCount) ? 'white' : 'gray',
      };
      return (
        <li key={i} style={style}>
          {JSON.stringify(s)}
        </li>
      );
    });

    return (
      <div>
        <h2>History</h2>
        <ul>
          {renderedStates}
        </ul>
      </div>
    );
  }

  render () {
    return  (
      <div style={panelStyle}>
        {this.renderHeader()}
        {this.renderCommitted()}
        {this.renderStates()}
      </div>
    );
  }

}

export default DebugPanel;
