import styles from "./Home.module.css";
import RegisterFormView from "../RegisterFormView/RegisterFormView";

const Home = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>MAGMA Spa</h1>
      <p className={styles.p}>
        Somos MAGMA, un spa con más de 15 años de experiencia en el rubro de
        belleza. Para solicitar turnos con nosotros, por favor completa el
        formulario de registro e inicia sesión. Recordá que tenés que ser mayor
        de 16 años para registrarse, y en caso de tener 16 o 17 años, por favor
        venir acompañados con un mayor responsable que deberá llenar el
        formulario en forma física de conscentimiento. Gracias por elegirnos!
      </p>

      <div className={styles.divContenedor}>
       <RegisterFormView />
      </div>
    </div>
  );
};

export default Home;
