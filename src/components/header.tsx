import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Search from './search';
import Darkmode from './darkmode';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'

export interface HeaderProps {
  active: -1 | 1 | 2 | 3 | 4 | 5
}

interface MenuItems {
  items: {
    label: string
    href: string
  }[],
  active: HeaderProps['active'],
  navigate: NavigateFunction
  className?: string
}
const Items: MenuItems['items'] = [
  { href: '/', label: 'Home'},
  { href: '/list', label: 'Users'},
  { href: '/post', label: 'Posts'},
  { href: '/build', label: 'Build'},
  //{ href: '/dev', label: 'Dev'},
]

function DropdownMenu(props: MenuItems) {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 py-2.5 px-2.5">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            { props.items.map(item => (
              <div className="px-1 py-1" key={item.label}>
                <Menu.Item >
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => props.navigate(item.href)}
                    >{ item.label }</button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}


function Tabs(props: MenuItems) {
  let [categories] = useState(props.items)

  return (
    <div className="max-h-min">
      <Tab.Group defaultIndex={props.active -1}>
        <Tab.List className="flex space-x-10 rounded-xl p-1 backdrop-blur-md bg-slate-50 dark:bg-slate-800 bg-opacity-75" >
          {categories.map(tab => (
            <Tab
              key={tab.label}
              onClick={() => props.navigate(tab.href)}
              className={({ selected }) => `w-full backdrop-blur-md dark:bg-opacity-50 bg-opacity-50 rounded-lg px-4 py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow dark:bg-gray-800' : 'text-blue-500 bg-gray-200 dark:bg-gray-900 hover:bg-white/[0.12] hover:text-white}'}`}
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}

export default function Header(props: HeaderProps) {
  const navigate = useNavigate()
  const imgsrc='/logo.png', title=''
  return <nav className="bg-zinc-200 px-2 sm:px-4 py-2.5 dark:bg-zinc-800 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 sticky dark:bg-opacity-50 bg-opacity-50 backdrop-blur-[8px] rounded-3xl">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
  <a href='/' className="flex items-center" onClick={e => {e.preventDefault(); navigate('/')}}>
      <img src={imgsrc} className="mr-3 h-10 pl-3 max-sm:h-9 max-sm:pl-0" alt={title + ' Logo'} />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden md:block">{title}</span>
  </a>
  <div className="flex md:order-2 space-x-1">
      <Darkmode />
      <Search />
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 max-md:px-2 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block" onClick={() => navigate('/register')}>Registre-se</button>
      <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block md:hidden' onClick={() => navigate('/register')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      </button>
      <DropdownMenu className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' data-collapse-toggle="navbar-sticky" aria-controls="navbar-sticky" aria-expanded="false" items={Items} active={-1} navigate={navigate}/>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <div className="flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-transparent dark:bg-transparent">
      <Tabs items={Items} navigate={navigate} active={props.active} />
    </div>
  </div>
  </div>
</nav>
}