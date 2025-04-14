<template>
    <div class="register-form-wrapper">
        <h2 class="headline font-weight-bold text-center mb-5">
            {{ $t('register.title') }}
        </h2>

        <form ref="form" @submit.prevent="submit" class="register-form">
            <v-text-field v-model="usercode" :label="$t('register.usercode')" :rules="usercodeRules"
                required outlined dense prepend-icon="mdi-account-key" class="input-field" />

            <v-text-field v-model="email" :label="$t('register.email')" :rules="emailRules" required outlined dense
                prepend-icon="mdi-email" class="input-field" />

            <v-text-field v-model="phone" :label="$t('register.phone')" :rules="phoneRules" required outlined dense
                prepend-icon="mdi-phone" class="input-field" />

            <v-select v-model="region" :items="Object.keys(regiones)" :label="$t('register.region')" required outlined dense
                prepend-icon="mdi-earth" @change="loadCiudades" class="input-field" />

            <v-select v-model="ciudad" :items="ciudades" :label="$t('register.city')" :disabled="!region" required outlined
                dense prepend-icon="mdi-city" class="input-field" />

            <v-text-field v-model="password" :label="$t('register.password')" :rules="passwordRules" type="password"
                required outlined dense prepend-icon="mdi-lock" class="input-field" />

            <v-text-field v-model="confirmPassword" :label="$t('register.confirmPassword')"
                :rules="[v => v === password || $t('register.rules.passwordMatch')]" type="password" required outlined dense
                prepend-icon="mdi-lock-check" class="input-field" />

            <v-btn type="submit" color="primary" block class="submit-btn mt-4">
                {{ $t('register.submit') }}
            </v-btn>
        </form>

        <div class="text-center mt-4">
            <v-btn text color="grey" @click="$router.push('/')">
                {{ $t('register.haveAccount') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            usercode: '',
            email: '',
            phone: '',
            region: '',
            ciudad: '',
            password: '',
            confirmPassword: '',
            ciudades: [],
            regiones: {
                "Andalucía": ["Sevilla", "Málaga", "Granada"],
                "Cataluña": ["Barcelona", "Tarragona", "Girona"],
                "Madrid": ["Madrid Capital", "Alcalá de Henares"],
                "Comunidad Valenciana": ["Valencia", "Alicante", "Castellón"],
                "Galicia": ["Santiago", "A Coruña", "Vigo"]
            }
        };
    },
    computed: {
        usercodeRules() {
            return [
                v => !!v || this.$t('register.rules.usercode.required'),
                v => /^[a-zA-Z0-9]{6,20}$/.test(v) || this.$t('register.rules.usercode.invalid'),
            ];
        },
        emailRules() {
            return [
                v => !!v || this.$t('register.rules.email.required'),
                v => /.+@.+\..+/.test(v) || this.$t('register.rules.email.invalid'),
            ];
        },
        phoneRules() {
            return [
                v => !!v || this.$t('register.rules.phone.required'),
                v => /^\d{9}$/.test(v) || this.$t('register.rules.phone.invalid'),
            ];
        },
        passwordRules() {
            return [
                v => !!v || this.$t('register.rules.password.required'),
                v => v.length >= 6 || this.$t('register.rules.password.min'),
            ];
        },
    },
    methods: {
        loadCiudades() {
            this.ciudades = this.regiones[this.region] || [];
            this.ciudad = '';
        },
        submit() {
            if (this.$refs.form.validate()) {
                const payload = {
                    usercode: this.usercode,
                    email: this.email,
                    phone: this.phone,
                    region: this.region,
                    ciudad: this.ciudad,
                    password: this.password,
                };

                fetch('/api/service/rest/demo_portal/public_demo/v1/api/registro_demo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJleHAiOjQxMDI0NDEyMDAsInVzciI6ImVjb21fdXNlciJ9.6fLJ2VriBl82xM9suCTnaq_GBCrgfJSYi_-i0RKGsVkauinTWcXVkzoxbSpsNhcb'
                    },
                    body: JSON.stringify(payload),
                })
                    .then(async response => {
                        if (!response.ok) {
                            const error = await response.text();
                            throw new Error(error || this.$t('register.submitError'));
                        }
                        alert(this.$t('register.submitSuccess'));
                        this.$router.push('/');
                    })
                    .catch(err => {
                        console.error(err);
                        alert(this.$t('register.submitError'));
                    });
            }
        },
    },
    watch: {
        '$i18n.locale': 'updateValidationRules',  // Observa el cambio de idioma
    },
    methods: {
        updateValidationRules() {
            // Este método fuerza la actualización de las reglas de validación
            this.$forceUpdate();
        },
    }
};
</script>

<style scoped>
    .register-form-wrapper {
        max-width: 400px;
        width: 80%;
        padding: 24px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.1);
        color: #333;
        margin: 0 auto;
    }

    .register-form {
        display: flex;
        flex-direction: column;
    }

    .input-field {
        margin-bottom: 16px;
    }

    .submit-btn {
        font-size: 16px;
        font-weight: 600;
        text-transform: none;
        letter-spacing: 1px;
    }

    .submit-btn:hover {
        opacity: 0.9;
    }

    .v-btn {
        font-size: 14px;
        text-transform: none;
    }
</style>
