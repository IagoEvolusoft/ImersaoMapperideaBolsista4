module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
  pais: {
      sigla: String,
      nome: String,
      ativo: Boolean
  },
      sigla: String,
      nome: String,
      ativo: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const UnidadeFederativa = mongoose.model("unidadeFederativa", schema);
  return UnidadeFederativa;
};
