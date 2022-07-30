const db = require("../models");
const Pais = db.paises;

validaCamposRequeridosPais = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.sigla) {
        camposRequeridosEmpty.push("sigla");
    }
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Pais
exports.create = (req, res) => {
    // Validate request
    if (!req.body.sigla) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPais(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Pais
    const pais = new Pais({
        sigla: req.body.sigla ? req.body.sigla : null,
        nome: req.body.nome ? req.body.nome : null,
        ativo: req.body.ativo ? req.body.ativo : false
    });

    // Save Pais in the database
    pais
        .save(pais)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Pais."
            });
        });
};

// Procura por todas as entidades do tipo Pais
exports.findAll = (req, res) => {
    var condition = {};

    const sigla = req.query.sigla;
    if (sigla) {
        condition.sigla = { $regex: new RegExp(sigla), $options: "i" };
    }

    Pais.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pais."
        });
      });
};

// Busca a entidade Pais por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Pais.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Pais com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Pais com o id " + id + "."
        });
      });
};

// Altera uma entidade Pais
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPais(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Pais.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pais com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Pais com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Pais com o id " + id + "."
        });
      });
};

// Remove a entidade Pais por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Pais.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pais com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Pais com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Pais com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Pais
exports.deleteAll = (req, res) => {

    Pais.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'Paises' : 'Pais'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Pais."
        });
      });
};

// Procura por entidade Pais onde o campo booleano ativo seja true
exports.findAllAtivo = (req, res) => {

    Pais.find({ ativo: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pais por ativo true."
        });
      });
};
