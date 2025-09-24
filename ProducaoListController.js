class ProducaoListController {
  constructor({ consultarHoraHora, consultarMD47, consultarDemandasArea, consultarAreasProducao, consultarSQDCAnual, consultarHSE }) {
    this.consultarHoraHora = consultarHoraHora;
    this.consultarMD47 = consultarMD47;
    this.consultarDemandasArea = consultarDemandasArea;
    this.consultarAreasProducao = consultarAreasProducao;
    this.consultarSQDCAnual = consultarSQDCAnual
    this.consultarHSE = consultarHSE;
  }

  async listarHoraHora(req, res, next) {
    try {
      const data = await this.consultarHoraHora.execute();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  async listarMD47(req, res, next) {
    try {
      const data = await this.consultarMD47.execute();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }


  async obterDemandaArea(req, res, next) {
    try {
      const { areaUuid, start, end } = req.query;
      const data = await this.consultarDemandasArea.execute({ areaUuid, start, end });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }

  async obterAreasProducao(req, res, next) {
    try {
      const data = await this.consultarAreasProducao.execute();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }


  async obterSQDCAnual(req, res, next) {
    try {
      
      const data = await this.consultarSQDCAnual.execute();
      res.status(200).send(data);z
    } catch (err) {
      next(err);
    }
  }

   async obterHSE(req, res, next) {
    try {
      const data = await this.consultarHSE.execute();
      res.status(200).send(data);z
    } catch (err) {
      next(err);
    }
  }

}

export default ProducaoListController;
