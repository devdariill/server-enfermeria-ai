import { createApp } from './app.js'

import { HistoriaModel } from './models/historias.model.js'
import { InformeModel } from './models/informes.model.js'
import { PlanificaionModel, SeccionBModel } from './models/planificacion.model.js'
import { TerceroModel } from './models/terceros.model.js'

createApp({ terceroModel: TerceroModel, historiaModel: HistoriaModel, planificacionModel: PlanificaionModel, seccionBModel: SeccionBModel, informeModel: InformeModel })
