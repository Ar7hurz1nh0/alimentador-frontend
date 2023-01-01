
import './App.css'
import { HeaderProps } from './components/header'

export const active: HeaderProps['active'] = 4

export default function Index(): JSX.Element {
  return (<>
    <div className="App select-none" id='root'>
      <article className='prose prose-zinc dark:prose-invert text-center m-auto'>
        <div>
          <h1>Montagem da Tigela</h1>
          <img src='/pote.png' />
        </div>
        <div>
          <h1>Montagem do Reservatorio</h1>
          <img src='/alimentador.png' />
        </div>
        <div>
          <h1>Diferentes estilos</h1>
          <div className='grid grid-cols-2'>
            <img src='/sapo.jpeg' />
            <img src='/vaca.jpeg' />
          </div>
        </div>
      </article>
    </div>
  </>
  )
}
