<template>
  <v-card class=" login-card" elevation="8">
    <v-card-title class="login-title">
      {{ $t("login.title") }}
    </v-card-title>
    
    <v-card-subtitle class="login-subtitle">
      {{ $t("login.subtitle") }}
    </v-card-subtitle>

    <v-alert
      v-if="showUnauthorizeMessage"
      class="alert-error"
      color="error"
      dense
      text
      type="error"
    >
      {{ $t("login.unauthorized") }}
    </v-alert>

    <v-card-text class="login-form">
      <v-text-field
        v-model="username"
        :label="$t('login.username')"
        autocomplete="username"
        dense
        name="username"
        outlined
        persistent-placeholder
        class="input-field"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :label="$t('login.password')"
        :append-icon="passwordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        :type="passwordVisible ? 'text' : 'password'"
        autocomplete="password"
        dense
        name="password"
        outlined
        persistent-placeholder
        class="input-field"
        @click:append="passwordVisible = !passwordVisible"
        @keyup.enter="submit()"
      ></v-text-field>
    </v-card-text>

    <v-card-actions class="login-actions">
      <v-btn 
        @click="submit()" 
        color="primary" 
        block 
        class="login-btn"
      >
        {{ $t("login.loginButton") }}
      </v-btn>

      <v-btn 
        color="secondary" 
        block 
        class="login-btn"
        @click="$router.push('/registro')"
      >
        {{ $t("login.createAccount") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import axios from "axios";
import i18n from "@/i18n";

export default defineComponent({
  name: "LoginView",
  setup() {
    const username = ref('');
    const password = ref('');
    const showUnauthorizeMessage = ref(false);
    const alertMessage = ref(null);
    const passwordVisible = ref(false);
    const loading = ref(false);

    const availableLanguages = [
      { code: 'ca', label: 'Català' },
      { code: 'es', label: 'Español' },
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
    ];

    const currentLang = ref(i18n.locale);

    const changeLanguage = (code: string) => {
      i18n.locale = code;
      currentLang.value = code;
    };

    const languageLabel = computed(() => {
      const lang = availableLanguages.find(l => l.code === currentLang.value);
      return lang ? lang.label : 'Idioma';
    });

    async function submit() {
      try {
        loading.value = true;
        alertMessage.value = null;
        showUnauthorizeMessage.value = false;

        await axios.post(`/login`,
          new URLSearchParams({
            "username": username.value,
            "password": password.value
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        location.replace("/app")
      } catch (error) {
        const response = (error as any).response;
        if (response) {
          if (response.status === 401) {
            showUnauthorizeMessage.value = true;
          } else {
            alertMessage.value = response?.data;
          }
        }
      } finally {
        loading.value = false;
      }
    }

    return {
      username,
      password,
      submit,
      loading,
      showUnauthorizeMessage,
      passwordVisible,
      availableLanguages,
      changeLanguage,
      currentLang,
      languageLabel
    };
  }
});
</script>

<style scoped>
  .login-card {

    max-width: 400px;
    width: 80%;
    padding: 24px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
    color: #333;
    margin: 0 auto;
  }

  .login-title {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }

  .login-subtitle {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
  }

  .alert-error {
    margin-bottom: 20px;
  }

  .login-form {
    padding: 0;
  }

  .input-field {
    margin-bottom: 12px;
  }

  .login-actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
    margin-left: 0px;
}

  .login-btn {
    margin-left: 0px;
    font-size: 14px;
    text-transform: none;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .login-btn:hover {
    opacity: 0.9;
  }
</style>

