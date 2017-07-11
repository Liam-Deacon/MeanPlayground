'use strict';

export default class ListController {
  items: Object[];

  /*@ngInject*/
  constructor(List) {
    // Use the User $resource to fetch all users
    this.items = List.query();
  }
}
