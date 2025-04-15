<template>
    <v-btn text class="mt-6 back-btn" @click="goHome">
        <v-icon left class="return-icon">mdi-keyboard-return</v-icon>
        <!--Idiomático i18n-->        
        {{ $t("templates.backHome") }}
    </v-btn>
</template>

  
<script>

export default {
    name: "login",
    methods: {
        goHome() {
            this.$router.push("/");
        },
    },
};
</script>
  
<style scoped>
.back-btn {
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    transition: all 0.2s ease;
}

.back-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.return-icon {
    font-size: 20px;

    transform: translateY(3px);
}
</style>
  