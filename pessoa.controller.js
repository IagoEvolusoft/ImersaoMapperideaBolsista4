const db = require("../models");
const Pessoa = db.pessoas;

validaCamposRequeridosPessoa = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.documento) {
        camposRequeridosEmpty.push("documento");
    } else {
        if (!req.body.documento.numero) {
            camposRequeridosEmpty.push("documento.numero");
        }
        if (!req.body.documento.tipo) {
            camposRequeridosEmpty.push("documento.tipo");
        }
    }
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    if (!req.body.endereco) {
        camposRequeridosEmpty.push("endereco");
    } else {
        if (!req.body.endereco.uf) {
            camposRequeridosEmpty.push("endereco.uf");
        }
        if (!req.body.endereco.cidade) {
            camposRequeridosEmpty.push("endereco.cidade");
        }
        if (!req.body.endereco.bairro) {
            camposRequeridosEmpty.push("endereco.bairro");
        }
        if (!req.body.endereco.logradouro) {
            camposRequeridosEmpty.push("endereco.logradouro");
        }
        if (!req.body.endereco.numero) {
            camposRequeridosEmpty.push("endereco.numero");
        }
        if (!req.body.endereco.pontoReferencia) {
            camposRequeridosEmpty.push("endereco.pontoReferencia");
        } else {
            if (!req.body.endereco.pontoReferencia.tipo) {
                camposRequeridosEmpty.push("endereco.pontoReferencia.tipo");
            }
            if (!req.body.endereco.pontoReferencia.nome) {
                camposRequeridosEmpty.push("endereco.pontoReferencia.nome");
            }
        }
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Pessoa
exports.create = (req, res) => {
    // Validate request
    if (!req.body.documento) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPessoa(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Pessoa
    const pessoa = new Pessoa({
        nome: req.body.nome ? req.body.nome : null,
        dataNascimento: req.body.dataNascimento ? req.body.dataNascimento : null,
        ativo: req.body.ativo ? req.body.ativo : false,
        negativada: req.body.negativada ? req.body.negativada : false
    });

    // Save Pessoa in the database
    pessoa
        .save(pessoa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Pessoa."
            });
        });
};

// Procura por todas as entidades do tipo Pessoa
exports.findAll = (req, res) => {
    var condition = {};

    const documento = req.query.documento;
    if (documento) {
        condition.documento = { $regex: new RegExp(documento), $options: "i" };
    }

    const nome = req.query.nome;
    if (nome) {
        condition.nome = { $regex: new RegExp(nome), $options: "i" };
    }

    const dataNascimento = req.query.dataNascimento;
    if (dataNascimento) {
        condition.dataNascimento = { $regex: new RegExp(dataNascimento), $options: "i" };
    }

    Pessoa.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pessoa."
        });
      });
};

// Busca a entidade Pessoa por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Pessoa.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Pessoa com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Pessoa com o id " + id + "."
        });
      });
};

// Altera uma entidade Pessoa
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPessoa(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Pessoa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pessoa com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Pessoa com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Pessoa com o id " + id + "."
        });
      });
};

// Remove a entidade Pessoa por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Pessoa.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pessoa com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Pessoa com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Pessoa com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Pessoa
exports.deleteAll = (req, res) => {

    Pessoa.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'Pessoas' : 'Pessoa'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Pessoa."
        });
      });
};

// Procura por entidade Pessoa onde o campo booleano ativo seja true
exports.findAllAtivo = (req, res) => {

    Pessoa.find({ ativo: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pessoa por ativo true."
        });
      });
};

// Procura por entidade Pessoa onde o campo booleano negativada seja true
exports.findAllNegativada = (req, res) => {

    Pessoa.find({ negativada: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pessoa por negativada true."
        });
      });
};
