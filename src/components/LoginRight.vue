<template>
    <v-col md="5" sm="10" class="login-right-col" align-self="center">
        <router-view />
    </v-col>
</template>
  
<script lang="ts">
export default {
    name: "LoginRight",
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
  