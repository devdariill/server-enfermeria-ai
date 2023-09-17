import { createApp } from './app.js'
import { HistoriaModel } from './models/historias.model.js'

import { TerceroModel } from './models/terceros.model.js'

createApp({ terceroModel: TerceroModel, historiaModel: HistoriaModel })
