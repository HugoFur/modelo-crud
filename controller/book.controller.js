const db = require("../models");
const Book = db.books;

exports.create = (req, res) => {

  // validação de requisições
  if (!req.body.title) {
    res.status(400).send({ message: "O conteudo da requisição não pode ser vazio" });
    return;
  }

  // Função para criação de novo Book
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    published: req.body.published ? req.body.published : false
  });

  // função para salvar book no banco de dados
  book
    .save(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro durante a criação do Livro"
      });
    });
};

exports.findAll = (req, res) => {
  // Recuperar objetos (com condição)
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Book.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao recuperar os livros"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  //Encontre um único livro com um id
  Book.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado o livro com o id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Ocorreu um erro ao buscar o livro com id=" + id });
    });
};

exports.update = (req, res) => {
  // Atualize um livro identificado por na id na solicitação
  if (!req.body) {
    return res.status(400).send({
      message: "Os dados a se atualizar não podem estar vazios!"
    });
  }

  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não podemos atualizar o livro com id=${id}. Pode nãp ter sido encontrado!`
        });
      } else res.send({ message: "Livro atualizado com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocorreu um erro ao atualizar o livro de id=" + id
      });
    });
};

exports.delete = (req, res) => {
  //Excluir um livro com o id especificado
  const id = req.params.id;

  Book.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Sem exito a deletar livro de id=${id}. Pode não ter sido encontrado!`
        });
      } else {
        res.send({
          message: "Livro deletado com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel deletar livro com id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  //Exclua todos os livros do banco de dados
  Book.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Livros deletados com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu durante a remoção dos livros"
      });
    });
};

exports.findAllPublished = (req, res) => {
  //Encontre todos os livros com published = true
  Book.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu durante a busca do livro"
      });
    });
};