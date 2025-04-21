<template>
    <v-card class="mx-auto pa-6 pa-0">
        <v-btn icon small class="close-btn" @click="$emit('cerrar')">
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-card-title class="headline text-center justify-center">
            {{ $t('medicalAppointment.agendar_cita_medica') }}
        </v-card-title>

        <!-- Encabezado pasos -->
        <div class="stepper-header d-flex justify-space-between mb-6 px-4">
            <div v-for="(etiqueta, n) in pasos" :key="n" class="step-indicator"
                :class="{ active: step === n + 1, completed: step > n + 1 }">
                <div class="circle">{{ n + 1 }}</div>
                <div class="label">{{ $t(`medicalAppointment.paso_${n + 1}`) }}</div>
                <div v-if="n < pasos.length - 1" class="line"></div>
            </div>
        </div>

        <v-card-text>
            <!-- Paso 1 -->
            <div v-if="step === 1">
                <v-form v-model="formStep1" ref="form1">
                    <v-text-field v-model="paciente.nombre" :label="$t('medicalAppointment.nombre')"
                        :rules="[(v) => !!v || $t('medicalAppointment.rules.nombre_requerido')]" required />
                    <v-text-field v-model="paciente.apellido" :label="$t('medicalAppointment.apellido')"
                        :rules="[(v) => !!v || $t('medicalAppointment.rules.apellido_requerido')]" required />
                    <v-text-field v-model="paciente.email" :label="$t('medicalAppointment.email')" :rules="[
                        (v) => !!v || $t('medicalAppointment.rules.email_requerido'),
                        (v) => /.+@.+\..+/.test(v) || $t('medicalAppointment.rules.email_invalido'),
                    ]" required />
                    <v-text-field v-model="paciente.telefono" :label="$t('medicalAppointment.telefono')" :rules="[
                        (v) => !!v || $t('medicalAppointment.rules.telefono_requerido'),
                        (v) => /^[0-9]{5,20}$/.test(v) || $t('medicalAppointment.rules.telefono_invalido'),
                    ]" required />
                    <v-file-input v-model="paciente.fotoDni" :label="$t('medicalAppointment.foto_dni')" accept="image/*"
                        :rules="[(v) => !!v || $t('medicalAppointment.rules.foto_dni_requerida')]" required />
                </v-form>
            </div>

            <!-- Paso 2 -->
            <div v-if="step === 2">
                <v-select :items="especialidades" v-model="selectedEspecialidad"
                    :label="$t('medicalAppointment.especialidad')" item-text="nombre" item-value="id" required />
                <div v-if="selectedEspecialidad" class="mt-4 text-center">
                    <img :src="imagenEspecialidad" :alt="$t('medicalAppointment.imagen_especialidad')"
                        class="imagen-info" />
                </div>
            </div>

            <!-- Paso 3 -->
            <div v-if="step === 3">
                <v-select :items="medicosDisponibles" v-model="selectedMedico" :label="$t('medicalAppointment.medico')"
                    item-text="nombre" item-value="id" required />
                <div v-if="selectedMedico" class="mt-4 text-center">
                    <img :src="imagenMedico" :alt="$t('medicalAppointment.foto_medico')" class="imagen-info" />
                </div>
            </div>

            <!-- Paso 4 -->
            <div v-if="step === 4">
                <v-calendar ref="calendar" type="month" :events="formatearEventosDelMedico()" :event-color="'green'"
                    :allowed-dates="esFechaPermitida" @click:date="onDateClick" :value="selectedDay" />
                <div class="mt-2">
                    {{ $t('medicalAppointment.dia_seleccionado') }} <strong>{{ formattedSelectedDay }}</strong>
                </div>
            </div>

            <!-- Paso 5 -->
            <div v-if="step === 5">
                <v-select :items="horasDisponibles" v-model="selectedHora" :label="$t('medicalAppointment.hora')"
                    required />
            </div>

            <!-- Botones navegación -->
            <div class="d-flex justify-space-between mt-6">
                <v-btn text :disabled="step === 1" @click="pasoAnterior" outlined>
                    {{ $t('medicalAppointment.anterior') }}
                </v-btn>

                <v-btn v-if="step < 5" color="primary" :disabled="!puedeAvanzar" @click="siguientePaso">
                    {{ $t('medicalAppointment.siguiente') }}
                </v-btn>

                <v-btn v-else :loading="loading" color="success" :disabled="!selectedHora" @click="resumen = true">
                    {{ $t('medicalAppointment.generar_cita') }}
                </v-btn>
            </div>
        </v-card-text>

        <!-- Diálogo resumen -->
        <v-dialog v-model="resumen" max-width="600px">
            <v-card>
                <v-card-title class="headline grey lighten-4">
                    {{ $t('medicalAppointment.resumen_cita') }}
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.nombre') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ paciente.nombre }} {{ paciente.apellido }}
                            </v-col>

                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.email') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ paciente.email }}
                            </v-col>

                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.telefono') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ paciente.telefono }}
                            </v-col>

                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.especialidad') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ especialidadDesc }}
                            </v-col>

                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.medico') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ medicoDesc }}
                            </v-col>

                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.dia') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ formattedSelectedDay }}
                            </v-col>

                            <v-col cols="12" sm="6">
                                <strong>{{ $t('medicalAppointment.hora') }}:</strong>
                            </v-col>
                            <v-col cols="12" sm="6">
                                {{ selectedHora }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="resumen = false">{{ $t('medicalAppointment.cancelar') }}</v-btn>
                    <v-btn color="success" @click="agendarCita">{{ $t('medicalAppointment.confirmar') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>


<script>
const { VUE_APP_API_URL: API_URL, VUE_APP_JWT: JWT } = process.env;

export default {
    data() {
        return {
            resumen: false,
            loading: false,
            step: 1,
            pasos: ["Paciente", "Especialidad", "Médico", "Fecha", "Hora"],
            formStep1: false,
            paciente: {
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                fotoDni: null,
            },
            especialidades: [
                {
                    id: 1,
                    nombre: "Cardiología",
                    imagen: require("@/assets/citas/cardiologia.png"),
                },
                {
                    id: 2,
                    nombre: "Dermatología",
                    imagen: require("@/assets/citas/dermatologia.png"),
                },
                {
                    id: 3,
                    nombre: "Pediatría",
                    imagen: require("@/assets/citas/pediatria.jpg"),
                },
            ],
            selectedEspecialidad: null,
            medicosDisponibles: [],
            selectedMedico: null,
            medicoDisponibilidad: {
                1: {
                    diasDisponibles: ["2025-04-15", "2025-04-16"],
                    foto: require("@/assets/citas/doctor1.jpg"),
                },
                2: {
                    diasDisponibles: ["2025-04-17", "2025-04-18"],
                    foto: require("@/assets/citas/doctor2.png"),
                },
                3: {
                    diasDisponibles: ["2025-04-20", "2025-04-22"],
                    foto: require("@/assets/citas/doctor3.png"),
                },
            },
            selectedDay: null,
            horasDisponibles: [],
            selectedHora: null,
        };
    },
    computed: {
        puedeAvanzar() {
            const validaciones = {
                1: this.formStep1,
                2: !!this.selectedEspecialidad,
                3: !!this.selectedMedico,
                4: !!this.selectedDay,
            };
            return validaciones[this.step] ?? false;
        },
        formattedSelectedDay() {
            if (!this.selectedDay) return "";
            const [year, month, day] = this.selectedDay.split("-");
            return `${day}-${month}-${year}`;
        },
        imagenEspecialidad() {
            const esp = this.especialidades.find(
                (e) => e.id === this.selectedEspecialidad
            );
            return esp?.imagen || "";
        },
        imagenMedico() {
            return this.medicoDisponibilidad[this.selectedMedico]?.foto || "";
        },
        nombreEspecialidad() {
            const esp = this.especialidades.find(
                (e) => e.id === this.selectedEspecialidad
            );
            return esp?.nombre || "";
        },
        nombreMedico() {
            const med = this.medicosDisponibles.find(
                (e) => e.id === this.selectedMedico
            );
            return med?.nombre || "";
        },
        especialidadDesc() {
            const esp = this.especialidades.find(
                (e) => e.id === this.selectedEspecialidad
            );
            return esp?.nombre || "";
        },
        medicoDesc() {
            const med = this.medicosDisponibles.find(
                (e) => e.id === this.selectedMedico
            );
            return med?.nombre || "";
        },
    },
    methods: {
        pasoAnterior() {
            this.step--;
            if (this.step === 4) {
                this.selectedDay = null;
                this.selectedHora = null;
            }
        },
        async siguientePaso() {
            if (this.step === 1) {
                const valid = await this.$refs.form1.validate();
                if (!valid) return;
            }
            this.step++;
            if (this.step === 4) {
                this.selectedDay = null;
                this.selectedHora = null;
            }
        },
        formatearEventosDelMedico() {
            const dias =
                this.medicoDisponibilidad[this.selectedMedico]?.diasDisponibles || [];
            return dias.map((d) => ({
                name: this.$t('medicalAppointment.available'),
                start: d,
                end: d,
            }));
        },
        esFechaPermitida(date) {
            const dias =
                this.medicoDisponibilidad[this.selectedMedico]?.diasDisponibles || [];
            return dias.includes(date);
        },
        onDateClick(e) {
            const date = e.date;
            if (!this.esFechaPermitida(date)) return;

            if (this.selectedDay === date) {
                this.selectedDay = null;
            } else {
                this.selectedDay = date;
                const button = e.nativeEvent.target.closest("button");
                const calendar = button.closest(".v-calendar");
                calendar
                    .querySelectorAll("button.primary")
                    .forEach((btn) => btn.classList.remove("primary"));
                button.classList.add("primary");
            }
        },
        async agendarCita() {
            const fd = new FormData();
            fd.append("especialidad", this.selectedEspecialidad);
            fd.append("medico", this.selectedMedico);
            fd.append("dia", this.formattedSelectedDay);
            fd.append("hora", this.selectedHora);
            fd.append("nombre", this.paciente.nombre);
            fd.append("apellido", this.paciente.apellido);
            fd.append("email", this.paciente.email);
            fd.append("telefono", this.paciente.telefono);
            fd.append("foto", this.paciente.fotoDni);

            this.loading = true;

            const response = await fetch(`${API_URL}/demo_cita`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
                body: fd,
            });

            const data = await response.json();
            console.log(data);

            this.loading = false;
            this.$emit("cerrar");
        },
    },
    watch: {
        selectedEspecialidad(newVal) {
            if (newVal === 1) {
                this.medicosDisponibles = [
                    { id: 1, nombre: "Dra. López" },
                    { id: 2, nombre: "Dr. Ramírez" },
                ];
            } else if (newVal === 2) {
                this.medicosDisponibles = [{ id: 3, nombre: "Dra. González" }];
            } else {
                this.medicosDisponibles = [];
            }
        },
        selectedMedico(newVal) {
            this.horasDisponibles = newVal
                ? ["09:00:00", "10:30:00", "12:00:00", "15:00:00"]
                : [];
        },
    },
};
</script>

<style scoped>
.v-card {
    max-width: 800px;
    margin: auto;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
}

.stepper-header {
    align-items: center;
}

.step-indicator {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
}

.step-indicator .circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ccc;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: background-color 0.3s;
}

.step-indicator .line {
    flex: 1;
    height: 4px;
    background-color: #ccc;
    margin-left: 4px;
    margin-right: 4px;
    z-index: 0;
    transition: background-color 0.3s;
}

.step-indicator .label {
    font-size: 12px;
    text-align: center;
    margin-top: 4px;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
}

.step-indicator.active .circle {
    background-color: #1976d2;
}

.step-indicator.completed .circle {
    background-color: #4caf50;
}

.step-indicator.completed .line {
    background-color: #4caf50;
}

.step-indicator.active .line {
    background-color: #1976d2;
}

.imagen-info {
    max-height: 120px;
    margin-top: 12px;
    border-radius: 8px;
    object-fit: contain;
}
</style>
