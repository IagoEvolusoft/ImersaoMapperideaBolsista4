module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
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

  const Pais = mongoose.model("pais", schema);
  return Pais;
};
