<template>
    <v-card-actions
      class="justify-end language-selector"
    >
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="language-btn">
            🌐 {{ languageLabel }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="lang in availableLanguages"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
          >
            <v-list-item-title>{{ lang.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  import i18n from "@/plugins/i18n";
  
  export default defineComponent({
    name: "LanguageSelector",
    setup() { 
      const availableLanguages = [
        { code: "es", label: "Español" },
        { code: "ca", label: "Català" },
        { code: "fr", label: "Français" },
        { code: "en", label: "English" },
      ];
  
      const currentLang = ref(i18n.locale);
  
      const changeLanguage = (code: string) => {
        i18n.locale = code;
        currentLang.value = code;
      };
  
      const languageLabel = computed(() => {
        const match = availableLanguages.find(
          (lang) => lang.code === currentLang.value
        );
        return match ? match.label : "Idioma";
      });
  
      return {
        availableLanguages,
        currentLang,
        changeLanguage,
        languageLabel,
      };
    },
  });
  </script>
  
  <style scoped>
  .language-selector {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1000;
    padding: 0;
  }
  
  .language-btn {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    padding: 8px 16px;
    font-size: 14px;
    transition: background 0.3s;
  }
  
  .language-btn:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  
  .v-list-item-title {
    font-size: 14px;
    padding: 8px 16px;
  }
  </style>
  