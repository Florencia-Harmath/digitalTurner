import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import styles from "./RegisterFormView.module.css";
import { Link } from "react-router-dom";
const RegisterFormView = () => {
  return (
    <>
    <div className={styles.div}>
      <p className={styles.p}>
        Queremos brindarte la atención más personalizada, por eso te
        solicitamos que llenes el siguiente formulario, para que puedas
        solicitar y cancelar los turnos cuando quieras!
      </p>
    <p className={styles.link}>¿Ya tienes cuenta? <Link to="/login" className={styles.iniciarSesion} >Inicia sesión</Link></p>
    </div>
    <RegisterForm />
    </>
  );
};

export default RegisterFormView;
