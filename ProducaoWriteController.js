class ProducaoWriteController {
  constructor({ updatePlanoProducao, updateAbesenteismo }) {
    this.updatePlanoProducao = updatePlanoProducao;
    this.updateAbesenteismo = updateAbesenteismo
  }


  async atualizarPlanoProducao(req, res, next) {
    try {

      const payload = req.body;

      if (!payload) {
        return res.status(400).json({ error: "Dados são necessários." });
      }

      const result = await this.updatePlanoProducao.execute(payload);

      if (result.success) {
        return res.status(200).json({
          ok: true,
          data: result.data,
        });
      } else {
        return res.status(500).json({ error: result.error.message });
      }
    } catch (err) {
      next(err);
    }
  }


  async atualizarAbesenteismo(req, res, next) {
    try {

      const payload = req.body;

      if (!payload) {
        return res.status(400).json({ error: "Dados são necessários." });
      }

      const result = await this.updateAbesenteismo.execute(payload);

      if (result.success) {
        return res.status(200).json({
          ok: true,
          data: result.data,
        });
      } else {
        return res.status(500).json({ error: result.error.message });
      }
    } catch (err) {
      next(err);
    }
  }


}

export default ProducaoWriteController;
