<template>
    <form class="login-form" @submit.prevent="submit">
      <h1 class="login-title">{{ $t("login.title") }}</h1>
      <p class="login-subtitle">{{ $t("login.subtitle") }}</p>
  
      <!-- Alerta por campos requeridos -->
      <v-alert
        v-if="showRequiredFieldsMessage"
        class="alert-error"
        type="warning"
        color="warning"
        dense
        text
      >
        {{ $t("login.requiredFields") }}
      </v-alert>
  
      <!-- Alerta por error 401 -->
      <v-alert
        v-if="showUnauthorizedMessage"
        class="alert-error"
        type="error"
        color="error"
        dense
        text
      >
        {{ $t("login.unauthorized") }}
      </v-alert>
  
      <v-text-field
        v-model="username"
        :label="$t('login.usercode')"
        :error="showRequiredFieldsMessage && !username"
        name="username"
        autocomplete="username"
        outlined
        dense
        persistent-placeholder
        class="input-field"
      />
  
      <v-text-field
        v-model="password"
        :label="$t('login.password')"
        :error="showRequiredFieldsMessage && !password"
        :append-icon="passwordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        autocomplete="current-password"
        outlined
        dense
        persistent-placeholder
        class="input-field"
        @click:append="togglePasswordVisibility"
        @keyup.enter="submit"
      />
  
      <div class="login-actions">
        <v-btn
          type="submit"
          color="primary"
          block
          class="login-btn"
          :loading="loading"
          :disabled="loading"
        >
          {{ $t("login.loginButton") }}
        </v-btn>
  
        <v-btn
          color="secondary"
          block
          class="login-btn"
          @click="$router.push('/register')"
        >
          {{ $t("login.createAccount") }}
        </v-btn>
      </div>
    </form>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, computed } from "vue";
import axios from "axios";
import i18n from "@/plugins/i18n";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const username = ref("");
    const password = ref("");
    const passwordVisible = ref(false);
    const loading = ref(false);
    const showUnauthorizedMessage = ref(false);
    const showRequiredFieldsMessage = ref(false);

    const currentLang = ref(i18n.locale);

    const availableLanguages = [
      { code: "ca", label: "Català" },
      { code: "es", label: "Español" },
      { code: "fr", label: "Français" },
      { code: "en", label: "English" },
    ];

    const languageLabel = computed(() => {
      const lang = availableLanguages.find((l) => l.code === currentLang.value);
      return lang?.label || "Idioma";
    });

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const changeLanguage = (code: string) => {
      i18n.locale = code;
      currentLang.value = code;
    };

    const submit = async () => {
      showRequiredFieldsMessage.value = false;
      showUnauthorizedMessage.value = false;

      if (!username.value || !password.value) {
        showRequiredFieldsMessage.value = true;
        return;
      }

      loading.value = true;

      try {
        await axios.post(
          "/login",
          new URLSearchParams({
            username: username.value,
            password: password.value,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        location.replace("/app");
      } catch (error: any) {
        if (error.response?.status === 401) {
          showUnauthorizedMessage.value = true;
        }
      } finally {
        loading.value = false;
      };
      
    };

    return {
      username,
      password,
      passwordVisible,
      togglePasswordVisibility,
      loading,
      showUnauthorizedMessage,
      showRequiredFieldsMessage,
      submit,
      availableLanguages,
      currentLang,
      changeLanguage,
      languageLabel,
    };
  },
});
</script>

<style scoped>
    .login-form {
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
        padding: 24px;
        backdrop-filter: blur(10px);
        color: #333;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .login-title {
        font-size: 28px;
        font-weight: 600;
        color: #222;
        text-align: center;
        margin-bottom: 8px;
    }

    .login-subtitle {
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-bottom: 20px;
    }

    .alert-error {
        margin-bottom: 16px;
    }

    .input-field {
        margin-bottom: 16px;
    }

    .login-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 24px;
    }

    .login-btn {
        font-weight: 500;
        font-size: 15px;
        text-transform: none;
    }
</style>
