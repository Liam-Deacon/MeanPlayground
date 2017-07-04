'use strict';

import angular from 'angular';
import GroupsController from './groups.controller';

export default angular.module('meanPlaygroundApp.groups', [])
  .controller('GroupsController', GroupsController)
  .name;
