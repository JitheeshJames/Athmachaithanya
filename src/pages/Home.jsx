import React from 'react'
export default function Home(){
  return (
    <section>
      <div className='bg-gradient-to-r from-indigo-600 to-violet-500 text-white rounded-xl p-8 mb-6'>
        <h2 className='text-3xl font-bold'>Welcome to Church Chat</h2>
        <p className='mt-2 text-lg opacity-90'>A modern, interactive place for your community.</p>
      </div>

      <div className='grid md:grid-cols-3 gap-4'>
        <div className='p-6 bg-white rounded-xl shadow'> <h3 className='font-semibold'>Connect</h3> <p className='text-sm mt-2'>Join chats, share prayer requests.</p></div>
        <div className='p-6 bg-white rounded-xl shadow'> <h3 className='font-semibold'>Organize</h3> <p className='text-sm mt-2'>Manage departments and events using simple CSV files.</p></div>
        <div className='p-6 bg-white rounded-xl shadow'> <h3 className='font-semibold'>Visualize</h3> <p className='text-sm mt-2'>Charts for attendance and activities.</p></div>
      </div>
    </section>
  )
}
