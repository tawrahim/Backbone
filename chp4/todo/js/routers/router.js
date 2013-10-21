var Workspaces = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilters: function(param) {
        window.app.Todos.trigger('fiter');
    }
});

app.TodoRouter = new Workspaces();
Backbone.history.start();
