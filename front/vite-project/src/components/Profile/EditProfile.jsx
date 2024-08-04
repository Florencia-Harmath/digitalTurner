import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user); // Asegúrate de que la selección sea de `state.auth`
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBirthdate(user.birthdate);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {};

    if (name && name !== user.name) updatedData.name = name;
    if (email && email !== user.email) updatedData.email = email;
    if (birthdate && birthdate !== user.birthdate) updatedData.birthdate = birthdate;

    if (password && newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        return toast.error("Las nuevas contraseñas no coinciden");
      }
      updatedData.password = password;
      updatedData.newPassword = newPassword;
    }

    try {
      await axios.put(`/api/users/${user.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Perfil actualizado exitosamente.");
      navigate('/profile');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      toast.error("Error al actualizar el perfil.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del botón
    navigate('/profile');
  };

  const formatPasswordDisplay = (password) => {
    if (!password) return '';
    const visibleChars = password.substring(0, 5);
    const hiddenChars = password.substring(5);
    return visibleChars + '•'.repeat(hiddenChars.length);
  };

  return (
    <div className={styles.contenedor}>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user.name}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user.email}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder={user.birthdate.split('T')[0]} // Para que la fecha se muestre en formato YYYY-MM-DD
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña actual:</label>
          <input
            type="text" // Usar type="text" para mostrar el texto formateado
            value={formatPasswordDisplay(password)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Confirmar nueva contraseña:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button className={styles.btn} type="submit">Actualizar</button>
        <button className={styles.btn} onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditProfile;
