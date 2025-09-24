import ProducaoWriteController from "@/controllers/bps/producao/ProducaoWriteController";

import { UpdatePlanoProducao } from "@/useCases/bps/producao/UPDATE/UpdatePlanoProducao";
import { UpdateAbesenteismo } from "@/useCases/bps/producao/UPDATE/UpdateAbesenteismo";


export default function ProducaoWriteFactory(conn) {
    return new ProducaoWriteController({
        updatePlanoProducao: new UpdatePlanoProducao(conn),
        updateAbesenteismo: new UpdateAbesenteismo(conn)
    })
}

