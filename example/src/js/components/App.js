import * as React from 'react';
import { Flux }   from 'flumpt';
import Clicker    from './Clicker';

import { DebugPanel } from '../../../../src';

class App extends Flux {

  subscribe () {
    this.on('incrementAsync', () => {
      this.update(({ count, button }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              count : count + 1,
              button,
            });
          }, 1000);
        });
      });
    });
    this.on('incrementSync', () => {
      this.update(({ count, button }) => ({
        count : count + 1,
        button,
      }));
    });
  }

  render (state) {
    return (
      <div>
        <Clicker {...state}/>
        <DebugPanel />
      </div>
    );

  }

}

export default App;
