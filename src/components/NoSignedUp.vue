<template>
    <v-btn text class="mt-6" @click="goToTemplates">
        Continuar sin registrarse
    </v-btn>
</template>
  
<script>
export default {
    name: "NoSignedUp",
    methods: {
        goToTemplates() {
            // Navegación usando this.$router en Vue 2
            this.$router.push("/templates");
        },
    },
};
</script>