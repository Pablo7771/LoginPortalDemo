<template>
    <v-container fluid class="d-flex fill-height">
      <v-row class="fill-height" align="center" justify="center">
        <LoginLeft />
        <LoginRight />
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import LoginLeft from "@/components/LoginLeft.vue";
  import LoginRight from "@/components/LoginRight.vue";
  
  export default defineComponent({
    name: "LoginLayout",
    components: {
      LoginLeft,
      LoginRight
    }
  });
  </script>
  <style scoped>

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .login-left-col {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }
  .login-right-col {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }
  </style>

  