const db = require("../models");
const TipoMembroFamilia = db.tiposMembroFamilia;

validaCamposRequeridosTipoMembroFamilia = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade TipoMembroFamilia
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosTipoMembroFamilia(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a TipoMembroFamilia
    const tipoMembroFamilia = new TipoMembroFamilia({
        nome: req.body.nome ? req.body.nome : null
    });

    // Save TipoMembroFamilia in the database
    tipoMembroFamilia
        .save(tipoMembroFamilia)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar TipoMembroFamilia."
            });
        });
};

// Procura por todas as entidades do tipo TipoMembroFamilia
exports.findAll = (req, res) => {
    var condition = {};

    const nome = req.query.nome;
    if (nome) {
        condition.nome = { $regex: new RegExp(nome), $options: "i" };
    }

    TipoMembroFamilia.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar TipoMembroFamilia."
        });
      });
};

// Busca a entidade TipoMembroFamilia por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    TipoMembroFamilia.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade TipoMembroFamilia com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade TipoMembroFamilia com o id " + id + "."
        });
      });
};

// Altera uma entidade TipoMembroFamilia
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosTipoMembroFamilia(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    TipoMembroFamilia.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade TipoMembroFamilia com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade TipoMembroFamilia com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade TipoMembroFamilia com o id " + id + "."
        });
      });
};

// Remove a entidade TipoMembroFamilia por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    TipoMembroFamilia.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade TipoMembroFamilia com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade TipoMembroFamilia com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade TipoMembroFamilia com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade TipoMembroFamilia
exports.deleteAll = (req, res) => {

    TipoMembroFamilia.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'TiposMembroFamilia' : 'TipoMembroFamilia'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades TipoMembroFamilia."
        });
      });
};
