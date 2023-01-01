import { Fragment, useEffect, useState } from 'react' 
import { useNavigate } from 'react-router'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { flaskApiPrefix } from '../main'

interface BlogPost {
  id: number,
  title: string,
  path: string
}

export default function Search() {
  const navigate = useNavigate()
  const [blogPosts, setPosts] = useState<BlogPost[]>([{ id: -1, path: '', title: 'Loading' }])
  const [selected, setSelectedPost] = useState<BlogPost | ''>('')
  const [query, setQuery] = useState('')

  function setSelected(value: BlogPost): void {
    if (value.id == -1) return;
    else setSelectedPost(value)
  }

  useEffect(() => {
    if (selected) navigate(selected.path)
  }, [selected])

  const filteredPeople =
    query === ''
      ? blogPosts
      : blogPosts.filter((person) =>
          person.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 max-sm:w-32"
              placeholder='Search'
              onClick={() => {
                fetch(flaskApiPrefix + '/posts')
                  .then(data => data.json())
                  .then(setPosts)
              }}
              displayValue={(post: BlogPost) => post.title}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center w-8 p-2">
              <ChevronUpDownIcon
                className="h-8 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((post) => (
                  <Combobox.Option
                    key={post.id}
                    className={
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        post.id == -1 ? ' text-zinc-500' : 'text-gray-900'
                      }`
                    }
                    value={post}
                  >
                    {() => (
                      <>
                        <span className={'block truncate font-normal'}>
                          {post.title}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
  )
}