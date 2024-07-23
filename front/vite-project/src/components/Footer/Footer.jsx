import styles from "./Footer.module.css";

const Footer = ()=> {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.div}>
                    <p>Seguinos en instagram @magma_spa</p>
                    <img src="src/assets/instagram.png" alt="img instagram"  className={styles.img}/>
                </div>
                <div className={styles.div}>
                    <p>Escribinos por WhatsApp</p>
                    <img src="src/assets/whatsapp.png" alt="img whatsapp"  className={styles.img}/>
                </div>
            </footer>
        </>
    )
}

export default Footer;