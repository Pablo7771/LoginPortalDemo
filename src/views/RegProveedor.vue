<template>
    <v-card>
        <!-- Formulario -->
        <v-card class="mx-auto" max-width="800px" outlined>
            <v-card-title class="text-h5">Formulario De Registro Proveedor</v-card-title>

            <!-- Información General -->
            <v-card-subtitle>Información General</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.razonSocial" label="Razón Social*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.nif" label="CIF / NIF / NIE*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.domicilio" label="Domicilio Fiscal*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.provincia_1" :items="provincias" label="Provincia" outlined
                            dense></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.poblacion_1" :items="poblacionesDisponibles_1" label="Población" outlined
                            dense></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.codigoPostal_1" label="Código Postal" outlined dense
                            readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.telefono" label="Teléfono*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.email" label="Email Para Gestión Comercial*" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.web" label="Web" outlined dense></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Información Del Apoderado -->
            <v-card-subtitle>Información Del Apoderado</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.nombreApoderado" label="Nombre Y Apellidos*" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.nifApoderado" label="NIF / NIE*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.poderes" label="Poderes*" outlined dense></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Información Comercial -->
            <v-card-subtitle>Información Comercial</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.tipoProveedor"
                            :items="['Proveedor De Materiales', 'Subcontratista', 'Ambos']" label="Tipo De Proveedor*"
                            outlined dense></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.seguroSocial" label="Nº Seguro Social" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.iban" label="IBAN*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.certificadoTitularidad" label="Certificado Titularidad" outlined
                            dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.oficios" label="Oficios*" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.ambito" :items="['nacional', 'regional', 'provincial']"
                            label="Disponibilidad Geográfica*" outlined dense></v-select>
                    </v-col>
                    <v-col cols="12" v-if="form.ambito === 'regional' || form.ambito === 'provincial'">
                        <v-select v-model="form.region_2" :items="provincias" label="Seleccione Una Región" outlined
                            dense></v-select>
                    </v-col>
                    <v-col cols="12" v-if="form.ambito === 'provincial'">
                        <v-select v-model="form.provincia_2" :items="poblacionesDisponibles_2"
                            label="Seleccione Una Provincia" outlined dense></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Dirección De Envío De Pagarés -->
            <v-card-subtitle>Dirección De Envío De Pagarés</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="form.domicilio_2" label="Domicilio" outlined dense></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.provincia" :items="provincias" label="Provincia" outlined dense></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="form.poblacion" :items="poblacionesDisponibles" label="Población" outlined
                            dense></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.codigoPostal" label="Código Postal" outlined dense
                            readonly></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="form.mismaDireccion" label="Misma Que La Dirección Fiscal"
                            @change="copiarDireccionFiscal"></v-checkbox>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Contactos -->
            <v-card-subtitle>Contactos</v-card-subtitle>
            <v-card-text>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th class="text-left">Nombre Y Apellidos</th>
                            <th class="text-left">Teléfono</th>
                            <th class="text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><v-text-field v-model="form.contactoCompras" outlined dense></v-text-field></td>
                            <td><v-text-field v-model="form.contactoComprasTelefono" outlined dense></v-text-field></td>
                            <td><v-text-field v-model="form.contactoComprasEmail" outlined dense></v-text-field></td>
                        </tr>
                        <tr>
                            <td><v-text-field v-model="form.contactoAdministracion" outlined dense></v-text-field></td>
                            <td><v-text-field v-model="form.contactoAdministracionTelefono" outlined dense></v-text-field>
                            </td>
                            <td><v-text-field v-model="form.contactoAdministracionEmail" outlined dense></v-text-field></td>
                        </tr>
                        <tr>
                            <td><v-text-field v-model="form.contactoContabilidad" outlined dense></v-text-field></td>
                            <td><v-text-field v-model="form.contactoContabilidadTelefono" outlined dense></v-text-field>
                            </td>
                            <td><v-text-field v-model="form.contactoContabilidadEmail" outlined dense></v-text-field></td>
                        </tr>
                        <tr>
                            <td><v-text-field v-model="form.contactoOtros" outlined dense></v-text-field></td>
                            <td><v-text-field v-model="form.contactoOtrosTelefono" outlined dense></v-text-field></td>
                            <td><v-text-field v-model="form.contactoOtrosEmail" outlined dense></v-text-field></td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>

            <!-- Aceptación Y Envío -->
            <v-card-subtitle>Aceptación Y Envío</v-card-subtitle>
            <v-card-text>
                <v-checkbox v-model="form.acepto" label="He Leído Y Acepto La Política LOPD" required></v-checkbox>
                <v-btn color="primary" @click="submitForm">Finalizar Formulario Y Enviar</v-btn>
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
            provincias: ['Madrid', 'Barcelona', 'Valencia'],
            poblacionesDisponibles: [],
            poblacionesDisponibles_1: [],
            poblacionesDisponibles_2: [],
        };
    },
    methods: {
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
  
<style scoped>.v-sheet .v-sheet--outlined {
    padding: 30px;
}</style>
  