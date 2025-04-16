<template>
	<v-container class="pa-4" fluid>
		<!-- Título -->
		<h1 class="text-center mb-6 text-white">{{ $t('templates.title') }}</h1>

		<v-row justify="center" align="stretch" dense class="card-wrapper">
			<!-- Card: Pedir Delivery -->
			<v-col cols="12" sm="6" class="d-flex">
				<v-card class="pa-4 d-flex flex-column justify-space-between fill-height" width="100%" elevation="8">
					<div>
						<v-card-title class="headline font-weight-bold">
							🛵 {{ $t('templates.delivery.title') }}
						</v-card-title>
						<v-card-text>
							{{ $t('templates.delivery.description') }}
						</v-card-text>
					</div>
					<v-card-actions>
						<v-btn color="primary" @click="deliveryDialog = true" depressed>
							{{ $t('templates.delivery.button') }}
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-dialog v-model="deliveryDialog" max-width="1000" v-if="deliveryDialog">
					<Delivery @cerrar="deliveryDialog = false"/>

				</v-dialog>
			</v-col>

			<!-- Card: Agendar Cita -->
			<v-col cols="12" sm="6" class="d-flex">
				<v-card class="pa-4 d-flex flex-column justify-space-between fill-height" width="100%" elevation="8">
					<div>
						<v-card-title class="headline font-weight-bold">
							📅 {{ $t('templates.medicalAppointment.title') }}
						</v-card-title>
						<v-card-text>
							{{ $t('templates.medicalAppointment.description') }}
						</v-card-text>
					</div>
					<v-card-actions>
						<v-btn color="success" @click="citasDialog = true" depressed>
							{{ $t('templates.medicalAppointment.button') }}
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-dialog max-width="800" max-height="600" v-model="citasDialog" v-if="citasDialog">
					<Citas @cerrar="citasDialog = false" />
				</v-dialog>
			</v-col>
			<!-- Card: Agendar Cita -->
			<v-col cols="12" sm="6" class="d-flex">
				<v-card class="pa-4 d-flex flex-column justify-space-between fill-height" width="100%" elevation="8">
					<div>
						<v-card-title class="headline font-weight-bold">
							Registrar proveedor
						</v-card-title>
						<v-card-text>
							{{ $t('templates.medicalAppointment.description') }}
						</v-card-text>
					</div>
					<v-card-actions>
						<v-btn color="success" @click="proveedoresDialog = true" depressed>
							Registrar
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-dialog max-width="800" max-height="600" v-model="proveedoresDialog" v-if="proveedoresDialog">
					<Proveedores @cerrar="proveedoresDialog = false" />
				</v-dialog>
			</v-col>

		</v-row>
	</v-container>
</template>

<script lang="ts">
import Citas from "@/views/Citas.vue";
import Delivery from "@/views/Delivery.vue";
import Proveedores from "@/views/RegProveedor.vue";

export default {
	name: "Templates",
	components: {
		Citas,
		Delivery,
		Proveedores,
	},
	data() {
		return {
			deliveryDialog: false,
			citasDialog: false,
			proveedoresDialog: false,
		};
	},
};
</script>

<style scoped>
.card-wrapper {
  container-type: inline-size; /* Esto establece el contenedor como el que controla las container queries */
}

@container (max-width: 575px) {
	.col-12 {
		flex: 0 0 100%;
		max-width: 100%;
	}
}
</style>
