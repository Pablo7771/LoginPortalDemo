<template>
  <v-card class="register-form-card" elevation="8">
    <v-card-title class="headline font-weight-bold justify-center">{{ $t('register.title') }}</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :label="$t('register.fullName')"
          :rules="[v => !!v || $t('register.rules.name')]"
          required
          outlined
          dense
          prepend-icon="mdi-account"
          class="input-field"
        />

        <v-text-field
          v-model="email"
          :label="$t('register.email')"
          :rules="emailRules"
          required
          outlined
          dense
          prepend-icon="mdi-email"
          class="input-field"
        />

        <v-text-field
          v-model="phone"
          :label="$t('register.phone')"
          :rules="phoneRules"
          required
          outlined
          dense
          prepend-icon="mdi-phone"
          class="input-field"
        />

        <v-select
          v-model="region"
          :items="Object.keys(regiones)"
          :label="$t('register.region')"
          required
          outlined
          dense
          prepend-icon="mdi-earth"
          @change="loadCiudades"
          class="input-field"
        />

        <v-select
          v-model="ciudad"
          :items="ciudades"
          :label="$t('register.city')"
          :disabled="!region"
          required
          outlined
          dense
          prepend-icon="mdi-city"
          class="input-field"
        />

        <v-text-field
          v-model="password"
          :label="$t('register.password')"
          :rules="passwordRules"
          type="password"
          required
          outlined
          dense
          prepend-icon="mdi-lock"
          class="input-field"
        />

        <v-text-field
          v-model="confirmPassword"
          :label="$t('register.confirmPassword')"
          :rules="[v => v === password || $t('register.rules.passwordMatch')]"
          type="password"
          required
          outlined
          dense
          prepend-icon="mdi-lock-check"
          class="input-field"
        />

        <v-btn color="primary" block class="submit-btn mt-4" @click="submit">
          {{ $t('register.submit') }}
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn text color="grey" @click="$router.push('/')">
        {{ $t('register.haveAccount') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      phone: '',
      region: '',
      ciudad: '',
      password: '',
      confirmPassword: '',
      ciudades: [],
      emailRules: [
        v => !!v || this.$t('register.rules.email.required'),
        v => /.+@.+\..+/.test(v) || this.$t('register.rules.email.invalid'),
      ],
      phoneRules: [
        v => !!v || this.$t('register.rules.phone.required'),
        v => /^\d{9}$/.test(v) || this.$t('register.rules.phone.invalid'),
      ],
      passwordRules: [
        v => !!v || this.$t('register.rules.password.required'),
        v => v.length >= 6 || this.$t('register.rules.password.min'),
      ],
      regiones: {
        "Andalucía": ["Sevilla", "Málaga", "Granada"],
        "Cataluña": ["Barcelona", "Tarragona", "Girona"],
        "Madrid": ["Madrid Capital", "Alcalá de Henares"],
        "Comunidad Valenciana": ["Valencia", "Alicante", "Castellón"],
        "Galicia": ["Santiago", "A Coruña", "Vigo"]
      }
    };
  },
  methods: {
    loadCiudades() {
      this.ciudades = this.regiones[this.region] || [];
      this.ciudad = '';
    },
    submit() {
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.name,
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
            'Authorization' : 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJleHAiOjQxMDI0NDEyMDAsInVzciI6ImVjb21fdXNlciJ9.6fLJ2VriBl82xM9suCTnaq_GBCrgfJSYi_-i0RKGsVkauinTWcXVkzoxbSpsNhcb'
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
};
</script>

<style scoped>
.register-form-card {

    max-width: 400px;
    width: 80%;
    padding: 24px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
    color: #333;
    margin: 0 auto;
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

.register-form-card .v-btn {
  font-size: 14px;
  text-transform: none;
}
</style>
