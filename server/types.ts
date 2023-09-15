// Type for the Terceros table
type Terceros = {
  id: number
  id_nacional: number
  nombres: string
  apellidos: string
  fecha_nacimiento: string
  estado_civil: string
  genero: string
  procedencia: string
  residencia: string
  fecha_ingreso: string
  celular: number
}

// Type for the Historias_Clinicas table
type HistoriasClinicas = {
  id: number
  programa: string | null
  codigo: string | null
  eps: string | null
  motivo_consulta: string | null
  enfermedad_actual: string | null
  antecedente_familiar: string | null
  antecedente_personal: string | null
  habitos: string | null
  antecedentes_ginecologico: string | null
  ta: string | null
  fc: string | null
  p: string | null
  r: string | null
  t: string | null
  peso: string | null
  talla: string | null
  piel_faneras: string | null
  cabeza: string | null
  ojos: string | null
  nariz: string | null
  oidos: string | null
  boca: string | null
  cuello: string | null
  torax: string | null
  corazon: string | null
  pulmones: string | null
  abdomen: string | null
  extremidades: string | null
  genitourinario: string | null
  e_neurologico_elemental: string | null
  impresion_diagnostica: string | null
  tratamiento: string | null
  id_tercero: number
  firma: number
}

// Type for the Usuarios table
type Usuarios = {
  id: number
  gmail: string
  id_tercero: number
}
