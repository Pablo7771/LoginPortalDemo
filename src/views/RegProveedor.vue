<template>
    <v-card class="pa-4">
        
      <v-card-title class="headline">Formulario de Registro Proveedor</v-card-title>
      
      <v-card-text>
         <!-- Botón de cierre -->
         <v-btn icon small class="close-btn" @click="$emit('cerrar')" style="position: absolute; top: 10px; right: 10px;">
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-form ref="form">
          <!-- Información General -->
          <h3 class="mb-2">Información General</h3>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.razonSocial" label="Razón social*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.cif" label="CIF / NIF / NIE*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.domicilioFiscal" label="Domicilio fiscal*" outlined dense />
              </v-col>
  
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.provincia_1"
                  :items="provincias"
                  label="Provincia"
                  outlined
                  dense
                  @change="onProvinciaChange_1"
                />
              </v-col>
  
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.poblacion_1"
                  :items="poblacionesDisponibles_1.map(p => p.nombre)"
                  label="Población"
                  outlined
                  dense
                  @change="onPoblacionChange_1"
                />
              </v-col>
  
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.codigoPostal_1"
                  label="Código postal"
                  outlined
                  dense
                  readonly
                />
              </v-col>
  
              <v-col cols="12" md="4">
                <v-text-field v-model="form.poblacionFiscal" label="Población*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.codigoPostalFiscal" label="Código postal*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.telefono" label="Teléfono*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.emailComercial" label="Email para gestión comercial*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.web" label="Web" outlined dense />
              </v-col>
            </v-row>
          </v-container>
  
          <!-- Información del apoderado -->
          <h3 class="mb-2">Información del apoderado</h3>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.nombreApoderado" label="Nombre y apellidos*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.nifApoderado" label="NIF / NIE*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.poderes" label="Poderes*" outlined dense />
              </v-col>
            </v-row>
          </v-container>
  
          <!-- Información comercial -->
          <h3 class="mb-2">Información comercial</h3>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.tipoProveedor"
                  :items="['Proveedor de materiales', 'Subcontratista', 'Ambos']"
                  label="Tipo de proveedor*"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.seguridadSocial" label="Nº Seguridad Social" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.iban" label="IBAN*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.certTitularidad" label="Certificado titularidad" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.oficios" label="Oficios*" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.ambito"
                  :items="['nacional', 'regional', 'provincial']"
                  label="Disponibilidad Geográfica*"
                  outlined
                  dense
                />
              </v-col>
  
              <v-col
                v-if="form.ambito === 'regional' || form.ambito === 'provincial'"
                cols="12"
                md="4"
              >
                <v-select
                  v-model="form.region_2"
                  :items="provincias"
                  label="Seleccione una Región"
                  outlined
                  dense
                />
              </v-col>
  
              <v-col
                v-if="form.ambito === 'provincial'"
                cols="12"
                md="4"
              >
                <v-select
                  v-model="form.provincia_2"
                  :items="poblacionesDisponibles_2.map(p => p.nombre)"
                  label="Seleccione una Provincia"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
  
          <!-- Dirección de envío de pagarés -->
          <h3 class="mb-2">Dirección de envío de pagarés</h3>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.domicilioEnvio" label="Domicilio" outlined dense />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.provincia"
                  :items="provincias"
                  label="Provincia"
                  outlined
                  dense
                  @change="onProvinciaChange"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.poblacion"
                  :items="poblacionesDisponibles.map(p => p.nombre)"
                  label="Población"
                  outlined
                  dense
                  @change="onPoblacionChange"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.codigoPostal" label="Código postal" outlined dense readonly />
              </v-col>
              <v-col cols="12" md="8">
                <v-checkbox
                  v-model="form.mismaDireccion"
                  label="Misma que la dirección fiscal"
                  @change="copiarDireccionFiscal"
                />
              </v-col>
            </v-row>
          </v-container>
  
          <!-- Contactos -->
          <h3 class="mb-2">Contactos</h3>
          <v-simple-table dense>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Nombre y apellidos</th>
                <th>Teléfono</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contacto, idx) in contactos" :key="idx">
                <td class="font-weight-bold">{{ contacto.rol }}</td>
                <td><v-text-field class="pa-2" v-model="contacto.nombre" dense outlined hide-details="auto"/></td>
                <td><v-text-field class="pa-2" v-model="contacto.telefono" dense outlined hide-details="auto"/></td>
                <td><v-text-field class="pa-2" v-model="contacto.email" dense outlined hide-details="auto" type="email" /></td>
              </tr>
            </tbody>
          </v-simple-table>
  
          <!-- Aceptación y envío -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-checkbox
                v-model="form.aceptaLOPD"
                :rules="[v => !!v || 'Debe aceptar la política LOPD']"
                label="He leído y acepto la política LOPD"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" type="submit" @click.prevent="submitForm">
                Finalizar formulario y enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  

<script>
export default {
    data() {
        return {
            isWideScreen: window.innerWidth >= 768,
            form: {
                razonSocial: '',
                nif: '',
                domicilio: '',
                provincia: '',
                provincia_1: '',
                poblacion: '',
                poblacion_1: '',
                telefono: '',
                email: '',
                web: '',
                codigoPostal: '',
                codigoPostal_1: '',
                ambito: '',
                region_2: ""
            },
            provincias: [
                'Madrid',
                'Barcelona',
                'Valencia',
                'Sevilla',
                'Zaragoza',
                'Málaga',
                'Murcia',
                'Bilbao',
                'Alicante',
                'Córdoba'
            ],
            poblaciones: {
                Madrid: [
                    { nombre: 'Madrid', cp: '28001' },
                    { nombre: 'Alcalá de Henares', cp: '28801' },
                    { nombre: 'Getafe', cp: '28901' },
                    { nombre: 'Alcorcón', cp: '28922' },
                    { nombre: 'Leganés', cp: '28911' },
                    { nombre: 'Fuenlabrada', cp: '28940' },
                    { nombre: 'Móstoles', cp: '28930' },
                    { nombre: 'Coslada', cp: '28821' },
                    { nombre: 'Torrejón de Ardoz', cp: '28850' },
                    { nombre: 'Parla', cp: '28980' }
                ],
                Barcelona: [
                    { nombre: 'Barcelona', cp: '08001' },
                    { nombre: 'Hospitalet', cp: '08901' },
                    { nombre: 'Badalona', cp: '08911' },
                    { nombre: 'Sabadell', cp: '08201' },
                    { nombre: 'Terrassa', cp: '08220' },
                    { nombre: 'Mataró', cp: '08301' },
                    { nombre: 'Cornellá de Llobregat', cp: '08940' },
                    { nombre: 'Rubí', cp: '08191' },
                    { nombre: 'Castelldefels', cp: '08860' },
                    { nombre: 'Sant Cugat del Vallès', cp: '08190' }
                ],
                Valencia: [
                    { nombre: 'Valencia', cp: '46001' },
                    { nombre: 'Gandía', cp: '46701' },
                    { nombre: 'Torrent', cp: '46900' },
                    { nombre: 'Sagunto', cp: '46500' }
                ],
                Sevilla: [
                    { nombre: 'Sevilla', cp: '41001' },
                    { nombre: 'Alcalá de Guadaíra', cp: '41500' },
                    { nombre: 'Dos Hermanas', cp: '41701' }
                ],
                Zaragoza: [
                    { nombre: 'Zaragoza', cp: '50001' },
                    { nombre: 'Ejea de los Caballeros', cp: '50600' },
                    { nombre: 'Tarazona', cp: '50500' }
                ],
                Málaga: [
                    { nombre: 'Málaga', cp: '29001' },
                    { nombre: 'Marbella', cp: '29601' },
                    { nombre: 'Torremolinos', cp: '29620' }
                ],
                Murcia: [
                    { nombre: 'Murcia', cp: '30001' },
                    { nombre: 'Cartagena', cp: '30200' },
                    { nombre: 'Lorca', cp: '30800' }
                ],
                Bilbao: [
                    { nombre: 'Bilbao', cp: '48001' },
                    { nombre: 'Getxo', cp: '48991' },
                    { nombre: 'Barakaldo', cp: '48901' }
                ],
                Alicante: [
                    { nombre: 'Alicante', cp: '03001' },
                    { nombre: 'Elche', cp: '03201' },
                    { nombre: 'Benidorm', cp: '03501' }
                ],
                Córdoba: [
                    { nombre: 'Córdoba', cp: '14001' },
                    { nombre: 'Lucena', cp: '14900' },
                    { nombre: 'Puente Genil', cp: '14500' }
                ]
            },
            contactos: [
                { rol: 'Compras' },
                { rol: 'Administración' },
                { rol: 'Contabilidad' },
                { rol: 'Otros' }
            ]
        }
    },
    computed: {
        poblacionesDisponibles() {
            return this.poblaciones[this.form.provincia] || [];
        },
        poblacionesDisponibles_1() {
            return this.poblaciones[this.form.provincia_1] || [];
        },
        poblacionesDisponibles_2() {
            return this.poblaciones[this.form.region_2] || [];
        },
        sectionStyle() {
            return {
                display: 'grid',
                gridTemplateColumns: this.isWideScreen ? '1fr 1fr' : '1fr',
                gap: '16px',
            };
        },
        // Estilo para el input de 'Web', que debe ocupar todo el ancho
        fullWidthStyle() {
            return this.isWideScreen ? { gridColumn: 'span 2' } : {};
        }
    },
    mounted() {
        // Escucha el evento de redimensionamiento
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        // Elimina el listener cuando el componente se destruye
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        onProvinciaChange() {
            this.form.poblacion = '';
            this.form.codigoPostal = '';
        },
        onProvinciaChange_1() {
            this.form.poblacion_1 = '';
            this.form.codigoPostal_1 = '';
        },
        onPoblacionChange() {
            const pob = this.poblacionesDisponibles.find(p => p.nombre === this.form.poblacion);
            this.form.codigoPostal = pob ? pob.cp : '';
        },
        onPoblacionChange_1() {
            const pob = this.poblacionesDisponibles_1.find(p => p.nombre === this.form.poblacion_1);
            this.form.codigoPostal_1 = pob ? pob.cp : '';
        },
        handleResize() {
            this.isWideScreen = window.innerWidth >= 768;
        },
        copiarDireccionFiscal() {
            if (this.form.mismaDireccion) {
                this.form.provincia = this.form.provincia_1;
                this.form.poblacion = this.form.poblacion_1;
                this.form.codigoPostal = this.form.codigoPostal_1;
            }
        }
    }
}
</script>

<style scoped>
.formulario {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.titulo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2d6a4f;
    margin-bottom: 16px;
}

.input-container {
    margin-bottom: 12px;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
}

.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    z-index: 10;
    transition: all 0.3s ease;
    color: #73cda4;
}

</style>