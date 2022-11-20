import { Params, useParams } from 'react-router-dom'
import parse, { attributesToProps, domToReact, Element } from 'html-react-parser'
import Header from './components/header'
import Head from 'react-helmet'
import { useMemo, useState } from 'react'
import { flaskBlobPrefix } from './main'

interface ResponseBody {
  body: string,
  meta: {
    [ key: string ]: string[] | undefined
  }
}

export default function Markdown(): JSX.Element {
  const [HTML, setHTML] = useState<JSX.Element>()
  const [meta, setMeta] = useState<ResponseBody['meta']>({})
  let params: Readonly<Params<string>> | string = useParams()
  params = '/post' + (params['*'] ? '/' + params['*'] : '')
  if (!HTML) fetch(flaskBlobPrefix + params + '')
    .then(res => res.json() as Promise<ResponseBody>)
    .then(data => {
      const html = parse(data.body, {
        replace(domNode) {
          if (!(domNode instanceof Element)) return domNode
          if (domNode.name === 'a') {
            const props = attributesToProps(domNode.attribs)
            return <a {...props} className='hover:text-blue-600 text-slate-800 duration-500 decoration-dotted hover:decoration-solid visited:text-violet-800 dark:text-blue-300 dark:visited:text-violet-500 dark:hover:text-blue-400'>{domToReact(domNode.children)}</a>
          }
        },
        trim: true
      })
      setHTML(<article className='prose prose-zinc dark:prose-invert  md:prose-lg lg:prose-xl prose-li:text-left mx-auto select-none prose-code:select-text py-24'>{ html }</article>)
    })
  // useMemo(() => { if (HTML) console.log(HTML) }, [HTML])
  const MD = () => HTML ? HTML : <></>
  return <>
    <Head>
      <title>{meta.title ? meta.title[0] : ""}</title>
    </Head>
    <Header active={3} />
    <MD />
  </>
}