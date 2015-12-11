# flumpt-traveler

Time travel middleware for [mizchi/flumpt](https://github.com/mizchi/flumpt)

![2015-12-11 23 08 02](https://cloud.githubusercontent.com/assets/1403842/11745548/4830d80c-a05c-11e5-912f-34ebfe29002a.png)
[DEMO](http://fand.github.io/flumpt-traveler/)

## Usage

Load traveler as middleware:

```js
import App from './components/App';

import { traveler, bindApp } from 'flumpt-traveler';

const app = new App({
  renderer,
  initialState,
  middlewares : [
    traveler,
  ],
});

bindApp(app);

app.update(x => x);
```

...then add DebugPanel to your App:

```js
import * as React from 'react';
import { Flux }   from 'flumpt';
import Wrapper    from './Wrapper';

import { DebugPanel } from 'flumpt-traveler';

class App extends Flux {

  subscribe () { ... }

  render (state) {
    return (
      <div>
        <Wrapper {...state}/>
        <DebugPanel />
      </div>
    );
  }

}

export default App;
```

## LICENSE

MIT
