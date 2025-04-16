<template>
    <v-card>
        <!-- Contenedor principal -->
        <v-card class="mx-auto" max-width="800px" outlined>
            <v-card-title class="text-h5">
                Formulario De Registro Proveedor
            </v-card-title>

            <!-- Información General -->
            <v-card-subtitle>Información General</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.razonSocial" label="Razón Social*" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.nif" label="CIF / NIF / NIE*" outlined dense />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.domicilio" label="Domicilio Fiscal*" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.provincia_1" :items="provincias" label="Provincia" outlined dense
                            @change="actualizarPoblaciones_1" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.poblacion_1" :items="poblacionesDisponibles_1" label="Población" outlined
                            dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.codigoPostal_1" label="Código Postal" outlined dense readonly />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.telefono" label="Teléfono*" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.email" label="Email para gestión comercial*" outlined dense />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.web" label="Web" outlined dense />
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Información del Apoderado -->
            <v-card-subtitle>Información Del Apoderado</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.nombreApoderado" label="Nombre y Apellidos*" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.nifApoderado" label="NIF / NIE*" outlined dense />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.poderes" label="Poderes*" outlined dense />
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Información Comercial -->
            <v-card-subtitle>Información Comercial</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.tipoProveedor"
                            :items="['Proveedor de materiales', 'Subcontratista', 'Ambos']" label="Tipo de proveedor*"
                            outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.seguroSocial" label="Nº Seguridad Social" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.iban" label="IBAN*" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.certificadoTitularidad" label="Certificado Titularidad" outlined
                            dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.oficios" label="Oficios*" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.ambito" :items="['nacional', 'regional', 'provincial']"
                            label="Disponibilidad Geográfica*" outlined dense />
                    </v-col>
                    <v-col cols="12" v-if="form.ambito === 'regional' || form.ambito === 'provincial'">
                        <v-select v-model="form.region_2" :items="provincias" label="Seleccione una Región" outlined
                            dense />
                    </v-col>
                    <v-col cols="12" v-if="form.ambito === 'provincial'">
                        <v-select v-model="form.provincia_2" :items="poblacionesDisponibles_2"
                            label="Seleccione una Provincia" outlined dense />
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Dirección de envío de pagarés -->
            <v-card-subtitle>Dirección de envío de Pagarés</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="form.domicilio_2" label="Domicilio" outlined dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.provincia" :items="provincias" label="Provincia" outlined dense
                            @change="actualizarPoblaciones" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.poblacion" :items="poblacionesDisponibles" label="Población" outlined
                            dense />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.codigoPostal" label="Código Postal" outlined dense readonly />
                    </v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="form.mismaDireccion" label="Misma que la dirección fiscal"
                            @change="copiarDireccionFiscal" />
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Contactos -->
            <v-card-subtitle>Contactos</v-card-subtitle>
            <v-card-text>
                <v-simple-table dense class="contact-table">
                    <thead>
                        <tr>
                            <th class="text-center">Área</th>
                            <th class="text-center">Nombre y Apellidos</th>
                            <th class="text-center">Teléfono</th>
                            <th class="text-center">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-weight-bold">Compras*</td>
                            <td>
                                <v-text-field v-model="form.contactoCompras" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoComprasTelefono" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoComprasEmail" outlined dense hide-details
                                    class="input-field" />
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Administración*</td>
                            <td>
                                <v-text-field v-model="form.contactoAdministracion" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoAdministracionTelefono" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoAdministracionEmail" outlined dense hide-details
                                    class="input-field" />
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Contabilidad*</td>
                            <td>
                                <v-text-field v-model="form.contactoContabilidad" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoContabilidadTelefono" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoContabilidadEmail" outlined dense hide-details
                                    class="input-field" />
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Otros</td>
                            <td>
                                <v-text-field v-model="form.contactoOtros" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoOtrosTelefono" outlined dense hide-details
                                    class="input-field" />
                            </td>
                            <td>
                                <v-text-field v-model="form.contactoOtrosEmail" outlined dense hide-details
                                    class="input-field" />
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>

            <!-- Aceptación y envío -->
            <v-card-subtitle>Aceptación y envío</v-card-subtitle>
            <v-card-text>
                <v-checkbox v-model="form.acepto" label="He leído y acepto la política LOPD" required />
                <v-btn color="primary" @click="submitForm">
                    Finalizar Formulario y Enviar
                </v-btn>
            </v-card-text>
        </v-card>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            form: {
                razonSocial: '',
                nif: '',
                domicilio: '',
                provincia_1: '',
                poblacion_1: '',
                codigoPostal_1: '',
                telefono: '',
                email: '',
                web: '',
                nombreApoderado: '',
                nifApoderado: '',
                poderes: '',
                tipoProveedor: '',
                seguroSocial: '',
                iban: '',
                certificadoTitularidad: '',
                oficios: '',
                ambito: '',
                region_2: '',
                provincia_2: '',
                poblacion_2: '',
                domicilio_2: '',
                codigoPostal_2: '',
                contactoCompras: '',
                contactoAdministracion: '',
                contactoContabilidad: '',
                contactoOtros: '',
                contactoComprasTelefono: '',
                contactoAdministracionTelefono: '',
                contactoContabilidadTelefono: '',
                contactoOtrosTelefono: '',
                contactoComprasEmail: '',
                contactoAdministracionEmail: '',
                contactoContabilidadEmail: '',
                contactoOtrosEmail: '',
                mismaDireccion: false,
                acepta: false
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
            }
        }
    },
    methods: {
        actualizarPoblaciones_1() {
            // Lógica para actualizar las poblaciones según la provincia_1 seleccionada
            if (this.form.provincia_1 === 'Madrid') {
                this.poblacionesDisponibles_1 = ['Madrid', 'Alcalá de Henares', 'Getafe'];
            } else if (this.form.provincia_1 === 'Barcelona') {
                this.poblacionesDisponibles_1 = ['Barcelona', 'Badalona', 'Hospitalet'];
            } else {
                this.poblacionesDisponibles_1 = [];
            }
            this.form.poblacion_1 = ''; // Limpiar la población al cambiar provincia
            this.form.codigoPostal_1 = ''; // Limpiar el código postal
        },
        actualizarPoblaciones() {
            // Lógica para actualizar las poblaciones según la provincia seleccionada
            if (this.form.provincia === 'Madrid') {
                this.poblacionesDisponibles = ['Madrid', 'Alcalá de Henares', 'Getafe'];
            } else if (this.form.provincia === 'Barcelona') {
                this.poblacionesDisponibles = ['Barcelona', 'Badalona', 'Hospitalet'];
            } else {
                this.poblacionesDisponibles = [];
            }
            this.form.poblacion = ''; // Limpiar la población al cambiar provincia
            this.form.codigoPostal = ''; // Limpiar el código postal
        },
        copiarDireccionFiscal() {
            if (this.form.mismaDireccion) {
                this.form.domicilio_2 = this.form.domicilio;
                this.form.provincia_2 = this.form.provincia_1;
                this.form.poblacion_2 = this.form.poblacion_1;
                this.form.codigoPostal_2 = this.form.codigoPostal_1;
            }
        },
        submitForm() {
            // Aquí iría la lógica para enviar el formulario
        }
    }
};
</script>

<style scoped>
.contact-table thead {
    background-color: #f5f5f5;
    color: #333;
}

.contact-table th,
.contact-table td {
    text-align: center;
    padding: 12px 16px;
}

.contact-table tbody tr:hover {
    background-color: #f1f1f1;
}

.input-field {
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: none;
}

.input-field .v-input__control {
    margin-top: 0 !important;
}

.font-weight-bold {
    font-weight: 600;
}

.v-sheet .v-sheet--outlined {
    padding: 30px;
}</style>
