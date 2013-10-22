var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage: 'img/ejs.png',
        title: 'No tite',
        author: 'Unkown',
        releaseDate: 'Unkown',
        keywords: 'None'
    },

    parse: function(response) {
        response.id = response._id;
        return response;
    }
});
