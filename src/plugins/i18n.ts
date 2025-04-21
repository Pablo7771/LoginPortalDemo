import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const messages = {
    en: {
        login: {
            title: "Log in",
            subtitle: "Fill the form to access your account:",
            usercode: "User code",
            password: "Password",
            loginButton: "Sign in",
            createAccount: "Create new account",
            unauthorized: "Unauthorized: incorrect user or password",
            guestContinue: "View Forms"
        },
        register: {
            title: "Create Account",
            usercode: "User code",
            email: "Email",
            phone: "Phone",
            region: "Region",
            city: "City",
            password: "Password",
            confirmPassword: "Confirm Password",
            submit: "Register",
            haveAccount: "Already have an account? Log in",
            submitSuccess: "✅ Registration Successful",
            submitError: "❌ There was an error during registration",
            rules: {
                usercode: {
                    required: "Required name",
                    invalid: "Invalid name",
                },
                email: {
                    required: "Email is required",
                    invalid: "Invalid email"
                },
                phone: {
                    required: "Phone is required",
                    invalid: "Invalid phone number"
                },
                password: {
                    required: "Password is required",
                    min: "Minimum 6 characters"
                },
                passwordMatch: "Passwords do not match"
            }
        },
        medicalAppointment: {
            // Títulos y botones
            agendar_cita_medica: "Schedule Medical Appointment",
            cerrar: "Close",
            paso_1: "Patient Information",
            paso_2: "Specialty",
            paso_3: "Doctor",
            paso_4: "Date",
            paso_5: "Time",
            generar_cita: "Generate Appointment",
            cancelar: "Cancel",
            confirmar: "Confirm",

            // Campos de formulario
            nombre: "First Name",
            apellido: "Last Name",
            email: "Email",
            telefono: "Phone",
            foto_dni: "ID Photo",

            // Especialidad y médico
            especialidad: "Specialty",
            medico: "Doctor",
            imagen_especialidad: "Specialty Image",
            foto_medico: "Doctor's Photo",

            // Fecha
            dia_seleccionado: "Selected Day",

            // Resumen de cita
            resumen_cita: "Appointment Summary",
            dia: "Day",
            hora: "Time",

            // Botones de navegación
            anterior: "Previous",
            siguiente: "Next",
            available: "Available",

            // Reglas de validación
            rules: {
                nombre_requerido: "First name is required",
                apellido_requerido: "Last name is required",
                email_requerido: "Email is required",
                email_invalido: "Must be a valid email",
                telefono_requerido: "Phone number is required",
                telefono_invalido: "Phone number must contain only numbers and be between 5 and 20 digits",
                foto_dni_requerida: "ID photo is required",
            }
        },
        templates: {
            title: "What would you like to do?",
            delivery: {
                title: "Request Delivery",
                description: "Place an order for delivery to your location.",
                button: "Order now"
            },
            medicalAppointment: {
                title: "Schedule Appointment",
                description: "Book an appointment with a healthcare provider.",
                button: "Schedule now"
            },
            providers: {
                title: "Register Provider",
                description: "Quickly and easily add new providers to the system.",
                button: "Register"
            },
            backHome: "Back to home"
        }
    },
    es: {
        login: {
            title: "Iniciar sesión",
            subtitle: "Complete el formulario para iniciar sesión:",
            usercode: "Código de usuario",
            password: "Contraseña",
            loginButton: "Iniciar sesión",
            createAccount: "Crear cuenta nueva",
            unauthorized: "No autorizado: usuario o contraseña incorrectos",
            guestContinue: "Visualizar formularios"
        },
        register: {
            title: "Crear Cuenta",
            usercode: "Código de usuario",
            email: "Correo electrónico",
            phone: "Teléfono",
            region: "Región",
            city: "Ciudad",
            password: "Contraseña",
            confirmPassword: "Confirmar Contraseña",
            submit: "Registrarse",
            haveAccount: "¿Ya tienes cuenta? Inicia sesión",
            submitSuccess: "✅ Registro exitoso",
            submitError: "❌ Hubo un error al registrarse",
            rules: {
                usercode: {
                    required: "Nombre requerido",
                    invalid: "Nombre inválido"
                },
                email: {
                    required: "El correo es requerido",
                    invalid: "Correo inválido"
                },
                phone: {
                    required: "Teléfono requerido",
                    invalid: "Número inválido"
                },
                password: {
                    required: "La contraseña es requerida",
                    min: "Mínimo 6 caracteres"
                },
                passwordMatch: "Las contraseñas no coinciden"
            }
        },
        medicalAppointment: {
            // Títulos y botones
            agendar_cita_medica: "Agendar Cita Médica",
            cerrar: "Cerrar",
            paso_1: "Datos del paciente",
            paso_2: "Especialidad",
            paso_3: "Médico",
            paso_4: "Fecha",
            paso_5: "Hora",
            generar_cita: "Generar Cita",
            cancelar: "Cancelar",
            confirmar: "Confirmar",
            // Campos de formulario
            nombre: "Nombre",
            apellido: "Apellido",
            email: "Email",
            telefono: "Teléfono",
            foto_dni: "Foto del DNI",
            // Especialidad y médico
            especialidad: "Especialidad",
            medico: "Médico",
            imagen_especialidad: "Imagen especialidad",
            foto_medico: "Foto del médico",
            // Fecha
            dia_seleccionado: "Día seleccionado",
            // Resumen de cita
            resumen_cita: "Resumen de la Cita",
            dia: "Día",
            hora: "Hora",
            // Botones de navegación
            anterior: "Anterior",
            siguiente: "Siguiente",
            available: "Disponible",
            rules: {

                // Reglas de validación
                nombre_requerido: "El nombre es requerido",
                apellido_requerido: "El apellido es requerido",
                email_requerido: "El email es requerido",
                email_invalido: "Debe ser un email válido",
                telefono_requerido: "El teléfono es requerido",
                telefono_invalido: "El teléfono debe contener solo números y tener entre 5 y 20 dígitos",
                foto_dni_requerida: "La foto del DNI es requerida",
            }
        },
        templates: {
            title: "¿Qué deseas hacer?",
            delivery: {
                title: "Pedir Delivery",
                description: "Realiza un pedido para que lo entreguen a tu ubicación.",
                button: "Pedir ahora"
            },
            medicalAppointment: {
                title: "Agendar Cita",
                description: "Reserva una cita con un proveedor de salud.",
                button: "Agendar ahora"
            },
            providers: {
                title: "Registrar Proveedor",
                description: "Agrega nuevos proveedores al sistema de manera rápida y sencilla.",
                button: "Registrar"
            },
            backHome: "Volver al inicio"
        }
    },
    ca: {
        login: {
            title: "Iniciar sessió",
            subtitle: "Completa el formulari per iniciar sessió:",
            usercode: "Codi d'usuari",
            password: "Contrasenya",
            loginButton: "Iniciar sessió",
            createAccount: "Crear un compte nou",
            unauthorized: "No autoritzat: usuari o contrasenya incorrectes",
            guestContinue: "Visualitzar formularis"
        },
        register: {
            title: "Crear Compte",
            usercode: "Codi d'usuari",
            email: "Correu electrònic",
            phone: "Telèfon",
            region: "Regió",
            city: "Ciutat",
            password: "Contrasenya",
            confirmPassword: "Confirmar Contrasenya",
            submit: "Registrar-se",
            haveAccount: "Ja tens compte? Inicia sessió",
            submitSuccess: "✅ Registre realitzat amb èxit",
            submitError: "❌ Hi ha hagut un error en registrar-se",
            rules: {
                usercode: {
                    required: "Nom requerit",
                    invalid: "Nom invàlid",
                },
                email: {
                    required: "El correu és requerit",
                    invalid: "Correu invàlid"
                },
                phone: {
                    required: "Telèfon requerit",
                    invalid: "Número invàlid"
                },
                password: {
                    required: "La contrasenya és requerida",
                    min: "Mínim 6 caràcters"
                },
                passwordMatch: "Les contrasenyes no coincideixen"
            }
        },
        medicalAppointment: {
            // Títulos y botones
            agendar_cita_medica: "Programar Cita Mèdica",
            cerrar: "Tancar",
            paso_1: "Dades del pacient",
            paso_2: "Especialitat",
            paso_3: "Metge",
            paso_4: "Data",
            paso_5: "Hora",
            generar_cita: "Generar Cita",
            cancelar: "Cancel·lar",
            confirmar: "Confirmar",

            // Campos de formulario
            nombre: "Nom",
            apellido: "Cognom",
            email: "Correu electrònic",
            telefono: "Telèfon",
            foto_dni: "Foto de l'ID",

            // Especialidad y médico
            especialidad: "Especialitat",
            medico: "Metge",
            imagen_especialidad: "Imatge de l'especialitat",
            foto_medico: "Foto del metge",

            // Fecha
            dia_seleccionado: "Dia seleccionat",

            // Resumen de cita
            resumen_cita: "Resum de la Cita",
            dia: "Dia",
            hora: "Hora",

            // Botones de navegación
            anterior: "Anterior",
            siguiente: "Següent",
            available: "Disponible",

            // Reglas de validación
            rules: {
                nombre_requerido: "El nom és requerit",
                apellido_requerido: "Els cognoms són requerits",
                email_requerido: "El correu electrònic és requerit",
                email_invalido: "Ha de ser un correu electrònic vàlid",
                telefono_requerido: "El telèfon és requerit",
                telefono_invalido: "El telèfon ha de contenir només números i tenir entre 5 i 20 dígits",
                foto_dni_requerida: "La foto de l'ID és requerida",
            }
        },
        templates: {
            title: "Què vols fer?",
            delivery: {
                title: "Demanar Repartiment",
                description: "Fes una comanda perquè et portin el producte a la ubicació.",
                button: "Demanar ara"
            },
            medicalAppointment: {
                title: "Agendar Cita",
                description: "Reserva una cita amb un professional de la salut.",
                button: "Agendar ara"
            },
            providers: {
                title: "Registrar Proveïdor",
                description: "Afegeix nous proveïdors al sistema de manera ràpida i senzilla.",
                button: "Registrar"
            },
            backHome: "Tornar a l'inici"
        }
    },
    fr: {
        login: {
            title: "Connexion",
            subtitle: "Remplissez le formulaire pour vous connecter :",
            usercode: "Nom d'utilisateur",
            password: "Mot de passe",
            loginButton: "Se connecter",
            createAccount: "Créer un nouveau compte",
            unauthorized: "Non autorisé : nom d'utilisateur ou mot de passe incorrect",
            guestContinue: "Visualiser les formulaires"
        },
        register: {
            title: "Créer un Compte",
            usercode: "Nom d'utilisateur",
            email: "Email",
            phone: "Téléphone",
            region: "Région",
            city: "Ville",
            password: "Mot de passe",
            confirmPassword: "Confirmer le Mot de Passe",
            submit: "S'inscrire",
            haveAccount: "Vous avez déjà un compte ? Connectez-vous",
            submitSuccess: "✅ Inscription réussie",
            submitError: "❌ Une erreur s'est produite lors de l'inscription",
            rules: {
                usercode: {
                    required: "Nom requis",
                    invalid: "Nom invalide"
                },
                email: {
                    required: "L'email est requis",
                    invalid: "Email invalide"
                },
                phone: {
                    required: "Le téléphone est requis",
                    invalid: "Numéro invalide"
                },
                password: {
                    required: "Le mot de passe est requis",
                    min: "Minimum 6 caractères"
                },
                passwordMatch: "Les mots de passe ne correspondent pas"
            }
        },
        medicalAppointment: {
            agendar_cita_medica: "Prendre un Rendez-vous Médical",
            cerrar: "Fermer",
            paso_1: "Informations du patient",
            paso_2: "Spécialité",
            paso_3: "Médecin",
            paso_4: "Date",
            paso_5: "Heure",
            generar_cita: "Générer un Rendez-vous",
            cancelar: "Annuler",
            confirmar: "Confirmer",

            nombre: "Prénom",
            apellido: "Nom",
            email: "Email",
            telefono: "Téléphone",
            foto_dni: "Photo de l'ID",

            especialidad: "Spécialité",
            medico: "Médecin",
            imagen_especialidad: "Image de la spécialité",
            foto_medico: "Photo du médecin",

            dia_seleccionado: "Jour sélectionné",

            resumen_cita: "Résumé du Rendez-vous",
            dia: "Jour",
            hora: "Heure",

            anterior: "Précédent",
            siguiente: "Suivant",
            available: "Disponible",

            rules: {
                nombre_requerido: "Le prénom est requis",
                apellido_requerido: "Le nom est requis",
                email_requerido: "L'email est requis",
                email_invalido: "Doit être un email valide",
                telefono_requerido: "Le numéro de téléphone est requis",
                telefono_invalido: "Le numéro doit contenir uniquement des chiffres et avoir entre 5 et 20 caractères",
                foto_dni_requerida: "La photo de l'ID est requise"
            }
        },
        templates: {
            title: "Que souhaitez-vous faire ?",
            delivery: {
                title: "Demander une Livraison",
                description: "Passez une commande pour la livraison à votre emplacement.",
                button: "Commander maintenant"
            },
            medicalAppointment: {
                title: "Prendre un Rendez-vous",
                description: "Réservez un rendez-vous avec un professionnel de santé.",
                button: "Prendre rendez-vous"
            },
            providers: {
                title: "Enregistrer un Fournisseur",
                description: "Ajoutez rapidement et facilement de nouveaux fournisseurs au système.",
                button: "Enregistrer"
            },
            backHome: "Retour à l'accueil"
        }
    }
};

const i18n = new VueI18n({
    locale: 'es', // predeterminado
    fallbackLocale: 'ca', // idioma de reserva
    messages,
});

export default i18n;
