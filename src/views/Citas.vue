<template>
  <v-card class="mx-auto pa-6 pa-0">
    <!-- Botón de cerrar -->
    <v-btn icon small class="close-btn" @click="$emit('cerrar')">
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-card-title class="headline text-center justify-center">
      Agendar Cita Médica
    </v-card-title>

    <!-- Paso actual -->
    <div class="stepper-header d-flex justify-space-between mb-6 px-4">
      <div
        v-for="(etiqueta, n) in pasos"
        :key="n"
        class="step-indicator"
        :class="{ active: step === n + 1, completed: step > n + 1 }"
      >
        <div class="circle">{{ n + 1 }}</div>
        <div class="label">{{ etiqueta }}</div>
        <div v-if="n < pasos.length - 1" class="line"></div>
      </div>
    </div>

    <v-card-text>
      <!-- Paso 1: Datos del paciente -->
      <div v-if="step === 1">
        <v-form v-model="formStep1" ref="form1">
          <v-text-field
            v-model="paciente.nombre"
            label="Nombre"
            :rules="[v => !!v || 'El nombre es requerido']"
            required
          />
          <v-text-field
            v-model="paciente.apellido"
            label="Apellido"
            :rules="[v => !!v || 'El apellido es requerido']"
            required
          />
          <v-text-field
            v-model="paciente.email"
            label="Email"
            :rules="[
              v => !!v || 'El email es requerido',
              v => /.+@.+\..+/.test(v) || 'Debe ser un email válido'
            ]"
            required
          />
          <v-text-field
            v-model="paciente.telefono"
            label="Teléfono"
            :rules="[
              v => !!v || 'El teléfono es requerido',
              v => /^[0-9]{5,20}$/.test(v) || 'El teléfono debe contener solo números y tener entre 5 y 20 dígitos'
            ]"
            required
          />
          <v-file-input
            v-model="paciente.fotoDni"
            label="Foto del DNI"
            accept="image/*"
            :rules="[v => !!v || 'La foto del DNI es requerida']"
            required
          />
        </v-form>
      </div>

      <!-- Paso 2: Especialidad -->
      <div v-if="step === 2">
        <v-select
          :items="especialidades"
          v-model="selectedEspecialidad"
          label="Especialidad"
          item-text="nombre"
          item-value="id"
          required
        />
        <div v-if="selectedEspecialidad" class="mt-4 text-center">
          <img
            :src="imagenEspecialidad"
            alt="Imagen especialidad"
            class="imagen-info"
          />
        </div>
      </div>

      <!-- Paso 3: Médico -->
      <div v-if="step === 3">
        <v-select
          :items="medicosDisponibles"
          v-model="selectedMedico"
          label="Médico"
          item-text="nombre"
          item-value="id"
          required
        />
        <div v-if="selectedMedico" class="mt-4 text-center">
          <img :src="imagenMedico" alt="Foto del médico" class="imagen-info" />
        </div>
      </div>

      <!-- Paso 4: Fecha -->
      <div v-if="step === 4">
        <v-calendar
          ref="calendar"
          type="month"
          :events="formatearEventosDelMedico()"
          :event-color="'green'"
          :allowed-dates="esFechaPermitida"
          @click:date="onDateClick"
          :value="selectedDay"
        />
        <div class="mt-2">
          Día seleccionado: <strong>{{ formattedSelectedDay }}</strong>
        </div>
      </div>

      <!-- Paso 5: Hora -->
      <div v-if="step === 5">
        <v-select
          :items="horasDisponibles"
          v-model="selectedHora"
          label="Hora"
          required
        />
        <div class="mt-6">
          <h4 class="mb-2">Resumen de la cita</h4>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nombre:</v-list-item-title>
                <v-list-item-subtitle>
                  {{ paciente.nombre }} {{ paciente.apellido }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email:</v-list-item-title>
                <v-list-item-subtitle>{{ paciente.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Teléfono:</v-list-item-title>
                <v-list-item-subtitle>
                  {{ paciente.telefono }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Especialidad:</v-list-item-title>
                <v-list-item-subtitle>
                  {{ nombreEspecialidad }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Médico:</v-list-item-title>
                <v-list-item-subtitle>{{ nombreMedico }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Día:</v-list-item-title>
                <v-list-item-subtitle>
                  {{ formattedSelectedDay }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Hora:</v-list-item-title>
                <v-list-item-subtitle>{{ selectedHora }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>

      <!-- Navegación -->
      <div class="d-flex justify-space-between mt-6">
        <v-btn text :disabled="step === 1" @click="pasoAnterior" outlined>
          Anterior
        </v-btn>

        <v-btn
          v-if="step < 5"
          color="primary"
          :disabled="!puedeAvanzar"
          @click="siguientePaso"
        >
          Siguiente
        </v-btn>

        <v-btn
          v-else
          :loading="loading"
          color="success"
          :disabled="!selectedHora"
          @click="agendarCita"
        >
          Confirmar Cita
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
const { VUE_APP_API_URL: API_URL, VUE_APP_JWT: JWT } = process.env;

export default {
  data() {
    return {
      loading: false,
      step: 1,
      pasos: ['Paciente', 'Especialidad', 'Médico', 'Fecha', 'Hora'],
      formStep1: false,
      paciente: {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fotoDni: null
      },
      especialidades: [
        { id: 1, nombre: 'Cardiología', imagen: require('@/assets/citas/cardiologia.png') },
        { id: 2, nombre: 'Dermatología', imagen: require('@/assets/citas/dermatologia.png') },
        { id: 3, nombre: 'Pediatría', imagen: require('@/assets/citas/pediatria.jpg') }
      ],
      selectedEspecialidad: null,
      medicosDisponibles: [],
      selectedMedico: null,
      medicoDisponibilidad: {
        1: { diasDisponibles: ['2025-04-15', '2025-04-16'], foto: require('@/assets/citas/doctor1.jpg') },
        2: { diasDisponibles: ['2025-04-17', '2025-04-18'], foto: require('@/assets/citas/doctor2.png') },
        3: { diasDisponibles: ['2025-04-20', '2025-04-22'], foto: require('@/assets/citas/doctor3.png') }
      },
      selectedDay: null,
      horasDisponibles: [],
      selectedHora: null
    };
  },
  computed: {
    puedeAvanzar() {
      switch (this.step) {
        case 1:
          return this.formStep1;
        case 2:
          return !!this.selectedEspecialidad;
        case 3:
          return !!this.selectedMedico;
        case 4:
          return !!this.selectedDay;
        default:
          return false;
      }
    },
    formattedSelectedDay() {
      if (!this.selectedDay) return '';
      const [year, month, day] = this.selectedDay.split('-');
      return `${day}-${month}-${year}`;
    },
    imagenEspecialidad() {
      const esp = this.especialidades.find(e => e.id === this.selectedEspecialidad);
      return esp?.imagen || '';
    },
    imagenMedico() {
      return this.medicoDisponibilidad[this.selectedMedico]?.foto || '';
    },
    nombreEspecialidad() {
      const esp = this.especialidades.find(e => e.id === this.selectedEspecialidad);
      return esp?.nombre || '';
    },
    nombreMedico() {
      const med = this.medicosDisponibles.find(e => e.id === this.selectedMedico);
      return med?.nombre || '';
    }
  },
  methods: {
    pasoAnterior() {
      this.step--;
      if (this.step === 4) {
        this.selectedDay = null;
        this.selectedHora = null;
      }
    },
    siguientePaso() {
      if (this.step === 1) {
        this.$refs.form1.validate();
        if (!this.formStep1) return;
      }
      this.step++;
      if (this.step === 4) {
        this.selectedDay = null;
        this.selectedHora = null;
      }
    },
    formatearEventosDelMedico() {
      const dias = this.medicoDisponibilidad[this.selectedMedico]?.diasDisponibles || [];
      return dias.map(d => ({
        name: 'Disponible',
        start: d,
        end: d
      }));
    },
    esFechaPermitida(date) {
      const dias = this.medicoDisponibilidad[this.selectedMedico]?.diasDisponibles || [];
      return dias.includes(date);
    },
    onDateClick(e) {
      const date = e.date;
      if (!this.esFechaPermitida(date)) return;

      if (this.selectedDay === date) {
        this.selectedDay = null;
      } else {
        this.selectedDay = date;
        const button = e.nativeEvent.target.closest('button');
        const calendar = button.closest('.v-calendar');
        calendar.querySelectorAll('button.primary').forEach(btn => btn.classList.remove('primary'));
        button.classList.add('primary');
      }
    },
    async agendarCita() {
      const fd = new FormData();
      fd.append('especialidad', this.selectedEspecialidad);
      fd.append('medico', this.selectedMedico);
      fd.append('dia', this.formattedSelectedDay);
      fd.append('hora', this.selectedHora);
      fd.append('nombre', this.paciente.nombre);
      fd.append('apellido', this.paciente.apellido);
      fd.append('email', this.paciente.email);
      fd.append('telefono', this.paciente.telefono);
      fd.append('foto', this.paciente.fotoDni);

      this.loading = true;

      const response = await fetch(`${API_URL}/demo_cita`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JWT}`
        },
        body: fd
      });

      const data = await response.json();
      console.log(data);

      this.loading = false;
      this.$emit('cerrar');
    }
  },
  watch: {
    selectedEspecialidad(newVal) {
      if (newVal === 1) {
        this.medicosDisponibles = [
          { id: 1, nombre: 'Dra. López' },
          { id: 2, nombre: 'Dr. Ramírez' }
        ];
      } else if (newVal === 2) {
        this.medicosDisponibles = [{ id: 3, nombre: 'Dra. González' }];
      } else {
        this.medicosDisponibles = [];
      }
    },
    selectedMedico(newVal) {
      this.horasDisponibles = newVal
        ? ['09:00:00', '10:30:00', '12:00:00', '15:00:00']
        : [];
    }
  }
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
  background-color: #1976D2;
}

.step-indicator.completed .circle {
  background-color: #4CAF50;
}

.step-indicator.completed .line {
  background-color: #4CAF50;
}

.step-indicator.active .line {
  background-color: #1976D2;
}

.imagen-info {
  max-height: 120px;
  margin-top: 12px;
  border-radius: 8px;
  object-fit: contain;
}
</style>
