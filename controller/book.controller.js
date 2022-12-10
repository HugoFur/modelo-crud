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
  
};

exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};