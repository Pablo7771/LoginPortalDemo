<template>
  <v-row no-gutters>
    <LoginLeft />
    <LoginRight />
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginLeft from "@/components/LoginLeft.vue";
import LoginRight from "@/components/LoginRight.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginLeft,
    LoginRight
  },
});
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
