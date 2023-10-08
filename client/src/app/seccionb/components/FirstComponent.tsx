import { Hr } from '@/components/Hr'

export const FirstComponent = ({ Input }: { Input: any }) => {
  return (
    <>
      <Hr title='ANAMNESIS' widthSm />

      <Input name='metodo' autoFocus />
      <Input name='ciclos' />
      <Input name='amenorrea' />
      <Input name='sangrado' />
      <Input name='manchado' />
      <Input name='fum' />
      <Input name='lactando' />
      <Input name='cefalea_mareo' />
      <Input name='dolor_mamario' />
      <Input name='dolor_pelvico' />
      <Input name='flujo_caracter' />
      <Input name='varices' />

      <Hr title='EX. FISICO' widthSm />

      <Input name='senos' />
      <Input name='abdomen' />
      <Input name='cervix' />
      <Input name='utero' />
      <Input name='anexos' />
      <Input name='t_a_mm_hg' />
      <Input name='peso_kg' />

      <Hr title='CONDUCTA' widthSm />

      <Input name='cambio_metodo' />
      <Input name='motivo' />
      <Input name='nuevo_metodo' />
      <Input name='observaciones' />
      <Input name='citologia' />

      <Hr widthSm />

    </>
  )
}
