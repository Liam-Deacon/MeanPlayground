'use strict';

import angular from 'angular';
import LocationsController from './locations.controller';

export default angular.module('meanPlaygroundApp.locations', [])
  .controller('LocationsController', LocationsController)
  .name;
