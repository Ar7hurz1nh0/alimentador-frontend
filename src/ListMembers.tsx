import { HeaderProps } from './components/header'
import { useMemo, useState } from 'react'
import { flaskApiPrefix } from './main'

interface User {
  name: string,
  email: string,
}

const Users: User[] = [
  { name: 'John', email: 'john@gmail.com' },
  { name: 'Jane', email: 'jane@gmail.com' },
  { name: 'Jack', email: 'jack@gmail.com' },
  { name: 'Jill', email: 'jill@gmail.com' }
]

export const active: HeaderProps['active'] = 2

export default function ListMembers(): JSX.Element {
  const [users, setUsers] = useState<User[]>([])

  if (!users.length) fetch(flaskApiPrefix + '/register')
    .then(res => res.json() as Promise<User[]>)
    .then(setUsers)
    .catch(() => setUsers(Users))

  return <div className='text-center'>
    <article className='prose prose-zinc dark:prose-invert  md:prose-lg lg:prose-xl mx-auto select-none prose-code:select-text pt-12'>
      <h1>Usuários Registrados</h1>
      <ul className='list-none'>
        { users.map(user => (
          <li key={user.email}>
            {user.name} |<code>{user.email}</code>
          </li>)
          )
        }
      </ul>
    </article>
  </div>
}