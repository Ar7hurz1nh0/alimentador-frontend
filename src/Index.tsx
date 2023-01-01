import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HeaderProps } from './components/header'

export const active: HeaderProps['active'] = 1

export default function Index(): JSX.Element {
  const [count, setCount] = useState(0)

  return (<>
    <div className="App select-none" id='root'>
      <article className='prose prose-zinc dark:prose-invert text-center m-auto prose-2xl'>
        <h1>Um alimentador avançado para seu pet</h1>
        <h3 className='text-zinc-400 mx-16'>Customizavel e inteligente, feito para ser simples pro seu pet, e agil para você</h3>
        <div className=''>
          <div><p>Seja sincero, se você tem um pet em casa, alguma vez você acabou esquecendo de dar comida para ele, ou simplesmente precisou dar uma saida, e não tinha ninguem em casa para por um pouco de ração no pote do bixano.</p>
          <p>Pensando nisso, criamos o Alimentador de Pets Automatico, um sistema que automatiza o processo de dar comida pro seu pet, podendo ser configurado do jeito que você preferir</p></div>
          <div>
            <p>Facil de Usar!</p>
            <ol className='text-left mx-52'>
              <li>Ligar</li>
              <li>Abastecer</li>
              <li>Escolher entre abastecimento por peso ou intervalo</li>
            </ol>
            <p>Pronto! Seu alimentador está configurado.</p>
            <p>Agora seu pet nunca mais ficará de barriguinha vazia.</p>
            <p>Além disso, o alimentador possui leds que indicam o nivel do reservatório, deixando facil de perceber quando é necessario reabastecer o sistema</p>
          </div>
        </div>
      </article>
    </div>
  </>
  )
}
