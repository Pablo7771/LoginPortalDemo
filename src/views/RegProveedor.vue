<template>

<v-card style="min-height: 100%; width: 100%; margin: 0; padding: 30px">
    <form class="formulario">
        <h2 class="titulo">Formulario de registro</h2>

        <!-- Información General -->
        <section :style="sectionStyle">
            <div class="input-container"><input type="text" placeholder="Razón social*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="CIF / NIF / NIE*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Domicilio fiscal*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Provincia*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Población*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Código postal*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Teléfono*" class="input" /></div>
            <div class="input-container"><input type="email" placeholder="Email para gestión comercial*" class="input" />
            </div>
            <div class="input-container" :style="fullWidthStyle"><input type="url" placeholder="Web" class="input" /></div>
        </section>

        <!-- Información del apoderado -->
        <h2 class="titulo">Información del apoderado</h2>
        <section :style="sectionStyle">
            <div class="input-container"><input type="text" placeholder="Nombre y apellidos*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="NIF / NIE*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Poderes*" class="input md:col-span-2" /></div>
        </section>

        <!-- Información comercial -->
        <h2 class="titulo">Información comercial</h2>
        <section :style="sectionStyle">
            <div class="input-container">
                <select class="input">
                    <option disabled selected>Tipo de proveedor*</option>
                    <option>Opción 1</option>
                </select>
            </div>
            <div class="input-container"><input type="text" placeholder="Nº Seguridad Social" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="IBAN*" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Certificado titularidad" class="input" /></div>
            <div class="input-container"><input type="text" placeholder="Oficios*" class="input" /></div>

            <div class="input-container">
                <select class="input">
                    <option disabled selected>Disponibilidad Geográfica*</option>
                    <option>Opción 1</option>
                </select>
            </div>
        </section>

        <!-- Dirección de envío de pagarés -->
        <h2 class="titulo">Dirección de envío de pagarés</h2>
        <section :style="sectionStyle">
            <div class="input-container"><input type="text" placeholder="Domicilio" class="input" /></div>

            <div class="input-container">
                <div>
                    <select v-model="form.provincia" @change="onProvinciaChange" class="input">
                        <option disabled value="">Provincia</option>
                        <option v-for="prov in provincias" :key="prov" :value="prov">{{ prov }}</option>
                    </select>
                </div>
            </div>

            <div class="input-container">
                <div>
                    <select v-model="form.poblacion" @change="onPoblacionChange" class="input">
                        <option disabled value="">Población</option>
                        <option v-for="pob in poblacionesDisponibles" :key="pob.nombre" :value="pob.nombre">
                            {{ pob.nombre }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Código postal automático -->
            <div class="input-container">
                <input v-model="form.codigoPostal" type="text" placeholder="Código postal" class="input" readonly />
            </div>
            <div class="input-container">
                <div class="md:col-span-2 flex items-center space-x-2">
                    <input type="checkbox" id="igual" />
                    <label for="igual">Misma que la dirección fiscal</label>
                </div>
            </div>
        </section>

        <!-- Contactos -->
        <h2 class="titulo">Contactos</h2>
        <section>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border">
                    <thead class="bg-green-200">
                        <tr>
                            <th class="p-2">&nbsp;</th>
                            <th class="p-2">Nombre y apellidos</th>
                            <th class="p-2">Teléfono</th>
                            <th class="p-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-2">Compras*</td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="email" class="input" /></td>
                        </tr>
                        <tr>
                            <td class="p-2">Administración*</td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="email" class="input" /></td>
                        </tr>
                        <tr>
                            <td class="p-2">Contabilidad*</td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="email" class="input" /></td>
                        </tr>
                        <tr>
                            <td class="p-2">Otros</td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="text" class="input" /></td>
                            <td><input type="email" class="input" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Aceptación y envío -->
        <section class="space-y-2">
            <div class="input-container">
                <label class="flex items-center space-x-2">
                    <input type="checkbox" required />
                    <span>He leído y acepto la política LOPD</span>
                </label>
            </div>

            <div class="input-container">
                <button type="submit">
                    Finalizar formulario y enviar
                </button>
            </div>
        </section>
    </form>

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
                poblacion: '',
                telefono: '',
                email: '',
                web: '',
                codigoPostal: ''
            },
            provincias: ['Madrid', 'Barcelona', 'Valencia'],
            poblaciones: {
                Madrid: [
                    { nombre: 'Madrid', cp: '28001' },
                    { nombre: 'Alcalá de Henares', cp: '28801' }
                ],
                Barcelona: [
                    { nombre: 'Barcelona', cp: '08001' },
                    { nombre: 'Hospitalet', cp: '08901' }
                ],
                Valencia: [
                    { nombre: 'Valencia', cp: '46001' },
                    { nombre: 'Gandía', cp: '46701' }
                ]
            }
        }
    },
    computed: {
        poblacionesDisponibles() {
            return this.poblaciones[this.form.provincia] || [];
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
        onPoblacionChange() {
            const pob = this.poblacionesDisponibles.find(p => p.nombre === this.form.poblacion);
            this.form.codigoPostal = pob ? pob.cp : '';
        },
        handleResize() {
            this.isWideScreen = window.innerWidth >= 768;
        },
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

.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 20px;
    z-index: 10;
    transition: all 0.3s ease;
    color: #73cda4;
}

button:hover {
    background-color: #6bc19b;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>