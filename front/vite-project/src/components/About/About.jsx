import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Quienes somos...</h1>
      <p className={styles.p}>
        En MAGMA Spa, somos una empresa dirigida a las mujeres y hombres que
        quieren potenciar su belleza natural, con tratamientos no invasivos, y
        una atención personalizada por los mejores profesionales.
      </p>
      <div className={styles.div}>
        <p>
          Contamos con más de 10 años de experiencia en todas las áreas de
          belleza. Contamos con peluqueros expertos en colorimetria y
          tratamientos de nutrición y alisados sin formol, con productos
          aprobados por el ANMAT.
        </p>
        <div className={styles.imgcontainer}>
          <img
            src="src/assets/alisados.jpeg"
            alt="img alisados"
            className={styles.img}
          />
          <img
            src="src/assets/color.jpeg"
            alt="img nutricion"
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.div}>
        <p>
          También tenemos expertos en colocaciónd de pestañas y perfilado de
          cejas, y las mejores limpiezas faciales profundas
        </p>
        <div className={styles.imgcontainer}>
          <img
            src="src/assets/pestanias-cejas.jpeg"
            alt="img pestanas"
            className={styles.img}
          />
          <img
            src="src/assets/faciales.jpeg"
            alt="img faciales"
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.div}>
        <p>
          Contamos con bronceador natural de piel y depilacion laser con la mas
          alta tecnologia en el mercado.
        </p>
        <div className={styles.imgcontainer}>
          <img
            src="src/assets/alisados.jpeg"
            alt="img depilacion"
            className={styles.img}
          />
          <img
            src="src/assets/bronceado.jpeg"
            alt="img bronceador"
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
