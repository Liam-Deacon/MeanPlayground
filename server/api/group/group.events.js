/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var GroupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GroupEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Group) {
  for(var e in events) {
    let event = events[e];
    Group.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    GroupEvents.emit(`${event}:${doc._id}`, doc);
    GroupEvents.emit(event, doc);
  };
}

export {registerEvents};
export default GroupEvents;
