'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}

export default function UserServices($scope, $user) {
  'ngInject';

  var user = $user;
  var id = $user._id;

  var groups = function() {
    // query groups here
    return Group.query();
  }
  var lists = function() {
    // query lists here
    return List.query();
  }
  var locations = function() {
    // query locations here
    return Location.query();
  }

  // todo
  var currentGroup = undefined;
  var currentList = undefined;
}
