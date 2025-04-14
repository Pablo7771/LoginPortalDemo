<template>
  <form class="login-form" @submit.prevent="submit">
    <h1 class="login-title">{{ $t("login.title") }}</h1>
    <p class="login-subtitle">{{ $t("login.subtitle") }}</p>

    <v-alert v-if="showUnauthorizeMessage" class="alert-error" color="error" dense text type="error">
      {{ $t("login.unauthorized") }}
    </v-alert>

    <v-text-field v-model="usercode" :label="$t('login.usercode')" autocomplete="usercode" dense name="usercode" outlined
      persistent-placeholder class="input-field" />

    <v-text-field v-model="password" :label="$t('login.password')"
      :append-icon="passwordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      :type="passwordVisible ? 'text' : 'password'" autocomplete="password" dense name="password" outlined
      persistent-placeholder class="input-field" @click:append="passwordVisible = !passwordVisible"
      @keyup.enter="submit()" />

    <div class="login-actions">
      <v-btn type="submit" color="primary" block class="login-btn">
        {{ $t("login.loginButton") }}
      </v-btn>

      <v-btn color="secondary" block class="login-btn" @click="$router.push('/register')">
        {{ $t("login.createAccount") }}
      </v-btn>
    </div>
  </form>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import axios from "axios";
import i18n from "@/i18n";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const usercode = ref("");
    const password = ref("");
    const showUnauthorizeMessage = ref(false);
    const alertMessage = ref(null);
    const passwordVisible = ref(false);
    const loading = ref(false);

    const availableLanguages = [
      { code: "ca", label: "Català" },
      { code: "es", label: "Español" },
      { code: "fr", label: "Français" },
      { code: "en", label: "English" },
    ];

    const currentLang = ref(i18n.locale);

    const changeLanguage = (code: string) => {
      i18n.locale = code;
      currentLang.value = code;
    };

    const languageLabel = computed(() => {
      const lang = availableLanguages.find((l) => l.code === currentLang.value);
      return lang ? lang.label : "Idioma";
    });

    async function submit() {
      try {
        loading.value = true;
        alertMessage.value = null;
        showUnauthorizeMessage.value = false;

        await axios.post(
          `/login`,
          new URLSearchParams({
            usercode: usercode.value,
            password: password.value,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }
        );

        location.replace("/app");
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
      usercode,
      password,
      submit,
      loading,
      showUnauthorizeMessage,
      passwordVisible,
      availableLanguages,
      changeLanguage,
      currentLang,
      languageLabel,
    };
  },
});
</script>
  
<style scoped>
.login-form {
  max-width: 400px;
  width: 80%;
  margin: 0 auto;
  padding: 24px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.login-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
}

.login-subtitle {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

.alert-error {
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 12px;
}

.login-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.login-btn {
  font-size: 14px;
  text-transform: none;
  font-weight: 500;
  letter-spacing: 1px;
}

.login-btn:hover {
  opacity: 0.9;
}
</style>
  