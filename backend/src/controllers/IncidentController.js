const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    return response.json({ id });
  },

  async list(request, response) {
    const { page = 1 } = request.query;
    const incidents = await connection("incidents")
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
      .offset((page - 1) * 5)
      .limit(5);

    const [count] = await connection("incidents").count();

    response.header("X-Total-Count", count["count(*)"]);
    return response.json(incidents);
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;
    const incident = await connection("incidents")
      .where({ id })
      .select("ong_id")
      .first();

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: "Não autorizado" });
    }

    await connection("incidents")
      .where({ id, ong_id })
      .delete();

    return response.status(204).send();
  }
};
