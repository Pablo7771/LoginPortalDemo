<template>
    <v-col md="5" sm="10" class="login-right-col" align-self="center">

        <LanguageSelector />
        <LoginForm/>
        <router-view />
    </v-col>
</template>
  
<script lang="ts">

import LanguageSelector from "@/components/LanguageSelector.vue"; // Asegúrate de que la ruta sea correcta
import LoginForm from "@/components/LoginForm.vue";
export default {
    name: "LoginRight",
    components: {
        LanguageSelector,
        LoginForm

    },
};
</script>
  
<style scoped>
.login-right-col {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
}
</style>
  