'use strict';

import angular from 'angular';
import ListController from './list.controller';

export default angular.module('meanPlaygroundApp.list', [])
  .controller('ListController', ListController)
  .name;
