import * as React from 'react';
import { EventEmitter } from 'events';

export const emitter = new EventEmitter();

/**
 * Traveler internals
 */

let app    = null;
let panels = [];

let committed   = null;
let current     = null;
let states      = [];
let undoCount   = 0;
let lastState   = null;
let isTraveling = false;

export const getState = () => {
  return {
    states,
    undoCount,
    committed,
  };
};

/**
 * Middleware
 */

export const bindApp = (_app) => {
  app = _app;
};

export const traveler = (promiseOrState) => {
  if (promiseOrState instanceof Promise) {
    return promiseOrState.then(travelReducer);
  }
  else {
    return travelReducer(promiseOrState);
  }
};

const travelReducer = (state) => {
  if (isTraveling) {
    isTraveling = false;
  }
  else {
    // Remove undoed states
    if (undoCount !== 0) {
      states.splice(- undoCount);
    }

    lastState = state;
    undoCount = 0;

    if (committed === null) {
      committed = state;
    }
    else {
      states.push(state);
    }
  }

  current = states[states.length - 1 - undoCount] || committed;
  return current;
};

/**
 * Listeners for DebugPanel
 */

const updatePanels = () => {
  isTraveling = true;
  emitter.emit('update');
  app.update(x => x);
};

emitter.on('undo', () => {
  undoCount = Math.min(undoCount + 1, states.length);
  updatePanels();
});

emitter.on('redo', () => {
  undoCount = Math.max(undoCount - 1, 0);
  updatePanels();
});

emitter.on('commit', () => {
  committed = states[states.length - 1 - undoCount] || committed;
  states    = [];
  undoCount = 0;
  updatePanels();
});

emitter.on('registerPanel', (panel) => {
  panels.push(panel);
});
