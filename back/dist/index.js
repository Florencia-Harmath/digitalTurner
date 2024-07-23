"use strict";
//INTERFACES
//ENUM
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["GUEST"] = "guest";
})(UserRole || (UserRole = {}));
//USUARIOS
const usuario11 = {
    name: "Micaela",
    age: 22,
    email: "mica@mail.com",
    active: true,
    role: UserRole.USER,
    favorites: ["cejas", "ejercicio"]
};
const usuario2 = {
    name: "Ana",
    age: 30,
    email: "ana@mail.com",
    phone: 2258741,
    active: true,
    role: UserRole.USER,
    favorites: ["pestañas", "depilación"]
};
const usuario3 = {
    name: "Mila",
    age: 20,
    email: "mila@mail.com",
    phone: 4458741,
    active: false,
    role: UserRole.USER,
    favorites: ["pesas", "faciales"]
};
//SERVICIOS
const service1 = {
    name: "Depilacion con laser",
    description: "Depilación soprano ice con laser, indoloro y rápido, ambos sexos",
    duration: "30 minutos",
    recommendations: "Traer ropa cómoda y holgada. Rasurarse 24 horas antes del servicio si o si",
    price: 2000
};
const service2 = {
    name: "Extensiones de pestañas",
    description: "Colocacion de extensiones de pestañas pelo por pelo, incluye limpiza de parpados",
    duration: 120,
    recommendations: "Traer las pestañaas limpias, no recomendado para personas que sufren alergias o usan lentes de contacto, venir con tiempo",
    price: 15000
};
const service3 = {
    name: "Limpieza facial completa",
    description: "Limpieza  facial completa, incluye punta de diamante, masaje, hidratación y protector solar",
    duration: 60,
    recommendations: "No recomendado para pieles sensibles o enfermedad cutanea de base",
    price: 9000
};
//TURNOS
const appointment11 = {
    service: service3,
    user: usuario11,
    date: new Date(),
    active: true
};
const appointment = {
    service: service2,
    user: usuario3,
    date: new Date(),
    active: false
};
const appointment3 = {
    service: service1,
    user: usuario2,
    date: new Date(),
    active: true
};
//FUNCIONES
function saludar(user, appointment) {
    return `Hola ${user.name}, tu turno para ${appointment.service.name} ha sido asignado correctamente.`;
}
console.log(saludar(usuario2, appointment3));
