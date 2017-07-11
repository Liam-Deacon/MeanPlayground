'use strict';

export default class LocationsController {
  items: Object[];

  /*@ngInject*/
  constructor(Locations) {
    // Use the User $resource to fetch all users
    this.items = Locations.query();
  }
}
