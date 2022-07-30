module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
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
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cidade = mongoose.model("cidade", schema);
  return Cidade;
};
