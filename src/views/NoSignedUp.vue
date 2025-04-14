<template>
    <v-btn text class="mt-6 btnGuest" @click="goToTemplates">
        {{ $t('login.guestContinue') }}
    </v-btn>
</template>
  
<script>
export default {
    name: "NoSignedUp",
    methods: {
        goToTemplates() {
            // Navegación usando this.$router en Vue 2
            this.$router.push("/no-signed-up");
        },
    },
};
</script>

<style scoped>
.btnGuest {
    text-transform: none;
}
</style>