import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Departments from './pages/Departments'
import Chat from './pages/Chat'
import Visuals from './pages/Visuals'

export default function App(){
  const [route, setRoute] = useState('home')
  useEffect(()=>{ const onHash=()=>setRoute(location.hash.replace('#','')||'home'); window.addEventListener('hashchange', onHash); onHash(); return ()=>window.removeEventListener('hashchange', onHash) },[])
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow'>
        <div className='max-w-6xl mx-auto p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold'>CC</div>
            <h1 className='text-xl font-semibold'>Church Chat</h1>
          </div>
          <nav className='flex gap-3'>
            <a className='hover:underline' href='#home'>Home</a>
            <a className='hover:underline' href='#departments'>Departments</a>
            <a className='hover:underline' href='#chat'>Chat</a>
            <a className='hover:underline' href='#visuals'>Visuals</a>
          </nav>
        </div>
      </header>

      <main className='max-w-6xl mx-auto p-6'>
        {route==='home' && <Home/>}
        {route==='departments' && <Departments/>}
        {route==='chat' && <Chat/>}
        {route==='visuals' && <Visuals/>}
      </main>

      <footer className='text-center p-6 text-sm text-gray-500'>
        Built with ❤️ — Starter project
      </footer>
    </div>
  )
}
