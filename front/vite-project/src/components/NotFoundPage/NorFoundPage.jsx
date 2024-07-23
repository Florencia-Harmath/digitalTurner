import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>¡Oops!</h1>
      <p>¡Parece que te has perdido en el ciberespacio!</p>
      <p>La página que buscas no existe.</p>
      <p>¿Quizás quisiste ir a alguna otra parte?</p>
      <Link to="/" className={styles.link}>
        Volver al inicio
      </Link>
      <div className={styles.errorCode}>Error 404: Not Found</div>
      <img
        src="https://media.giphy.com/media/26tPplGWjAX76J0so/giphy.gif"
        alt="Error 404"
        className={styles.image}
      />
    </div>
  );
};

export default NotFoundPage;
