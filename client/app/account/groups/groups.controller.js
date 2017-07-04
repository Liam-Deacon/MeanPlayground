'use strict';
// @flow

export default class GroupsController {
  groups: Object[];

  /*@ngInject*/
  constructor() {
    // Use the User $resource to fetch all users
    this.groups = Group.query();
  }

  delete(group) {
    group.$remove();
    this.groups.splice(this.groups.indexOf(group), 1);
  }
}
