import React, { useState } from 'react'
const DEPTS = ['Ladies','Gents','Service','Youth','Charity','Choral','Common']
export default function Departments(){
  const [members, setMembers] = useState([])
  function onFile(e){
    const f = e.target.files[0]; if(!f) return;
    const reader = new FileReader(); reader.onload = (ev)=> {
      const text = ev.target.result;
      const rows = text.split('\n').filter(Boolean).map(r=>r.split(','));
      const keys = rows[0].map(k=>k.trim());
      const data = rows.slice(1).map(r=>Object.fromEntries(r.map((c,i)=>[keys[i], (c||'').trim()])));
      setMembers(data);
    }; reader.readAsText(f);
  }
  function exportCSV(dep){
    const rows = members.filter(m=>m.department===dep);
    if(!rows.length){ alert('No members for '+dep); return; }
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(',')].concat(rows.map(r=>keys.map(k=>r[k]||'').join(','))).join('\n');
    const blob = new Blob([csv],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=dep+'_members.csv'; a.click();
  }
  return (
    <section>
      <div className='flex gap-4 mb-4 items-center'>
        <h2 className='text-2xl font-semibold'>Departments</h2>
        <input type='file' accept='.csv' onChange={onFile} />
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        {DEPTS.map(d=>(
          <div key={d} className='p-4 bg-white rounded-xl shadow'>
            <h3 className='font-semibold'>{d}</h3>
            <p className='text-sm mt-1'>Members: {members.filter(m=>m.department===d).length}</p>
            <div className='mt-3 flex gap-2'>
              <button onClick={()=>exportCSV(d)} className='px-3 py-1 rounded bg-indigo-600 text-white'>Export</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
