// validate.js
const validateRegisterForm = (formData) => {
    const errors = {};
    const validationRules = {
      name: {
        required: true,
      },
      email: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
        message: "Dirección de correo electrónico inválida",
      },
      birthdate: {
        required: true,
        minAge: 16,
      ageMessage: "Debe tener al menos 16 años para registrarse"
      },
      password: {
        required: true,
        minLength: 8,
        message: "La contraseña debe tener al menos 8 caracteres",
      },
      confirmPassword: {
        required: true,
        minLength: 8,
        message: "La contraseña debe tener al menos 8 caracteres",
      },
    };
  
    Object.entries(validationRules).forEach(([fieldName, rules]) => {
        if (rules.required && !formData[fieldName]) {
          errors[fieldName] = "Campo requerido";
        } else if (fieldName === "birthdate") {
          const birthdate = new Date(formData[fieldName]);
          const today = new Date();
          const minAgeDate = new Date(today.getFullYear() - rules.minAge, today.getMonth(), today.getDate());
          if (birthdate > minAgeDate) {
            errors[fieldName] = rules.ageMessage;
          }
        } else if (rules.pattern && !rules.pattern.test(formData[fieldName])) {
          errors[fieldName] = rules.message;
        } else if (rules.minLength && formData[fieldName].length < rules.minLength) {
          errors[fieldName] = rules.message;
        }
      });
  
    return errors;
  };
  

const validateLoginForm = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "El nombre de usuario es requerido";
    }
    if (!formData.password) {
        errors.password = "La contraseña es requerida";
    }

    return errors;
};

const validateAppointment = (formData)=> {
  const errors = {};

  if(!formData.date){
    errors.date = "La fecha es requerida";
  }

  if(!formData.time){
    errors.time = "La hora es requerida";
  }

  if(!formData.serviceName){
    errors.serviceName = "El servicio es requerido";
  }

  return errors
}


export { validateRegisterForm, validateLoginForm, validateAppointment };
