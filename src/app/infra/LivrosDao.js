class LivrosDao {

    constructor(db) {
        this._db = db;
    }

    listar() {

        return new Promise((resolve, reject) => {

            this._db.all(
                'SELECT * FROM livros',
                (erro, resultado) => {
                    if (erro) return reject('Não foi possível consultar os livros');

                    return resolve(resultado);
                }
            );
        });
    }

    adicionar(livro) {

        return new Promise((resolve, reject) => {

            this._db.run(`
                INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (erro) => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível salvar o livro');
                    }
                    return resolve();
                }
            )
        });
    }

    buscarPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualizar(livro) {

        return new Promise((resolve, reject) => {

            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (erro) => {
                    if (erro) {
                        console.log(erro);
                        return reject(`Não foi possível atualizar o livro /n ${livro}`);
                    }

                    return resolve();
                }
            )
        });
    }

    remover(id) {

        return new Promise((resolve, reject) => {

            this._db.run(`
                DELETE 
                FROM livros
                WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível remover o livro');
                    }

                    return resolve();
                }
            );
        });
    }

}

module.exports = LivrosDao;