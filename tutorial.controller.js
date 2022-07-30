const db = require("../models");
const Tutorial = db.tutoriais;

validaCamposRequeridosTutorial = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.title) {
        camposRequeridosEmpty.push("title");
    }
    if (!req.body.description) {
        camposRequeridosEmpty.push("description");
    }
    if (!req.body.published) {
        camposRequeridosEmpty.push("published");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosTutorial(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Tutorial."
            });
        });
};

// Procura por todas as entidades do tipo Tutorial
exports.findAll = (req, res) => {
    var condition = {};

    const title = req.query.title;
    if (title) {
        condition.title = { $regex: new RegExp(title), $options: "i" };
    }

    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Tutorial."
        });
      });
};

// Busca a entidade Tutorial por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Tutorial com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Tutorial com o id " + id + "."
        });
      });
};

// Altera uma entidade Tutorial
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosTutorial(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Tutorial com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Tutorial com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Tutorial com o id " + id + "."
        });
      });
};

// Remove a entidade Tutorial por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Tutorial com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Tutorial com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Tutorial com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Tutorial
exports.deleteAll = (req, res) => {

    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'Tutoriais' : 'Tutorial'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Tutorial."
        });
      });
};

// Procura por entidade Tutorial onde o campo booleano published seja true
exports.findAllPublished = (req, res) => {

    Tutorial.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Tutorial por published true."
        });
      });
};
