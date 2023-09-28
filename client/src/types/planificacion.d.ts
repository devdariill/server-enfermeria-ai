// Definición de tipos para la tabla Planificaciones
export export interface Planificacion {
  id: number
  id_tercero: number
  fecha: string // Puedes usar el tipo Date si prefieres.

  h_c: number

  alfabeta: number
  estudios: string
  años_estudio: number
  estado_civil: string
  estado_ocu: string

  af_diabetes: number
  af_hipertension: number
  af_ca_seno: number
  af_ca_cervix: number
  af_enf_cong: number
  af_otros: string

  ap_diabetes: number
  ap_hipertension: number
  ap_cancer: number
  ap_ictericia: number
  ap_infertil: number
  ap_enf_cong: number
  ap_otros: string

  n_comp: number
  enf_t_sex: number
  cual: string

  mes: number
  año: number
  neg: number
  nic: number
  nunca: number

  gastac: number
  ninguno: number
  gemelar: number
  mola: number
  abortos: number
  p_vag: number
  cesarea: number
  ectopica: number
  esp: number
  provoc: number
  nac_vivos: number
  nac_mtos: number
  vive: number
  mtps_primera_sem: number
  fec_ant_embarazo: string // Puedes usar el tipo Date si prefieres.

  grupo: string
  rh1: string
  rh2: string
  sensible: number

  fuma: number
  cig_d: number

  vdrl_mes: number
  vdrl_año: number
  negativo: number
  positivo: number

  aco: number
  diu: number
  inyectable: number
  implante: number
  um_ninguno: number
  condon: number
  ritmo: number
  otras: number
  vosec: number
  tiempo: number

  observaciones: string
}

// Definición de tipos para la tabla Seccion_B
export interface SeccionB {
  id: number
  id_tercero: number
  id_planificacion: number

  metodo: string
  ciclos: string
  amenorrea: string
  sangrado: string
  manchado: string
  fum: string
  lactando: string
  cefalea_mareo: string
  dolor_mamario: string
  dolor_pelvico: string
  flujo_caracter: string
  varices: string

  senos: string
  abdomen: string
  cervix: string
  utero: string
  anexos: string
  t_a_mm_hg: string
  peso_kg: string

  cambio_metodo: string
  motivo: string
  nuevo_metodo: string
  observaciones: string
  citologia: string
}
