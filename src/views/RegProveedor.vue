<template>
    <v-card class="pa-0" style="height: 90vh; overflow: hidden; position: relative;">

        <!-- Cabecera fija con botón de cerrar -->
        <div style="position: sticky; top: 0; z-index: 2; background-color: rgba(0, 0, 0, 0.5);" class="pa-4">
            <v-card-title class="headline text-white">{{ $t("supplier.regForm") }}</v-card-title>

            <v-btn icon small class="close-btn" @click="$emit('cerrar')"
                style="position: absolute; top: 16px; right: 16px;">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        <!-- Scroll en zona de formulario -->
        <v-card-text style="overflow-y: auto; height: calc(100% - 100px); ">
            <v-form ref="form">
                <!-- Información General -->
                <h3 class="mb-2">{{ $t("supplier.genInfo") }}</h3>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.razonSocial" :label="$t('supplier.companyName')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.cif" :label="$t('supplier.cif')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.domicilioFiscal" :label="$t('supplier.fiscalAddress')" outlined
                                dense />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select v-model="form.provincia_1" :items="provincias" :label="$t('supplier.province')"
                                outlined dense @change="onProvinciaChange_1" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select v-model="form.poblacion_1" :items="poblacionesDisponibles_1.map(p => p.nombre)"
                                :label="$t('supplier.town')" outlined dense @change="onPoblacionChange_1" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.codigoPostal_1" :label="$t('supplier.postalCode')" outlined dense
                                readonly />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.telefono" :label="$t('supplier.phone')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.emailComercial" :label="$t('supplier.email')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.web" :label="$t('supplier.website')" outlined dense />
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Información del apoderado -->
                <h3 class="mb-2">{{ $t("supplier.powerInfo") }}</h3>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.nombreApoderado" :label="$t('supplier.fullName')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.nifApoderado" :label="$t('supplier.nif')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-file-input v-model="form.poderes" :label="$t('supplier.powers')" outlined dense
                                prepend-icon="" prepend-inner-icon="mdi-paperclip" class="file-input" />
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Información comercial -->
                <h3 class="mb-2">{{ $t("supplier.commercialInfo") }}</h3>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select v-model="form.tipoProveedor"
                                :items="['Proveedor de materiales', 'Subcontratista', 'Ambos']"
                                :label="$t('supplier.supplierType')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.seguridadSocial" :label="$t('supplier.socialSecurity')" outlined
                                dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.iban" :label="$t('supplier.iban')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.certTitularidad" :label="$t('supplier.ownershipCert')" outlined
                                dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.oficios" :label="$t('supplier.trades')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="form.ambito" :items="['nacional', 'regional', 'provincial']"
                                :label="$t('supplier.geoAvailability')" outlined dense />
                        </v-col>

                        <v-col v-if="form.ambito === 'regional' || form.ambito === 'provincial'" cols="12" md="6">
                            <v-select v-model="form.region_2" :items="provincias" :label="$t('supplier.selectRegion')"
                                outlined dense />
                        </v-col>

                        <v-col v-if="form.ambito === 'provincial'" cols="12" md="6">
                            <v-select v-model="form.provincia_2" :items="poblacionesDisponibles_2.map(p => p.nombre)"
                                :label="$t('supplier.selectProvince')" outlined dense />
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Dirección de envío de pagarés -->
                <h3 class="mb-2">{{ $t("supplier.pledgeAddress") }}</h3>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.domicilioEnvio" :label="$t('supplier.address')" outlined dense />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="form.provincia" :items="provincias" :label="$t('supplier.province')" outlined
                                dense @change="onProvinciaChange" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="form.poblacion" :items="poblacionesDisponibles.map(p => p.nombre)"
                                :label="$t('supplier.town')" outlined dense @change="onPoblacionChange" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.codigoPostal" :label="$t('supplier.postalCode')" outlined dense
                                readonly />
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-checkbox v-model="form.mismaDireccion" :label="$t('supplier.sameAsFiscal')"
                                @change="copiarDireccionFiscal" />
                        </v-col>
                    </v-row>
                </v-container>

                <h2 class="mb-2 mt-2">{{ $t("supplier.contacts") }}</h2>
                <table style="width: 100%;" class="pa-3">
                    <thead>
                        <tr>
                            <th class="first-col-row"></th>
                            <th >Nombre</th>
                            <th >Teléfono</th>
                            <th >Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in contactos" :key="index">
                            <td class="first-column" data-label="Rol">
                                <p>{{ item.rol }}</p>
                            </td>
                            <td class="" data-label="Nombre y Apellidos">
                                <v-text-field v-model="item.nombre" outlined persistent-placeholder  dense
                                    hide-details="auto" class="caption input_media" :disabled="contactos.disable"
                                    @input="upperText(contactos.name)"></v-text-field>
                            </td>
                            <td class="" data-label="Teléfono">
                                <v-text-field v-model="item.nombre" outlined persistent-placeholder dense
                                    hide-details="auto" class="caption input_media" :disabled="contactos.disable"
                                    @input="upperText(contactos.phone)"></v-text-field>
                            </td>
                            <td class=" last-column" data-label="Email">
                                <v-text-field v-model="item.nombre" outlined persistent-placeholder dense
                                    hide-details="auto" class="caption input_media" :disabled="contactos.disable"></v-text-field>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Aceptación y envío -->
                <v-row class="align-center mt-4">
                    <v-col cols="auto">
                        <v-checkbox v-model="form.aceptaLOPD" :rules="[v => !!v || $t('supplier.acceptLOPD')]"
                            hide-details />
                    </v-col>
                    <v-col class="pl-0">
                        <span class="text-body-2">
                            {{ $t('supplier.acceptPrefix') }}
                            <a href="#" @click.prevent="dialogPoliticas = true" class="text-primary font-weight-medium">
                                {{ $t('supplier.acceptLink') }}
                            </a>
                        </span>
                    </v-col>

                    <v-col cols="12">
                        <v-btn color="primary" type="submit" @click.prevent="submitForm">
                            {{ $t('supplier.submit') }}
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
                { rol: this.$t("supplier.contactRols")[0] },
                { rol: this.$t("supplier.contactRols")[1] },
                { rol: this.$t("supplier.contactRols")[2] },
                { rol: this.$t("supplier.contactRols")[3] }
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

<style>

.first-column, .first-col-row{
    font-weight: bold;
}
.v-input--hide-details {
    margin: 0;
    padding: 0;
}

.header-cell {
    font-size: 1px;
    border: 1px solid darkgray;
    color: white;
    text-align: center;
    border-radius: 5px;
    background-color: #1976d2;
}

.contact-h {
    color: white;
    font-weight: 500;
    text-align: left;
    padding: 8px;
}

.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {
    padding: 1px 1px;
}

.formulario {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.v-application p {
    margin: 0;
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