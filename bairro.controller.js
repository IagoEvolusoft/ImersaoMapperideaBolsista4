const db = require("../models");
const Bairro = db.bairros;

validaCamposRequeridosBairro = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.cidade) {
        camposRequeridosEmpty.push("cidade");
    }
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    if (!req.body.cepPadrao) {
        camposRequeridosEmpty.push("cepPadrao");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Bairro
exports.create = (req, res) => {
    // Validate request
    if (!req.body.cidade) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosBairro(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Bairro
    const bairro = new Bairro({
        nome: req.body.nome ? req.body.nome : null,
        cepPadrao: req.body.cepPadrao ? req.body.cepPadrao : 0,
        ativo: req.body.ativo ? req.body.ativo : false
    });

    // Save Bairro in the database
    bairro
        .save(bairro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Bairro."
            });
        });
};

// Procura por todas as entidades do tipo Bairro
exports.findAll = (req, res) => {
    var condition = {};

    const cidade = req.query.cidade;
    if (cidade) {
        condition.cidade = { $regex: new RegExp(cidade), $options: "i" };
    }

    const nome = req.query.nome;
    if (nome) {
        condition.nome = { $regex: new RegExp(nome), $options: "i" };
    }

    Bairro.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Bairro."
        });
      });
};

// Busca a entidade Bairro por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Bairro.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Bairro com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Bairro com o id " + id + "."
        });
      });
};

// Altera uma entidade Bairro
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosBairro(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Bairro.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Bairro com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Bairro com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Bairro com o id " + id + "."
        });
      });
};

// Remove a entidade Bairro por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Bairro.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Bairro com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Bairro com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Bairro com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Bairro
exports.deleteAll = (req, res) => {

    Bairro.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'bairros' : 'Bairro'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Bairro."
        });
      });
};

// Procura por entidade Bairro onde o campo booleano ativo seja true
exports.findAllAtivo = (req, res) => {

    Bairro.find({ ativo: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Bairro por ativo true."
        });
      });
};
