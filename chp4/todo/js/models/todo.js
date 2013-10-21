var app = app || {}

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    // Toggle the completed state of the todo item
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});
