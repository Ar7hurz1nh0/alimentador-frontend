import { HeaderProps } from "./components/header"
import { flaskApiPrefix, isDev } from './main'
import { useNavigate } from 'react-router-dom'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  label: string,
  name: string
}

function Input(props: InputProps) {
  return (
    <div className='text-left mx-20 max-sm:mx-12'>
      <strong className="ml-8">{ props.label }</strong>
      <input
        type={props.type}
        className='w-full rounded-xl h-12 max-sm:h-8 max-sm:rounded-lg dark:text-zinc-700'
        placeholder={'  ' + props.label}
        name={props.name} />
    </div>
  )
}

export const active: HeaderProps['active'] = -1

interface FormProps {
  name: HTMLInputElement,
  email: HTMLInputElement,
}

export default function Form(): JSX.Element {
  const navigate = useNavigate()
  return <>
    <article className='prose prose-zinc dark:prose-invert md:prose-lg lg:prose-2xl mx-auto select-none prose-code:select-text'>
      <div className='w-full h-96 bg-zinc-800 bg-opacity-50 rounded-3xl backdrop-blur-sm grid grid-cols-1 '>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (isDev) return;
            const form = e.target as unknown as FormProps
            fetch(flaskApiPrefix + '/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: form.name.value,
                email: form.email.value
              })
            }).then(() => navigate('/list'))
          }}
          className='col-span-1 bg-zinc-900 bg-opacity-50 rounded-3xl backdrop-blur-sm m-8 mx-16 order-first flex flex-col space-y-6 max-sm:space-y-10'>
          <div></div>
          <Input type='text' label='Nome' name='name' />
          <Input type='email' label='Email' name='email' />
          <button type='submit' className='w-36 h-12 max-sm:w-28 bg-blue-600 mr-4 ml-auto'>Registrar-se</button>
        </form>
      </div>
    </article>
  </>
}