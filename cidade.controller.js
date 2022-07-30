const db = require("../models");
const Cidade = db.cidades;

validaCamposRequeridosCidade = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.uf) {
        camposRequeridosEmpty.push("uf");
    }
    if (!req.body.codigo) {
        camposRequeridosEmpty.push("codigo");
    }
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Cidade
exports.create = (req, res) => {
    // Validate request
    if (!req.body.uf) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCidade(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Cidade
    const cidade = new Cidade({
        uf: req.body.uf ? req.body.uf.id : null,
        codigo: req.body.codigo ? req.body.codigo : 0,
        nome: req.body.nome ? req.body.nome : null,
        ativo: req.body.ativo ? req.body.ativo : false,
        issPadrao: req.body.issPadrao ? req.body.issPadrao : 0.0
    });

    // Save Cidade in the database
    cidade
        .save(cidade)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Cidade."
            });
        });
};

// Procura por todas as entidades do tipo Cidade
exports.findAll = (req, res) => {
    var condition = {};

    const uf = req.query.uf;
    if (uf) {
        condition.uf = { $regex: new RegExp(uf), $options: "i" };
    }

    const nome = req.query.nome;
    if (nome) {
        condition.nome = { $regex: new RegExp(nome), $options: "i" };
    }

    Cidade.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cidade."
        });
      });
};

// Busca a entidade Cidade por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Cidade.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Cidade com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Cidade com o id " + id + "."
        });
      });
};

// Altera uma entidade Cidade
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCidade(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Cidade.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cidade com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Cidade com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Cidade com o id " + id + "."
        });
      });
};

// Remove a entidade Cidade por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Cidade.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cidade com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Cidade com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Cidade com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Cidade
exports.deleteAll = (req, res) => {

    Cidade.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'cidades' : 'Cidade'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Cidade."
        });
      });
};

// Procura por entidade Cidade onde o campo booleano ativo seja true
exports.findAllAtivo = (req, res) => {

    Cidade.find({ ativo: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cidade por ativo true."
        });
      });
};
