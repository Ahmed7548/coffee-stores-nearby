import styles from "../../styles/Footer.module.css"
import {AiOutlineCopyright} from "react-icons/ai" 



const Footer = () => {
  return (
    <footer className={styles.footer }>
      <p><small><AiOutlineCopyright/></small> Ahmed Mamdouh dev</p>
    </footer>
  )
}

export default Footer