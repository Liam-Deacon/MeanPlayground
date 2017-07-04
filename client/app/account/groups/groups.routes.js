'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('groups', {
    url: '/groups',
    template: require('./groups.html'),
    controller: 'GroupsController',
    controllerAs: 'vm',
    authenticate: true
  });
}
