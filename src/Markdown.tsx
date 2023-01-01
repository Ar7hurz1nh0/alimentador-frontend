import { Params, useParams } from 'react-router-dom'
import parse, { attributesToProps, domToReact, Element } from 'html-react-parser'
import Header, { HeaderProps } from './components/header'
import Head from 'react-helmet'
import { useEffect, useState } from 'react'
import { flaskBlobPrefix } from './main'

interface ResponseBody {
  body: string,
  meta: {
    [ key: string ]: string[] | undefined
  }
}

export const active: HeaderProps['active'] = 3

export default function Markdown(): JSX.Element {
  const [HTML, setHTML] = useState<JSX.Element>()
  const [meta, setMeta] = useState<ResponseBody['meta']>({})
  let params: Readonly<Params<string>> | string = useParams()
  params = '/post' + (params['*'] ? '/' + params['*'] : '')
  if (!HTML) fetch(flaskBlobPrefix + params + '')
    .then(res => res.json() as Promise<ResponseBody>)
    .then(data => {
      setMeta(data.meta)
      const html = parse(data.body, {
        replace(domNode) {
          if (!(domNode instanceof Element)) return domNode
          if (domNode.name === 'a') {
            const props = attributesToProps(domNode.attribs)
            return <a {...props} className='hover:text-blue-600 text-slate-800 duration-500 decoration-dotted hover:decoration-solid visited:text-violet-800 dark:text-blue-300 dark:visited:text-violet-500 dark:hover:text-blue-400'>{domToReact(domNode.children)}</a>
          }
          if (domNode.name === 'pre') {
            const props = attributesToProps(domNode.attribs)
            return <pre {...props} className='backdrop-blur-sm dark:backdrop-blur-sm'>{domToReact(domNode.children)}</pre>
          }
        },
        trim: true
      })
      setHTML(<article className='prose prose-zinc dark:prose-invert md:prose-lg lg:prose-xl prose-li:text-left mx-auto select-none prose-code:select-text py-24'>{ html }</article>)
    })
  // useMemo(() => { if (HTML) console.log(HTML) }, [HTML])
  const MD = () => HTML ? HTML : <></>
  return <>
    <MD />
  </>
}