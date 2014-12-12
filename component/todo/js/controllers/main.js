'use strict';

angular.module('todoApp')
  .controller('TodoCtrl', function ($scope, Storage) {

    $scope.todos = Storage.get();
    var todos = $scope.todos;
    $scope.editedTodo = null;
    $scope.newTodo = '';

    $scope.addTodo = function () {
      var newTodo = $scope.newTodo.trim();
      if (newTodo.length > 0) {
        console.log(todos);
        todos.push({
          'title': newTodo,
          'completed': false
        });
        $scope.newTodo = '';
      }
    };

    $scope.$watch('todos', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        Storage.put(todos);
      }
    }, true);

    $scope.removeTodo = function (todo) {
      todos.splice(todos.indexOf(todo), 1);
    }
  });
