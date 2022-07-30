module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
  documento: {
      numero: String,
      tipo: String
  },
      nome: String,
  endereco: {
// Unidade Federativa ou Provincia de um País
  uf: {
  pais: {
      sigla: String,
      nome: String,
      ativo: Boolean
  },
      sigla: String,
      nome: String,
      ativo: Boolean
  },
  cidade: {
// Unidade Federativa ou Provincia de um País
  uf: {
  pais: {
      sigla: String,
      nome: String,
      ativo: Boolean
  },
      sigla: String,
      nome: String,
      ativo: Boolean
  },
      codigo: Number,
      nome: String,
      ativo: Boolean,
      bairros: Bairro,
      issPadrao: Schema.Types.Decimal128
  },
  bairro: {
  cidade: {
// Unidade Federativa ou Provincia de um País
  uf: {
  pais: {
      sigla: String,
      nome: String,
      ativo: Boolean
  },
      sigla: String,
      nome: String,
      ativo: Boolean
  },
      codigo: Number,
      nome: String,
      ativo: Boolean,
      bairros: Bairro,
      issPadrao: Schema.Types.Decimal128
  },
      nome: String,
      cepPadrao: Number,
      ativo: Boolean
  },
      logradouro: String,
      numero: String,
      complemento: String,
  pontoReferencia: {
      tipo: String,
      nome: String
  }
  },
      dataNascimento: Date,
      ativo: Boolean,
      negativada: Boolean,
      membrosFamilia: MembroFamilia
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pessoa = mongoose.model("pessoa", schema);
  return Pessoa;
};
