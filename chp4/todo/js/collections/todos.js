var app = app || {};

var TodoList = Backbone.Collection.extend({

    // refrence to this collection's mdel
    model: app.Todo,

    // save all the todo items under "todos-backbone" namespace
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished
    completed: function() {
        return this.filter(function(todo) {
            return todo.get('completed');
        });
    },

    // filter the list doen to only todo items that are still nt finished
    remaining: function() {
        return this.without.apply(this, this.completed());
    },

    // generate the next order number for the new item
    nextOrder: function() {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their riginal insertion order
    comparator: function(todo) {
       return todo.get('order');
    }
});

app.Todos = new TodoList();
