<template>
    <v-card style="min-height: 100%; width: 100%; margin: 0; padding: 30px">

        <!-- Ícono de cierre arriba a la derecha -->
        <v-btn icon small class="close-btn" @click="$emit('cerrar')">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-main>
            <v-container>
                <v-row>
                    <!-- Menú lateral de categorías -->
                    <v-col cols="12" md="4" class="sticky-categories">
                        <v-list nav dense shaped class="rounded shadow-sm">
                            <v-subheader class="text-h6 font-weight-bold">Categorías</v-subheader>
                            <v-list-item 
                                v-for="cat in categories" 
                                :key="cat" 
                                @click="selectedCategory = cat" 
                                :class="{
                                    'bg-primary text-white': selectedCategory === cat, 
                                    'hover:bg-grey lighten-3': selectedCategory !== cat
                                }" 
                                class="transition-all duration-200 rounded">
                                <v-list-item-title class="text-truncate">{{ cat }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <!-- Carrito -->
                    <v-col cols="12" md="8" style="margin-left: auto; min-width: 250px;">
                        <h3>Mi Pedido</h3>
                        <v-list dense>
                            <v-list-item v-for="(item, index) in cart" :key="index" class="justify-space-between">
                                <div>
                                    {{ item.name }} x{{ item.qty }}
                                </div>
                                <div style="margin-left: auto">€ {{ (item.price * item.qty).toFixed(2) }}</div>
                            </v-list-item>
                        </v-list>

                        <v-divider class="my-3" />
                        <div class="text-right font-weight-bold mb-2">
                            Total: € {{ cartTotal }}
                        </div>

                        <v-btn color="success" block @click="checkout" :disabled="cart.length === 0">
                            Confirmar Pedido
                        </v-btn>
                    </v-col>

                    <!-- Productos -->
                    <v-col cols="12" sm="12" md="12">
                        <h3 class="mb-4">{{ selectedCategory }}</h3>
                        <v-row style="display: flex; flex-wrap: wrap">
                            <v-col v-for="item in filteredMenu" :key="item.id" sm="4" md="4" class="d-flex justify-center">
                                <v-card class="hover-card" elevation="2" style="width: 100%">
                                    <v-img :src="item.image" height="300px" class="rounded-t object-fill" contain />
                                    <v-card-title class="text-wrap">{{ item.name }}</v-card-title>
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
                                            Agregar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>

                            <v-col v-if="filteredMenu.length === 0" cols="12">
                                <v-alert type="info" border="left" colored-border>
                                    No hay productos disponibles en esta categoría.
                                </v-alert>
                            </v-col>
                        </v-row>
                    </v-col>


                </v-row>
            </v-container>
        </v-main>
    </v-card>
</template>
  
<script>
export default {
    name: "McStyleOrder",
    data() {
        return {
            selectedCategory: "Comidas",
            categories: ["Comidas", "Bebidas", "Postres"],
            menu: [
                { id: 1, name: "Carne al Humo", price: 10, category: "Comidas", image: require("@/assets/productos/comida_1.jpg") },
                { id: 2, name: "Carne al Asador Real", price: 12, category: "Comidas", image: require("@/assets/productos/comida_2.jpg") },
                { id: 3, name: "Caldillo de Langostino", price: 8, category: "Comidas", image: require("@/assets/productos/comida_3.jpg") },
                { id: 4, name: "Bola Asada", price: 7, category: "Comidas", image: require("@/assets/productos/comida_4.jpg") },
                { id: 5, name: "Crema del Sol", price: 11, category: "Comidas", image: require("@/assets/productos/comida_5.jpg") },
                { id: 6, name: "Crispados al Limón", price: 5, category: "Comidas", image: require("@/assets/productos/comida_6.jpg") },
                { id: 7, name: "Burguer Roja y Crema", price: 14, category: "Comidas", image: require("@/assets/productos/comida_hbg_1_11zon.jpg") },
                { id: 8, name: "Hamburguesa Completa", price: 12, category: "Comidas", image: require("@/assets/productos/comida_hbg_2_11zon.jpg") },
                { id: 9, name: "Burguer Frescura", price: 13, category: "Comidas", image: require("@/assets/productos/comida_hbg_3_11zon.jpg") },
                { id: 10, name: "Papas Crujientes", price: 12, category: "Comidas", image: require("@/assets/productos/comida_papa_frita_1_11zon.jpg") },
                { id: 11, name: "Fritas del Triángulo", price: 9, category: "Comidas", image: require("@/assets/productos/comida_papa_frita_2_11zon.jpg") },
                { id: 12, name: "Papas Delgadas", price: 7, category: "Comidas", image: require("@/assets/productos/comida_papa_frita_3_11zon.jpg") },
                
                { id: 13, name: "Blue Ember", price: 3, category: "Bebidas", image: require("@/assets/productos/bebida_azul.jpg") },
                { id: 14, name: "Verde Latte", price: 4, category: "Bebidas", image: require("@/assets/productos/bebida_cafe.jpg") },
                { id: 15, name: "Corazón de Fresa", price: 2, category: "Bebidas", image: require("@/assets/productos/bebida_coctela.jpg") },
                { id: 16, name: "Verde Prístino", price: 5, category: "Bebidas", image: require("@/assets/productos/bebida_limoda.jpg") },
                { id: 17, name: "Crema Boreal", price: 6, category: "Bebidas", image: require("@/assets/productos/bebida_malteada.jpg") },
                { id: 18, name: "Zafiro Cítrico", price: 10, category: "Bebidas", image: require("@/assets/productos/bebida_morado.jpg") },
                { id: 20, name: "Crema de Coco y Membrillo", price: 12, category: "Postres", image: require("@/assets/productos/postre_coco_11zon.jpg") },
                { id: 21, name: "Cereza Encantada", price: 14, category: "Postres", image: require("@/assets/productos/postre_copa_11zon.jpg") },
                { id: 22, name: "Dulce de Chocolate y Manjar", price: 11, category: "Postres", image: require("@/assets/productos/postre_crema_11zon.jpg") },
                { id: 23, name: "Dulces de Colores", price: 24, category: "Postres", image: require("@/assets/productos/postre_empanada_1_11zon.jpg") },
                { id: 24, name: "Cereza Encantada", price: 15, category: "Postres", image: require("@/assets/productos/postre_empanada_2_11zon.jpg") },
                { id: 25, name: "Pastelito de Nieve y Fresa", price: 12, category: "Postres", image: require("@/assets/productos/postre_fresa_11zon.jpg") },
                { id: 26, name: "Tarta de Crema Morada", price: 17, category: "Postres", image: require("@/assets/productos/postre_mermelada_1_11zon.jpg") },
                { id: 27, name: "Mermelada Encantada", price: 10, category: "Postres", image: require("@/assets/productos/postre_mermelada_11zon.jpg") },
                { id: 28, name: "Crema Carmesí con Cereza", price: 14, category: "Postres", image: require("@/assets/productos/postre_pastelillo_11zon.jpg") }
            ],
            cart: [],
        };
    },
    computed: {
        filteredMenu() {
            return this.menu.filter((item) => item.category === this.selectedCategory);
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
        },
    },
    methods: {
        getItemQty(id) {
            const found = this.cart.find(i => i.id === id);
            return found ? found.qty : 0;
        },
        addToCart(item) {
            this.cart.push({ ...item, qty: 1 });
        },
        changeQty(item, delta) {
            const found = this.cart.find(i => i.id === item.id);
            if (found) {
                found.qty += delta;
                if (found.qty <= 0) {
                    this.cart = this.cart.filter(i => i.id !== item.id);
                }
            }
        },
        checkout() {
            alert("Pedido confirmado:\n" + JSON.stringify(this.cart, null, 2));
            this.cart = [];
        },
    },
};
</script>
  
<style scoped>
.form-wrapper > .v-card > .v-sheet {
    padding: 100px;
}
.hover-card {
    transition: transform 0.2s ease;
}

.hover-card:hover {
    transform: scale(1.02);
}

.v-img {
    object-fit: cover;
}

.sticky-categories {
    position: sticky;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden
}

/* Botón de cerrar */
.close-btn {
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 2;
}


.sticky-categories {
    position: sticky;
    top: 10px;
    z-index: 10;
}

.v-list-item:hover {
    cursor: pointer;
}

.v-list-item-title {
    font-size: 1rem;
    font-weight: 500;
}

.v-list {
    background-color: #f5f5f5; /* Background color for the list */
    padding: 0.5rem;
    border-radius: 8px;
}

.v-subheader {
    font-size: 1.1rem;
    color: #333;
}
</style>
