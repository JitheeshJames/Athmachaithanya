import React, { useState, useEffect } from 'react'
const DEPTS=['Ladies','Gents','Service','Youth','Charity','Choral','Common']
export default function Chat(){
  const [log, setLog] = useState(()=>JSON.parse(localStorage.getItem('chatLog')||'[]'));
  const [msg, setMsg]=useState(''); const [name,setName]=useState(''); const [dept,setDept]=useState(DEPTS[0]);
  useEffect(()=>localStorage.setItem('chatLog', JSON.stringify(log)), [log]);
  function send(e){
    e.preventDefault(); if(!name||!msg) return;
    const entry = {name,dept,msg,time:new Date().toISOString()};
    setLog([...log,entry]); setMsg('');
  }
  function download(){
    if(!log.length) return alert('No messages');
    const keys = Object.keys(log[0]||{}); const csv = [keys.join(',')].concat(log.map(r=>keys.map(k=>r[k]).join(','))).join('\n');
    const blob=new Blob([csv],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='chat.csv'; a.click();
  }
  return (
    <section className='grid md:grid-cols-3 gap-4'>
      <div className='md:col-span-2 p-4 bg-white rounded-xl shadow'>
        <div className='h-80 overflow-auto p-2 space-y-2'>
          {log.map((l,i)=>(<div key={i} className='p-2 border rounded'><div className='text-xs text-gray-500'>{l.dept} • <strong>{l.name}</strong> <span className='text-xs text-gray-400'> {new Date(l.time).toLocaleString()}</span></div><div className='mt-1'>{l.msg}</div></div>))}
        </div>
        <form onSubmit={send} className='mt-3 flex gap-2'>
          <select value={dept} onChange={e=>setDept(e.target.value)} className='px-3 py-2 rounded border'>{DEPTS.map(d=> <option key={d}>{d}</option>)}</select>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder='Your name' className='px-3 py-2 rounded border flex-1' />
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder='Message' className='px-3 py-2 rounded border flex-2' />
          <button className='px-3 py-2 rounded bg-indigo-600 text-white'>Send</button>
        </form>
        <div className='mt-3 flex gap-2'><button onClick={download} className='px-3 py-2 rounded border'>Download CSV</button></div>
      </div>

      <aside className='p-4 bg-white rounded-xl shadow'>
        <h3 className='font-semibold'>Quick actions</h3>
        <p className='text-sm mt-2'>Import members CSV on Departments page to update counts.</p>
      </aside>
    </section>
  )
}
