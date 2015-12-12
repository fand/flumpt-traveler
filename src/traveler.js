import * as React from 'react';
import { EventEmitter } from 'events';

export const emitter = new EventEmitter();

/**
 * Traveler internals
 */

let app    = null;
let panels = [];

let committedState = null;
let states         = [];
let undoCount      = 0;
let isTraveling    = false;

const getCurrentState = () => {
  return states[states.length - 1 - undoCount] || committedState;
};

export const getState = () => {
  return {
    states,
    undoCount,
    committedState,
  };
};

/**
 * Middleware
 */

const travelReducer = (state) => {
  if (isTraveling) {
    isTraveling = false;
  }
  else {
    // Remove undoed states
    if (undoCount !== 0) {
      states.splice(-undoCount);
    }

    undoCount = 0;

    if (committedState === null) {
      committedState = state;
    }
    else {
      states.push(state);
    }
  }

  return getCurrentState();
};

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
  committedState = getCurrentState();
  states         = [];
  undoCount      = 0;
  updatePanels();
});

emitter.on('registerPanel', (panel) => {
  panels.push(panel);
});
