<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8">
                <h1 class="text-center mb-6">¿Qué deseas hacer?</h1>
                <v-card class="mb-4" @click="goTo('delivery')">
                    <v-card-text>Pedir delivery</v-card-text>
                </v-card>
                <v-card class="mb-4" @click="goTo('cita')">
                    <v-card-text>Agendar cita médica</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
export default {
    name: "Templates",
    methods: {
        goTo(tipo: string) {
            console.log("Elegido:", tipo);
            //Falta llenar aquí


            
        },
    },
};
</script>
  