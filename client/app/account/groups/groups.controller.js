'use strict';

var emptyGroup = {
  	name: '',
  	info: '',
  	admin: [],
  	members: []
  };

// @flow
export default class GroupsController {
  $http;
  socket;
  groups = [];
  newGroup = emptyGroup;
  
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('group');
    });
  }

  $onInit() {
    this.$http.get('/api/groups')
      .then(response => {
        this.groups = response.data;
        this.socket.syncUpdates('group', this.groups);
      });
  }

  addGroup() {
    if(this.newGroup) {
      this.$http.post('/api/groups', newGroup);
      this.newGroup = emptyGroup;
    }
  }

  deleteGroup(group) {
    this.$http.delete(`/api/groups/${group._id}`);
  }

}
