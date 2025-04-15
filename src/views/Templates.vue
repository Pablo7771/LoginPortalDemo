<template>
	<v-container class="pa-4" fluid>
		<v-row justify="center" align="stretch" dense>

			<!-- Card: Pedir Delivery -->
			<h1 class="text-center mb-6 text-white">{{ $t('templates.title') }}</h1>
			<v-col cols="12" sm="6">
				<v-card class="pa-4" elevation="8">
					<v-card-title class="headline font-weight-bold">
					🛵 Pedir Delivery
					</v-card-title>
					<v-card-text>
						Solicita tus productos a domicilio de forma rápida y segura.
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary"  @click="deliveryDialog = true" depressed>
							Pedir ahora
						</v-btn>
					</v-card-actions>
				</v-card>
				<v-dialog
					v-model="deliveryDialog">
					<Delivery/>
				</v-dialog>

			</v-col>

			<!-- Card: Agendar Cita -->
			<v-col cols="12" sm="6">
				<v-card class="pa-4" elevation="8">
					<v-card-title class="headline font-weight-bold">
						📅 Agendar Cita
					</v-card-title>
					<v-card-text>
						Reserva una cita en el horario que más te convenga.
					</v-card-text>
					<v-card-actions>
						<v-btn color="success" @click="citasDialog = true" depressed>
							Agendar
						</v-btn>
					</v-card-actions>
				</v-card>
				<v-dialog
					v-model="citasDialog">
					<Citas/>
				</v-dialog>

			</v-col>

		</v-row>
	</v-container>
</template>

<script lang="ts">
  import Citas from "@/views/Citas.vue";
  import Delivery from "@/views/Delivery.vue";
  import { ref } from "vue";

  export default {
    name: "Templates",
    components: {
      Citas,
	  Delivery
    },
    data() {
		const deliveryDialog = ref(false) 
		const citasDialog = ref(false)
      return {
        dialog: false,
		deliveryDialog,
		citasDialog
      };
    },
  };
</script>

<style scoped>
/* Eliminar fondo del main */
.fancy-card {
  background: rgba(255, 255, 255, 0.2);
  /* Fondo translúcido para mejorar la visibilidad del texto */
  backdrop-filter: blur(10px);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-size 0.5s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  background-size: cover;
  background-position: center;
  height: 250px;
  /* Aumentar altura para que se vean mejor las imágenes */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* Para controlar la posición de los elementos dentro de la card */
}

.fancy-card:hover {
  transform: translateY(-10px) scale(1.05);
  /* Añadimos el "zoom" para que la imagen se vea más grande */
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
  /* Sombras más notorias para dar el efecto de profundidad */
  background-size: 115%;
  /* Mejorar el zoom de la imagen al hacer hover */
}

.card-text {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  z-index: 10;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  /* Agregar sombra al texto para mejorar la visibilidad */
}
</style>
