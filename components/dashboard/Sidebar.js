import React from 'react'
import { AddAlt, Chip, ChartColumn } from '@carbon/icons-react';
import Link from 'next/link';

function Sidebar() {
  return (
    <div className="nav-bar" style={{background: '#212529', width: '5%',height: '100%',position: 'fixed', top:'0'}}>
            <nav style={{ height:'60%', display:'flex', flexDirection:'column',  justifyContent:'space-evenly',alignItems:'center',position:'relative', top:'25%'}}>
                <Link href='/create-algo' style={{color : '#fff', marginLeft:'60%', width:'100%', height:'100%', cursor:'pointer'}}>
                  <AddAlt size="28"/>
                </Link>
                <Link href='/dashboard' style={{color : '#fff', marginLeft:'60%', width:'100%', height:'100%', cursor:'pointer'}}>
                  <Chip size="24"/>
                </Link>
                <Link href='/reports' style={{color : '#fff', marginLeft:'60%', width:'100%', height:'100%', cursor:'pointer'}}>
                  <ChartColumn size="24"/>
                </Link>
                <Chip />
            </nav>
    </div>
  )
}

export default Sidebar