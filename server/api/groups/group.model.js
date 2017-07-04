'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './group.events';

var GroupSchema = new mongoose.Schema({
  name: String,
  info: String,
  admin: Array,
  members: Array,
  active: Boolean
});

registerEvents(GroupSchema);
export default mongoose.model('Group', GroupSchema);
