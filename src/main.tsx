import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import ListMembers from './ListMembers'
import Markdown from './Markdown'
import Posts from './Posts'
import Form from './Form'
import App from './App'
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
  po.observe({type: 'navigation', buffered: true});
} catch (e) {
  // Do nothing if the browser doesn't support this API.
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<Form></Form>} />
        <Route path='/list' element={<ListMembers></ListMembers>} />
        <Route path='/post' element={<Posts></Posts>} />
        <Route path='/post/*' element={<Markdown></Markdown>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
