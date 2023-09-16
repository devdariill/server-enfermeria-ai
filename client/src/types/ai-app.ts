export interface People {
  patient_id: number
  name: string
  age: number
  diagnosis: string
  nursing_records: NursingRecord[]
}

export interface NursingRecord {
  record_id: number
  date: Date
  nurse_name: string
  procedure: string
  notes: string
}

export interface Offer {
  id: string
  title: string
  province: string
  experienceMin: string
  link: string
  teleworking: string
}
