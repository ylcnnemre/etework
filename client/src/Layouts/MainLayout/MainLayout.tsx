import React,{FC,ReactNode} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./MainLayout.scss"

const MainLayout:FC<{children:ReactNode }> = ({children}) => {
  return (
    <div style={{height:"max-content"}}>
       <Navbar />
       <div  className='container'  >
         {
          children
         }
       </div>
    </div>
  )
}

export default MainLayout