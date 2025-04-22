<template>
    <v-btn text class="mt-6 btnTemplates" @click="goToTemplates">
        <v-icon left>mdi-list-box</v-icon>
        {{ $t('login.guestContinue') }}
    </v-btn>
</template>
  
  
<script>
export default {
    name: "BtnTemplates",
    methods: {
        goToTemplates() {
            // Navegación usando this.$router en Vue 2
            this.$router.push("/templates");
        },
    },
};
</script>

<style scoped>
.btnTemplates {
    text-transform: none;
}
</style>