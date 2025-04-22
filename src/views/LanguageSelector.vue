<template>
    <v-card-actions class="justify-end language-selector">
        <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" class="language-btn justify-center">
                    <img :src="languageFlag" alt="Flag" class="language-flag" />
                    {{ languageLabel }}
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="lang in availableLanguages" :key="lang.code" @click="changeLanguage(lang.code)">
                    <img :src="getFlag(lang.code)" alt="flag" class="language-flag" />
                    <v-list-item-title>{{ lang.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-card-actions>
</template>
  
<script>

import { ref, computed } from "vue";
import i18n from "@/plugins/i18n";
import { EventBus } from "./test"; // Assuming you have an EventBus setup

export default {
    name: "LanguageSelector",
    setup() {
        const availableLanguages = [
            { code: "es", label: "Español" },
            { code: "ca", label: "Català" },
            { code: "fr", label: "Français" },
            { code: "en", label: "English" },
        ];

        const currentLang = ref(i18n.locale);

        const getFlag = (code) => {
            const flags = {
                es: require("@/assets/banderas/españa.png"),
                ca: require("@/assets/banderas/catalunya.png"),
                en: require("@/assets/banderas/reino-unido.png"),
                fr: require("@/assets/banderas/francia.png"),
            };
            return flags[code] || "";
        };

        const languageFlag = computed(() => getFlag(currentLang.value));

        const changeLanguage = (code) => {
            i18n.locale = code;
            currentLang.value = code;
            EventBus.$emit('mensaje-cambiado', code);
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
            languageFlag,
            getFlag,
        };
    },
};
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
    text-align: center;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-size: 12px;
    transition: background 0.3s;
    width: 120px;
    height: 40px;
    justify-content: flex-start;
}

.language-btn:hover {
    background: rgba(0, 0, 0, 0.7);
}

.language-flag {
    width: 25px;
    height: 20px;
    margin-right: 8px;
    border-radius: 0;
    object-fit: cover;
}

.v-list-item-title {
    font-size: 14px;
    padding-left: 8px;
}
</style>
  