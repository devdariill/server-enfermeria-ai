import { Hr } from '@/components/Hr'

export const FirstComponent = ({
  Select,
  Input,
  Checkbox,
  Date,
  Label
}:
| { Select: any, Input: any, Checkbox: any, Date: any, Label?: never }
| { Select: any, Input: any, Checkbox: any, Date?: never, Label: any }) => {
  return (
    <>
      <Hr />

      {/* <Input name='h_c' type='number' autoFocus /> */}
      <Checkbox name='alfabeta' autoFocus />
      <Select name='estudios' options={['ning', 'prim', 'sec', 'univ']} />
      <Input name='años_estudio' type='number' />
      <Select name='estado_civil' options={['sol', 'cas', 'ul', 'otra']} />
      <Select name='estado_ocu' options={['estud', 'trab']} />

      <Hr title='Antecedentes Familiares' />

      <Checkbox name='af_diabetes' />
      <Checkbox name='af_hipertension' />
      <Checkbox name='af_ca_seno' />
      <Checkbox name='af_ca_cervix' />
      <Checkbox name='af_enf_cong' />
      <Input name='af_otros' />

      <Hr title='Antecedentes Personales' />

      <Checkbox name='ap_diabetes' />
      <Checkbox name='ap_hipertension' />
      <Checkbox name='ap_cancer' />
      <Checkbox name='ap_ictericia' />
      <Checkbox name='ap_infertil' />
      <Checkbox name='ap_enf_cong' />
      <Input name='ap_otros' />

      <Input name='n_comp' type='number' />
      <Checkbox name='enf_t_sex' />
      <Input name='cual' />

      <Hr title='Ult. Citologia' />

      <Input name='mes' type='number' />
      <Input name='año' type='number' />
      <Checkbox name='neg' />
      <Checkbox name='nic' />
      <Checkbox name='nunca' />

      <Hr title='Obstentricos' />

      <Input name='gastac' type='number' />
      <Checkbox name='ninguno' />
      <Input name='gemelar' type='number' />
      <Input name='mola' type='number' />

      <Input name='abortos' type='number' />
      <Input name='p_vag' type='number' />
      <Input name='cesarea' type='number' />
      <Input name='ectopica' type='number' />
      <Input name='esp' type='number' />
      <Input name='provoc' type='number' />
      <Input name='nac_vivos' type='number' />
      <Input name='nac_mtos' type='number' />
      <Input name='vive' type='number' />
      <Input name='mtos_primer_sem' type='number' />
      {/* <Input name='fec_ant_embarazo' /> */}
      {Date
        ? (<Date name='fec_ant_embarazo' />)
        : (
          <Label name='fec_ant_embarazo'>
            <input
              type='date'
              className='w-full py-1 rounded pl-2 outline-gray-300'
              name='fec_ant_embarazo'
            />
          </Label>
          )}

      <Hr />

      <Select name='grupo' options={['a', 'b', 'ab', 'o']} />
      <Select name='rh' options={['+', '-']} />
      <Checkbox name='sensible' />

      <Hr />

      <Checkbox name='fuma' />
      <Input name='cig_d' type='number' />

      <Hr />

      <Input name='vdrl_mes' type='number' />
      <Input name='vdrl_año' type='number' />
      <Checkbox name='negativo' />
      <Checkbox name='positivo' />

      <Hr title='Ultimo Metodo' />

      <Checkbox name='aco' />
      <Checkbox name='diu' />
      <Checkbox name='inyectable' />
      <Checkbox name='implante' />
      <Checkbox name='um_ninguno' />
      <Checkbox name='condon' />
      <Checkbox name='ritmo' />
      <Checkbox name='otras' />
      <Checkbox name='vosec' />
      <Input name='tiempo' type='number' />
    </>
  )
}
