import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
export default function Visuals(){
  // demo data - users will replace by CSV import in real usage
  const pieData = [{name:'Ladies',value:12},{name:'Gents',value:8},{name:'Youth',value:6},{name:'Charity',value:4}]
  const lineData = Array.from({length:10}).map((_,i)=>({day:`Day ${i+1}`, value: Math.round(Math.random()*10)+2}))
  const COLORS = ['#7c3aed','#06b6d4','#0ea5a4','#ef4444','#f59e0b']
  return (
    <section className='grid md:grid-cols-2 gap-4'>
      <div className='p-4 bg-white rounded-xl shadow'>
        <h3 className='font-semibold mb-2'>Participants by Dept</h3>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart><Pie dataKey='value' data={pieData} outerRadius={80} label>{pieData.map((entry,index)=>(<Cell key={index} fill={COLORS[index%COLORS.length]}/>))}</Pie></PieChart>
        </ResponsiveContainer>
      </div>
      <div className='p-4 bg-white rounded-xl shadow'>
        <h3 className='font-semibold mb-2'>Activity (sample)</h3>
        <ResponsiveContainer width='100%' height={250}>
          <LineChart data={lineData}><XAxis dataKey='day'/><YAxis/><Tooltip/><Line type='monotone' dataKey='value' stroke='#7c3aed' strokeWidth={2}/></LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
