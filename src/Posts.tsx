import { HeaderProps } from './components/header'
import { useEffect, useState } from 'react'
import { flaskApiPrefix } from './main'

interface BlogPost {
  id: number,
  title: string,
  path: string
}

const Blogs: BlogPost[] = [
  { id: 1, title: 'Test with a really long name 1', path: '1' },
  { id: 2, title: 'Test with a long name 2', path: '2' },
  { id: 3, title: 'Test with a name 3', path: '3' },
  { id: 4, title: 'Test with a really really long name 4', path: '4' },
  { id: 5, title: 'Test 5', path: '5' }
]

export const active: HeaderProps['active'] = 3

export default function Posts(): JSX.Element {
  const [users, setUsers] = useState<BlogPost[]>([])

  if (!users.length) fetch(flaskApiPrefix + '/posts')
    .then(res => res.json() as Promise<BlogPost[]>)
    .then(setUsers)
    .catch(() => setUsers(Blogs))

  useEffect(() => { document.title = 'Artigos publicados' }, [])

  return <div className='text-center'>
    <article className='prose prose-zinc dark:prose-invert  md:prose-lg lg:prose-xl mx-auto select-none prose-code:select-text pt-12'>
      <h1>Artigos publicados</h1>
      <ul className='list-none flex items-center justify-center flex-wrap max-w-6xl'>
        { users.map(user => (
          <li key={user.id} className='m-4 p-6 text-left border rounded-[10px] max-w-xl hover:border-blue-700 active:border-blue-700 focus:border-blue-700 dark:hover:border-blue-700 dark:active:border-blue-700 dark:focus:border-blue-700 duration-500 bg-zinc-200 dark:bg-zinc-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-[8px]'>
            <a href={ user.path } className='p-10 no-underline duration-500 hover:text-blue-700 active:text-blue-700 focus:text-blue-700 dark:hover:text-blue-700 dark:active:text-blue-700 dark:focus:text-blue-700'>
              <code>{user.title}</code>
            </a>
          </li>)
          )
        }
      </ul>
    </article>
  </div>
}