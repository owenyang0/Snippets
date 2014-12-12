'use strict';

angular.module('todoApp')
  .factory('Storage', function ($cookieStore) {

    var TODOS_ID = 'todo';

    return {
      put: function (todos) {
        // return $cookies.todo = JSON.stringify(todos);
        return $cookieStore.put(TODOS_ID, todos);
      },

      get: function () {
        // return JSON.parse($cookies.TODOS_ID || '[]');
        return $cookieStore.get(TODOS_ID) || [];
      }
    };
  });
