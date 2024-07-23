import About from "../../components/About/About";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.p}>Queremos que nos conozcas! Por eso, en esta sección te contamos un poco sobre nosotros!</p>
      </div>
      <About />
    </>
  );
};

export default AboutUs;
