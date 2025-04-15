<template>
	<v-container class="pa-4" fluid>
		<!-- Título -->
		<h1 class="text-center mb-6 text-white">{{ $t('templates.title') }}</h1>

		<v-row justify="center" align="stretch" dense>

			<!-- Card: Pedir Delivery -->
			<v-col cols="12" sm="6" class="d-flex">
				<v-card class="pa-4 d-flex flex-column justify-space-between fill-height" width="100%" elevation="8">
					<div>
						<v-card-title class="headline font-weight-bold">
							🛵 Pedir Delivery
						</v-card-title>
						<v-card-text>
							Solicita tus productos a domicilio de forma rápida y segura.
						</v-card-text>
					</div>
					<v-card-actions>
						<v-btn color="primary" @click="deliveryDialog = true" depressed>
							Pedir ahora
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-dialog v-model="deliveryDialog"  max-width="1000">
					<Delivery />
				</v-dialog>
			</v-col>

			<!-- Card: Agendar Cita -->
			<v-col cols="12" sm="6" class="d-flex">
				<v-card class="pa-4 d-flex flex-column justify-space-between fill-height" width="100%" elevation="8">
					<div>
						<v-card-title class="headline font-weight-bold">
							📅 Agendar Cita
						</v-card-title>
						<v-card-text>
							Reserva una cita en el horario que más te convenga.
						</v-card-text>
					</div>
					<v-card-actions>
						<v-btn color="success" @click="citasDialog = true" depressed>
							Agendar
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-dialog max-width="800" max-height="600" v-model="citasDialog" v-if="citasDialog">
					<Citas @cerrar="citasDialog = false" />
				</v-dialog>
			</v-col>

		</v-row>

	</v-container>
</template>
  
<script lang="ts">
import Citas from "@/views/Citas.vue";
import Delivery from "@/views/Delivery.vue";

export default {
	name: "Templates",
	components: {
		Citas,
		Delivery,
	},
	data() {
		return {
			deliveryDialog: false,
			citasDialog: false,
		};
	},
};
</script>
  