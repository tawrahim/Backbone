var Todo = Backbone.Model.extend({
    //default todo attribute values
    defaults: {
        title: '',
        completed: false
    }
});

//Instantiate the Todo Model
var myTodo = new Todo({
    title: 'check the attribute of logged models in console'
});

var TodoView = Backbone.View.extend({
    tagName: 'li',
    todoTpl: _.template( $('#item-template').html() ),
    events: {
        'dbclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit':     'close'
    },

    initialize: function () {
        this.$el = $('#todo');
    },

    render: function() {
        this.$el.html( this.todoTpl(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    edit: function() {
    },

    close: function() {
    },

    updateOnEnter: function(e) {
    }
});

