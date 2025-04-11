import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    en: {
        login: {
            title: "Log in",
            subtitle: "Fill the form to access your account:",
            username: "Username",
            password: "Password",
            loginButton: "LOG IN",
            createAccount: "Create new account",
            unauthorized: "Unauthorized: incorrect user or password"
        },
        register: {
            title: "Create Account",
            fullName: "Full Name",
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
                name: "Name is required",
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
        }
    },
    es: {
      login: {
        title: "Iniciar sesión",
        subtitle: "Complete el formulario para iniciar sesión:",
        username: "Código de usuario",
        password: "Contraseña",
        loginButton: "INICIAR SESIÓN",
        createAccount: "Crear cuenta nueva",
        unauthorized: "No autorizado: usuario o contraseña incorrectos"
      },
      register: {
            title: "Crear Cuenta",
            fullName: "Nombre completo",
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
                name: "Nombre requerido",
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
        }
    },
    ca: {
        login: {
            title: "Iniciar sessió",
            subtitle: "Completa el formulari per iniciar sessió:",
            username: "Codi d'usuari",
            password: "Contrasenya",
            loginButton: "INICIAR SESSIÓ",
            createAccount: "Crear un compte nou",
            unauthorized: "No autoritzat: usuari o contrasenya incorrectes"
        },
        register: {
            title: "Crear Compte",
            fullName: "Nom complet",
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
                name: "Nom requerit",
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
        }
    },
    fr: {
        login: {
            title: "Connexion",
            subtitle: "Remplissez le formulaire pour vous connecter :",
            username: "Nom d'utilisateur",
            password: "Mot de passe",
            loginButton: "SE CONNECTER",
            createAccount: "Créer un nouveau compte",
            unauthorized: "Non autorisé : nom d'utilisateur ou mot de passe incorrect"
        },
        register: {
            title: "Créer un Compte",
            fullName: "Nom Complet",
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
                name: "Le nom est requis",
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
        }
    }
}

const i18n = new VueI18n({
  locale: 'ca', // predeterminado
  fallbackLocale: 'es', // idioma de reserva
  messages,
});

export default i18n;