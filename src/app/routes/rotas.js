const db = require('../../config/database');
const LivrosDao = require('../infra/LivrosDao');

module.exports = (app) => {

    app.get('/', function (req, resp) {

        resp.send(`
            <!DOCTYPE html>
                <html lang="pt-br">
            <head>
                <meta charset="UTF-8">   
                <title>Home</title>
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
            </html>
        `);
    });

    app.get('/livros', function (req, resp) {

        const livrosDao = new LivrosDao(db);

        livrosDao
            .listar()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    Livros: livros
                })
            )
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function (req, resp) {

        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', function (req, resp) {

        const id = req.params.id;
        const livroDao = new LivrosDao(db);

        livroDao
            .buscarPorId(id)
            .then(livro =>
                resp.marko(require('../views/livros/form/form.marko'), { livro: livro })
            )
            .catch(erro => console.log(erro));
    });

    app.post('/livros', function (req, resp) {

        const livrosDao = new LivrosDao(db);

        livrosDao
            .adicionar(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', function (req, resp) {

        const livrosDao = new LivrosDao(db);

        livrosDao
            .atualizar(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function (req, resp) {

        const id = req.params.id;

        const livrosDao = new LivrosDao(db);
        livrosDao
            .remover(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));


    });
}