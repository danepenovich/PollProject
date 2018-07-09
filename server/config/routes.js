let Users = require("../controllers/users"),
    Polls = require("../controllers/polls"),
    Options = require("../controllers/options"),
    path = require("path")

module.exports = function(app){
    app.post('/users', Users.create);
    app.delete('/users', Users.logout);
    app.get('/session', Users.session);

    app.post('/polls', Polls.create);
    app.get('/polls', Polls.index);
    app.get('/polls/:id', Polls.show);
    app.delete('/polls/:id', Polls.destroy);

    app.get('/options/:id', Options.show);
    app.put('/options/:id', Options.update);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("../client/dist/index.html"))
    })
}