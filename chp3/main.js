"use strict";

var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        abu: '',
        completed: false
    },

    validate: function(attribs){
        if (attribs.tittle === undefined){
            return "Remeber to set your todo";
        }
    },

    initialize: function() {
        console.log('This model has been initailized');
        this.on('change:title', function(){
            console.log('-Values for this model has changed');
        }),

        this.on('invalid', function(model, error) {
            console.log(error);
        });
    }
});

var TodosCollection = Backbone.Collection.extend({
    model: Todo
});

var todo1 = new Todo({title: 'Read the whole book', id: 2});

console.log(JSON.stringify(todo1));

var todo2 = new Todo({
    title: 'check the attributes of both model instances',
    completed: true
});

var TodosCollection = new Backbone.Collection();

TodosCollection.on("add", function(todo){
    console.log("I should " + todo.get("title") + ". Have I done it before? "
        + (todo.get("completed") ? 'Yeah!' : 'No'));
});

TodosCollection.add([
        {title: 'go to jamkay', completed: false },
        {title: 'go to china', completed: false },
        {title: 'go to europe', completed: true }
]);


console.log(JSON.stringify(todo2));

var TodoView = Backbone.View.extend({

    tagName: 'li',
    id: 'todos',
    className: 'container',

    todoTpl: _.template("An exammple template"),

    events: {
        'dbclick label':  'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit'   :  'close'
    },

    // Render title to the todo item
    render: function(){
        this.$el.html(this.todoTpl(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    edit: function() {
    },

    updateOnEnter: function(){
    },

    close: function(){
    }
});

var todoView = new TodoView();
console.log(todoView.el);

var ListView = Backbone.View.extend({
    render: function(){
        var items = this.model.get('items');

        _.each(items, function(item){
            var itemView = new ItemView({model: item});
            this.$el.append(itemView.render().el);
        }, this);
    }
});

var ItemView = Backbone.View.extend({
    events: {},
    render: function(){
        this.$el.html(this.model.toJSON());
        return this;
    }
});

var View = Backbone.View.extend({

    el: '#todo',

    events: {
        'click [type="checkbox"]': 'clicked'
    },

    initialize: function() {
        this.$el.click(this.jqueryClicked);

        this.on('apiEvent', this.callback);
    },

    clicked: function(event){
        console.log("event handler for " + this.el.outerHTML);
        this.trigger('apiEvent', event.type);
    },

    jqueryClicked: function(event){
        console.log("jQuery handler for " + this.outerHTML);
    },

    callback: function(eventType){
        console.log("event type was " + eventType);
    }
});

var view = new View();

var TodoRuter = Backbone.Router.extend({
    routes: {
        "about"      : "showAbout",
        "todo/:id"   : "getTodo",
        "search/:query" : "searchTodos",
        "search/:query/p:page" : "searchTodos",
        "todos/:id/download/*doocumentPath" : "downloadDcument",
        "*other" : "defaultRoute",
        "optional(/:item)" : "optinalItem",
        "named/optional/(y:z)" : "namedOptionalItem"
    },

    showAbout: function(){
    },

    getTodo: function(id){
        console.log("You are trying to reach todo " + id);
    },

    searchTodos: function(query, page){
        var page_number = page || 1;
        console.log("Page number: " + page_number + " of the results " +
                "containing the word: " + query);
    },

    downloadDocument: function(other){
        console.log("Invalid. You attempted to reach:" + other);
    }
});

var myTodoRouter = new TodoRuter();
Backbone.history.start();

