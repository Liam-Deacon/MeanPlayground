'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './list.events';

var ListSchema = new mongoose.Schema({
  name: String,
  comment: String,
  userID: String,
  items: Array,
  active: Boolean,
  groups: Array,
  timeout: Number

});

registerEvents(ListSchema);
export default mongoose.model('List', ListSchema);
