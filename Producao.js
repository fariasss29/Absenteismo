import { Router } from "express";
import conn from "@/db/conn";

import verificarPermissao from "@/middlewares/verificarPermissao";
import autenticarUsuario from "@/middlewares/autenticarUsuario";
import ProducaoListFactory from "@/factories/bps/producao/ProducaoListFactory";
import ProducaoWriteFactory from "@/factories/bps/producao/ProducaoWriteFactory";

const producao = Router();

producao.use((req, res, next) => {
    console.log(`[ROUTER producao] Rota acessada: ${req.method} ${req.path}`);
    next();
});

const controllerList = ProducaoListFactory(conn);
const controllerWrite = ProducaoWriteFactory(conn);



producao.get('/producao/l2lstatus', autenticarUsuario, verificarPermissao(684),controllerList.listarHoraHora.bind(controllerList));
producao.get('/md47', autenticarUsuario, verificarPermissao(684),controllerList.listarMD47.bind(controllerList));
producao.get('/demanda-area', autenticarUsuario, verificarPermissao(684, 685),controllerList.obterDemandaArea.bind(controllerList));
producao.get('/areas-producao', autenticarUsuario, verificarPermissao(684, 685),controllerList.obterAreasProducao.bind(controllerList));
producao.get('/sqdc-anual', autenticarUsuario, verificarPermissao(684),controllerList.obterSQDCAnual.bind(controllerList));
producao.get('/hse', autenticarUsuario, verificarPermissao(684),controllerList.obterHSE.bind(controllerList));


producao.post("/atualizar-plano-producao", controllerWrite.atualizarPlanoProducao.bind(controllerWrite));
producao.post('/atualizar-absenteismo', controllerWrite.atualizarAbesenteismo.bind(controllerWrite));

export default producao;
