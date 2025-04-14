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
            loginButton: "LOG IN",
            createAccount: "Create new account",
            unauthorized: "Unauthorized: incorrect user or password",
            guestContinue: "Continue Without Registering"
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
                usercode: "Name is required",
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
        "no-signed-up": {
            
        },

    },
    es: {
        login: {
            title: "Iniciar sesión",
            subtitle: "Complete el formulario para iniciar sesión:",
            usercode: "Código de usuario",
            password: "Contraseña",
            loginButton: "INICIAR SESIÓN",
            createAccount: "Crear cuenta nueva",
            unauthorized: "No autorizado: usuario o contraseña incorrectos",
            guestContinue: "Continuar Sin Registrarse"
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
                usercode: "Nombre requerido",
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
        "no-signed-up": {

        },
    },
    ca: {
        login: {
            title: "Iniciar sessió",
            subtitle: "Completa el formulari per iniciar sessió:",
            usercode: "Codi d'usuari",
            password: "Contrasenya",
            loginButton: "INICIAR SESSIÓ",
            createAccount: "Crear un compte nou",
            unauthorized: "No autoritzat: usuari o contrasenya incorrectes",
            guestContinue: "Continuar Sense Registrar-se"
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
                usercode: "Nom requerit",
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
        "no-signed-up": {
            
        }
    },
    fr: {
        login: {
            title: "Connexion",
            subtitle: "Remplissez le formulaire pour vous connecter :",
            usercode: "Nom d'utilisateur",
            password: "Mot de passe",
            loginButton: "SE CONNECTER",
            createAccount: "Créer un nouveau compte",
            unauthorized: "Non autorisé : nom d'utilisateur ou mot de passe incorrect",
            guestContinue: "Continuer Sans S'inscrire"
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
                usercode: "Le nom est requis",
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
        "no-signed-up": {
            
        }
    }
}

const i18n = new VueI18n({
    locale: 'es', // predeterminado
    fallbackLocale: 'ca', // idioma de reserva
    messages,
});

export default i18n;