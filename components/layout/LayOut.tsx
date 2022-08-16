import React, { ReactNode } from 'react'
import styles from "../../styles/Layout.module.css"

interface Props{
  children:ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}

export default Layout