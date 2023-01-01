import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Header, { HeaderProps } from './components/header'
import ListMembers, { active as ListMembersActive } from './ListMembers'
import Dev, { active as DevActive } from './Dev'
import Montage, { active as MontageActive } from './Montage'
import Markdown, { active as MarkdownActive } from './Markdown'
import Posts, { active as PostsActive } from './Posts'
import Form, { active as FormActive } from './Form'
import Index, { active as IndexActive } from './Index'
import { useSpring, animated, config } from 'react-spring'
import './main.css'

const thisDocument = document.querySelector('meta[data-blob-prefix][data-api-prefix][data-id=__flask_prefix]')
export let isDev: boolean
if (thisDocument?.getAttribute('data-prod') === "true") isDev = false
else isDev = true
export const flaskBlobPrefix: string = isDev ? "" : thisDocument?.getAttribute('data-blob-prefix') || ""
export const flaskApiPrefix: string = isDev ? "" : thisDocument?.getAttribute('data-api-prefix') || ""

try {
  // Create the performance observer.
  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Logs all server timing data for this response
      console.log("Server Timing")
      // @ts-ignore
      console.table(entry.serverTiming);
    }
  });
  // Start listening for `navigation` entries to be dispatched.
  po.observe({ type: 'navigation', buffered: true });
} catch (e) {
  // Do nothing if the browser doesn't support this API.
}

interface Props {
  children: () => JSX.Element
  active: HeaderProps['active']
}

interface SvgProps {
  viewport: [number, number]
  path: string,
  className: string
}

function Main({ children: Children, active }: Props): JSX.Element {
  const [count, setCount] = useState<number>(1);
  const { x } = useSpring({
    config: {
      duration: 10000,
    },
    x: count,
  })

  function ChangeState() {
    setCount(p => {
      if (p == 2) return 1
      else return p + 1
    })
  }

  useEffect(() => {
    const id = setTimeout(ChangeState, 10000)
    return () => clearTimeout(id)
  }, [count])

  const waves: [string, string, string] = [
    "fill-zinc-100 dark:fill-zinc-800",
    "fill-zinc-200 dark:fill-zinc-700",
    "fill-zinc-300 dark:fill-zinc-600"
  ];

  return <>
    <header className='absolute left-2/4 z-[999] my-4 flex w-full max-w-screen-2xl -translate-x-2/4 flex-wrap items-center px-4 lg:fixed'>
      <Header active={active} />
    </header>
    <main className='pt-32'>
      <Children />
    </main>
    <footer className='fixed bottom-0 left-0 h-full w-full p-0 m-0 -z-50'>
      <svg
        viewBox={ [700, 0, 2700, 900].map(String).join(' ')}
        width="2700"
        height="900"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        className='absolute bottom-0'>
        <path
          d="M0 100L56.3 116.8C112.7 133.7 225.3 167.3 337.8 165.2C450.3 163 562.7 125 675.2 99.3C787.7 73.7 900.3 60.3 1012.8 76.8C1125.3 93.3 1237.7 139.7 1350.2 167.2C1462.7 194.7 1575.3 203.3 1687.8 196.7C1800.3 190 1912.7 168 2025.2 148C2137.7 128 2250.3 110 2362.8 103.5C2475.3 97 2587.7 102 2643.8 104.5L2700 107L2700 901L2643.8 901C2587.7 901 2475.3 901 2362.8 901C2250.3 901 2137.7 901 2025.2 901C1912.7 901 1800.3 901 1687.8 901C1575.3 901 1462.7 901 1350.2 901C1237.7 901 1125.3 901 1012.8 901C900.3 901 787.7 901 675.2 901C562.7 901 450.3 901 337.8 901C225.3 901 112.7 901 56.3 901L0 901Z"
          className={waves[0]}/>
        <path
          d="M0 284L56.3 292.2C112.7 300.3 225.3 316.7 337.8 345C450.3 373.3 562.7 413.7 675.2 407.2C787.7 400.7 900.3 347.3 1012.8 311.5C1125.3 275.7 1237.7 257.3 1350.2 259.2C1462.7 261 1575.3 283 1687.8 311.5C1800.3 340 1912.7 375 2025.2 364.5C2137.7 354 2250.3 298 2362.8 300.5C2475.3 303 2587.7 364 2643.8 394.5L2700 425L2700 901L2643.8 901C2587.7 901 2475.3 901 2362.8 901C2250.3 901 2137.7 901 2025.2 901C1912.7 901 1800.3 901 1687.8 901C1575.3 901 1462.7 901 1350.2 901C1237.7 901 1125.3 901 1012.8 901C900.3 901 787.7 901 675.2 901C562.7 901 450.3 901 337.8 901C225.3 901 112.7 901 56.3 901L0 901Z"
          className='fill-[#EBEBED] dark:fill-[#333338]'/>
        <path
          d="M0 382L56.3 399.8C112.7 417.7 225.3 453.3 337.8 478.7C450.3 504 562.7 519 675.2 532.7C787.7 546.3 900.3 558.7 1012.8 567.7C1125.3 576.7 1237.7 582.3 1350.2 557.5C1462.7 532.7 1575.3 477.3 1687.8 459C1800.3 440.7 1912.7 459.3 2025.2 457.7C2137.7 456 2250.3 434 2362.8 442.2C2475.3 450.3 2587.7 488.7 2643.8 507.8L2700 527L2700 901L2643.8 901C2587.7 901 2475.3 901 2362.8 901C2250.3 901 2137.7 901 2025.2 901C1912.7 901 1800.3 901 1687.8 901C1575.3 901 1462.7 901 1350.2 901C1237.7 901 1125.3 901 1012.8 901C900.3 901 787.7 901 675.2 901C562.7 901 450.3 901 337.8 901C225.3 901 112.7 901 56.3 901L0 901Z"
          className={waves[1]}/>
        <path
          d="M0 668L56.3 649.5C112.7 631 225.3 594 337.8 574.5C450.3 555 562.7 553 675.2 558.3C787.7 563.7 900.3 576.3 1012.8 576C1125.3 575.7 1237.7 562.3 1350.2 573.7C1462.7 585 1575.3 621 1687.8 635.7C1800.3 650.3 1912.7 643.7 2025.2 651.8C2137.7 660 2250.3 683 2362.8 667.5C2475.3 652 2587.7 598 2643.8 571L2700 544L2700 901L2643.8 901C2587.7 901 2475.3 901 2362.8 901C2250.3 901 2137.7 901 2025.2 901C1912.7 901 1800.3 901 1687.8 901C1575.3 901 1462.7 901 1350.2 901C1237.7 901 1125.3 901 1012.8 901C900.3 901 787.7 901 675.2 901C562.7 901 450.3 901 337.8 901C225.3 901 112.7 901 56.3 901L0 901Z"
          className="fill-[#DEDEE0] dark:fill-[#484850]"/>
        <path
          d="M0 719L56.3 722C112.7 725 225.3 731 337.8 739.5C450.3 748 562.7 759 675.2 760.3C787.7 761.7 900.3 753.3 1012.8 755.3C1125.3 757.3 1237.7 769.7 1350.2 784.3C1462.7 799 1575.3 816 1687.8 808C1800.3 800 1912.7 767 2025.2 752.5C2137.7 738 2250.3 742 2362.8 735.2C2475.3 728.3 2587.7 710.7 2643.8 701.8L2700 693L2700 901L2643.8 901C2587.7 901 2475.3 901 2362.8 901C2250.3 901 2137.7 901 2025.2 901C1912.7 901 1800.3 901 1687.8 901C1575.3 901 1462.7 901 1350.2 901C1237.7 901 1125.3 901 1012.8 901C900.3 901 787.7 901 675.2 901C562.7 901 450.3 901 337.8 901C225.3 901 112.7 901 56.3 901L0 901Z"
          className={waves[2]}/>
      </svg>
    </footer>
  </>
}

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main children={Index} active={IndexActive} />} />
        <Route path='/register' element={<Main children={Form} active={FormActive} />} />
        <Route path='/list' element={<Main children={ListMembers} active={ListMembersActive} />} />
        <Route path='/build' element={<Main children={Montage} active={MontageActive} />} />
        <Route path='/dev' element={<Main children={Dev} active={DevActive} />} />
        <Route path='/post' element={<Main children={Posts} active={PostsActive} />} />
        <Route path='/post/*' element={<Main children={Markdown} active={MarkdownActive} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);