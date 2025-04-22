<template>
    <v-card style="min-height: 100%; width: 100%; margin: 0;padding: 0; position: relative; border-radius: 5px;">

        <div class="d-flex align-center justify-space-between px-4 py-3 elevation-1"
            style="background-color: rgba(0, 0, 0, 0.5); color: white; margin-bottom: 1px;">
            <h2 class="text-h6 font-weight-bold mb-0">{{ $t('delivery.title') }}</h2>

            <!-- Botón de cierre en la barra -->
            <v-btn icon small @click="$emit('cerrar')" color="white" >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        <v-main>
            <v-container fluid>
                <v-row style="overflow: scroll; max-height: 80vh;">
                    <!-- Menú lateral de categorías -->
                    <v-col cols="12" md="4" class="">
                        <!-- Lista de categorías -->
                        <v-list nav dense shaped class="rounded elevation-1 pa-2">
                            <v-subheader class="text-h6 font-weight-bold">{{ $t('delivery.categories') }}</v-subheader>
                            <v-divider class="mb-2" />
                            <div class="d-flex">
                                <v-list-item v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="{
                                    'bg-primary text-white': selectedCategory === cat,
                                    'hover:bg-grey lighten-4': selectedCategory !== cat
                                }" style="border: 1px solid darkgray;" class="rounded transition-all duration-200">
                                    <v-list-item-content>
                                        <v-list-item-title >{{ cat }}</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-icon v-if="selectedCategory === cat">
                                        <v-icon>mdi-check-circle</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </div>
                        </v-list>

                        <v-card nav dense shaped class="rounded elevation-1 mt-1">
                            <v-subheader class="text-h6 font-weight-bold">{{ $t('delivery.myOrder') }}</v-subheader>
                            <v-divider class="mb-2 mr-4 ml-4" v-if="cart.length > 0"/>
                            <v-card-text >
                                <v-list dense style="max-height:35vh;overflow:auto;" v-if="cart.length > 0">
                                    <v-list-item v-for="(item, index) in cart" :key="index"
                                        class="d-flex justify-space-between">
                                        <div>{{ item.name }} x{{ item.qty }}</div>
                                        <div style="margin-left: auto;">€ {{ (item.price * item.qty).toFixed(0) }}</div>
                                    </v-list-item>
                                </v-list>

                                <v-divider class="my-3" />
                                <div class="text-right font-weight-bold mb-2">
                                    {{ $t('delivery.total') }}: € {{ cartTotal }}
                                </div>
                                <v-btn color="success" block @click="checkout" :disabled="cart.length === 0" >
                                    {{ $t('delivery.confirmOrder') }}
                                </v-btn>

                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Contenido principal -->
                    <v-col cols="12" md="8">
                        <v-row>
                            <!-- Sección: Productos -->
                            <v-col cols="12">
                                <h3 class="mb-4 text-h6 font-weight-bold">{{ selectedCategory }}</h3>
                                <v-row>
                                    <v-col v-for="item in filteredMenu" :key="item.id" cols="12" sm="6" md="6"
                                        class="d-flex justify-center">
                                        <v-card class="hover-card" elevation="2" style="width: 100%;">
                                            <v-img :src="item.image" height="300px" class="rounded-t" contain />
                                            <v-card-title class="text-wrap text-truncate">
                                                {{ item.name }}
                                            </v-card-title>
                                            <v-card-subtitle>€{{ item.price.toFixed(2) }}</v-card-subtitle>
                                            <v-card-actions class="justify-center">
                                                <template v-if="getItemQty(item.id)">
                                                    <v-btn icon @click="changeQty(item, -1)">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <span class="mx-2">{{ getItemQty(item.id) }}</span>
                                                    <v-btn icon @click="changeQty(item, 1)">
                                                        <v-icon>mdi-plus</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-btn v-else color="primary" @click="addToCart(item)">
                                                    {{ $t('delivery.add') }}
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-col>

                                    <v-col v-if="filteredMenu.length === 0" cols="12">
                                        <v-alert type="info" border="left" colored-border>
                                            {{ $t('delivery.noProducts') }}
                                        </v-alert>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>

                </v-row>
            </v-container>
        </v-main>
    </v-card>
</template>

<script>
import { EventBus } from "./test";

export default {
    name: "McStyleOrder",
    data() {
        return {
            selectedCategory: this.$t("delivery.categoryLabels")[0],
            categories: this.$t("delivery.categoryLabels"),
            menu: [
                { id: 1, name: "Carne al Humo", price: 10, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_1.jpg") },
                { id: 2, name: "Carne al Asador Real", price: 12, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_2.jpg") },
                { id: 3, name: "Caldillo de Langostino", price: 8, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_3.jpg") },
                { id: 4, name: "Bola Asada", price: 7, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_4.jpg") },
                { id: 5, name: "Crema del Sol", price: 11, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_5.jpg") },
                { id: 6, name: "Crispados al Limón", price: 5, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_6.jpg") },
                { id: 7, name: "Burguer Roja y Crema", price: 14, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_hbg_1_11zon.jpg") },
                { id: 8, name: "Hamburguesa Completa", price: 12, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_hbg_2_11zon.jpg") },
                { id: 9, name: "Burguer Frescura", price: 13, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_hbg_3_11zon.jpg") },
                { id: 10, name: "Papas Crujientes", price: 12, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_papa_frita_1_11zon.jpg") },
                { id: 11, name: "Fritas del Triángulo", price: 9, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_papa_frita_2_11zon.jpg") },
                { id: 12, name: "Papas Delgadas", price: 7, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_papa_frita_3_11zon.jpg") },

                { id: 13, name: "Blue Ember", price: 3, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_azul.jpg") },
                { id: 14, name: "Verde Latte", price: 4, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_cafe.jpg") },
                { id: 15, name: "Corazón de Fresa", price: 2, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_coctela.jpg") },
                { id: 16, name: "Verde Prístino", price: 5, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_limoda.jpg") },
                { id: 17, name: "Crema Boreal", price: 6, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_malteada.jpg") },
                { id: 18, name: "Zafiro Cítrico", price: 10, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_morado.jpg") },

                { id: 20, name: "Crema de Coco y Membrillo", price: 12, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_coco_11zon.jpg") },
                { id: 21, name: "Cereza Encantada", price: 14, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_copa_11zon.jpg") },
                { id: 22, name: "Dulce de Chocolate y Manjar", price: 11, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_crema_11zon.jpg") },
                { id: 23, name: "Dulces de Colores", price: 24, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_empanada_1_11zon.jpg") },
                { id: 24, name: "Cereza Encantada", price: 15, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_empanada_2_11zon.jpg") },
                { id: 25, name: "Pastelito de Nieve y Fresa", price: 12, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_fresa_11zon.jpg") },
                { id: 26, name: "Tarta de Crema Morada", price: 17, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_mermelada_1_11zon.jpg") },
                { id: 27, name: "Mermelada Encantada", price: 10, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_mermelada_11zon.jpg") },
                { id: 28, name: "Crema Carmesí con Cereza", price: 14, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_pastelillo_11zon.jpg") }
            ],
            cart: [],
        };
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(0);
        },
        filteredMenu() {
            return this.menu.filter(item => item.category === this.selectedCategory);
        },
    },
    created() {
        EventBus.$on('mensaje-cambiado', (nuevoMensaje) => {
            console.log(this.$t("delivery.categoryLabels")[0]);
            this.categories = this.$t("delivery.categoryLabels");
            this.selectedCategory = this.$t("delivery.categoryLabels")[0];
            this.menu = [
                { id: 1, name: "Carne al Humo", price: 10, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_1.jpg") },
                { id: 2, name: "Carne al Asador Real", price: 12, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_2.jpg") },
                { id: 3, name: "Caldillo de Langostino", price: 8, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_3.jpg") },
                { id: 4, name: "Bola Asada", price: 7, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_4.jpg") },
                { id: 5, name: "Crema del Sol", price: 11, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_5.jpg") },
                { id: 6, name: "Crispados al Limón", price: 5, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_6.jpg") },
                { id: 7, name: "Burguer Roja y Crema", price: 14, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_hbg_1_11zon.jpg") },
                { id: 8, name: "Hamburguesa Completa", price: 12, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_hbg_2_11zon.jpg") },
                { id: 9, name: "Burguer Frescura", price: 13, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_hbg_3_11zon.jpg") },
                { id: 10, name: "Papas Crujientes", price: 12, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_papa_frita_1_11zon.jpg") },
                { id: 11, name: "Fritas del Triángulo", price: 9, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_papa_frita_2_11zon.jpg") },
                { id: 12, name: "Papas Delgadas", price: 7, category: this.$t("delivery.categoryLabels")[0], image: require("@/assets/productos/comida_papa_frita_3_11zon.jpg") },

                { id: 13, name: "Blue Ember", price: 3, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_azul.jpg") },
                { id: 14, name: "Verde Latte", price: 4, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_cafe.jpg") },
                { id: 15, name: "Corazón de Fresa", price: 2, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_coctela.jpg") },
                { id: 16, name: "Verde Prístino", price: 5, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_limoda.jpg") },
                { id: 17, name: "Crema Boreal", price: 6, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_malteada.jpg") },
                { id: 18, name: "Zafiro Cítrico", price: 10, category: this.$t("delivery.categoryLabels")[1], image: require("@/assets/productos/bebida_morado.jpg") },

                { id: 20, name: "Crema de Coco y Membrillo", price: 12, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_coco_11zon.jpg") },
                { id: 21, name: "Cereza Encantada", price: 14, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_copa_11zon.jpg") },
                { id: 22, name: "Dulce de Chocolate y Manjar", price: 11, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_crema_11zon.jpg") },
                { id: 23, name: "Dulces de Colores", price: 24, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_empanada_1_11zon.jpg") },
                { id: 24, name: "Cereza Encantada", price: 15, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_empanada_2_11zon.jpg") },
                { id: 25, name: "Pastelito de Nieve y Fresa", price: 12, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_fresa_11zon.jpg") },
                { id: 26, name: "Tarta de Crema Morada", price: 17, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_mermelada_1_11zon.jpg") },
                { id: 27, name: "Mermelada Encantada", price: 10, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_mermelada_11zon.jpg") },
                { id: 28, name: "Crema Carmesí con Cereza", price: 14, category: this.$t("delivery.categoryLabels")[2], image: require("@/assets/productos/postre_pastelillo_11zon.jpg") }
            ]
            console.log("Mensaje cambiado en Delivery:", nuevoMensaje);
        });
    },
    methods: {
        addToCart(item) {
            this.cart.push({ ...item, qty: 1 });
        },
        changeQty(item, delta) {
            const cartItem = this.cart.find(i => i.id === item.id);
            if (cartItem) {
                cartItem.qty += delta;
                if (cartItem.qty <= 0) {
                    this.cart = this.cart.filter(i => i.id !== item.id);
                }
            }
        },
        getItemQty(id) {
            const cartItem = this.cart.find(i => i.id === id);
            return cartItem ? cartItem.qty : 0;
        },
        checkout() {
            // Aquí iría la lógica para el pago o procesamiento del pedido
            alert(this.$t("delivery.orderConfirmed") + "\n" + JSON.stringify(this.cart, null, 2));

            /*fetch(`${process.env.VUE_APP_API_URL}/registro_demo`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJleHAiOjQxMDI0NDEyMDAsInVzciI6ImVjb21fdXNlciJ9.6fLJ2VriBl82xM9suCTnaq_GBCrgfJSYi_-i0RKGsVkauinTWcXVkzoxbSpsNhcb'
                    },
                    body: JSON.stringify(payload),
                })
                    .then(async response => {
                        if (!response.ok) {
                            const error = await response.text();
                            throw new Error(error || this.$t('register.submitError'));
                        }
                        alert(this.$t('register.submitSuccess'));
                        this.$router.push('/');
                    })
                    .catch(err => {
                        console.error(err);
                        alert(this.$t('register.submitError'));
                    });*/
        }
    }
};
</script>
  
<style scoped>
.v-card {
    background-color: #fff;
    border-radius: 0px;
}

.hover-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.v-img {
    object-fit: cover;
}

.text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (max-width: 768px) {
    .v-btn {
        font-size: 14px;
    }

    .v-card-title {
        font-size: 16px;
    }

    .v-card-subtitle {
        font-size: 14px;
    }
}
</style>