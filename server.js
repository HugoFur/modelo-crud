const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch(err => {
    console.log("Não foi possivel conectar ao banco de dados!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}.`);
});