# flumpt-traveler

Time travel middleware for [mizchi/flumpt](https://github.com/mizchi/flumpt)

![travel](https://cloud.githubusercontent.com/assets/1403842/11760237/965cac98-a0d6-11e5-8029-0fa6b70a2d9c.gif)

[Try Demo](http://fand.github.io/flumpt-traveler/)

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
