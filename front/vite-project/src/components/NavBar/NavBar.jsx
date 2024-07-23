import { useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false); // Cierra el menú en dispositivos móviles al hacer clic en un enlace
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.enlacesmenutitulo}>MAGMA Spa</Link>
      <button className={styles.menuToggle} onClick={handleMenuToggle}>
        ☰
      </button>
      <ul className={`${styles.enlacesmenu} ${menuOpen ? styles.active : ''}`}>
        <li className={styles.enlacesmenuitem}>
          <Link to="/about" className={styles.enlacesmenuitemli} onClick={handleLinkClick}>NOSOTROS</Link>
        </li>
        <li className={styles.enlacesmenuitem}>
          <Link to="/turnos" className={styles.enlacesmenuitemli} onClick={handleLinkClick}>TURNOS</Link>
        </li>
        <li className={styles.enlacesmenuitem}>
          <Link to="/profile" className={styles.enlacesmenuitemli} onClick={handleLinkClick}>PERFIL</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
