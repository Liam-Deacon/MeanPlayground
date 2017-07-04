'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('meanPlaygroundApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
