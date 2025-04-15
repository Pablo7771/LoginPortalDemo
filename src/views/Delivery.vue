<template>
    <v-app style="min-height: 100%; width: 100%; margin: 0;">
        <v-main>
            <v-container>
                <v-row>
                    <!-- Menú lateral de categorías -->
                    <v-col cols="12" md="4" class="sticky-categories">
                        <v-list nav dense shaped>
                            <v-subheader>Categorías</v-subheader>
                            <v-list-item v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
                                :class="{ 'bg-grey lighten-4': selectedCategory === cat }">
                                <v-list-item-title>{{ cat }}</v-list-item-title>
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
                                <div>€{{ (item.price * item.qty).toFixed(2) }}</div>
                            </v-list-item>
                        </v-list>

                        <v-divider class="my-3" />
                        <div class="text-right font-weight-bold mb-2">
                            Total: €{{ cartTotal }}
                        </div>

                        <v-btn color="success" block @click="checkout" :disabled="cart.length === 0">
                            Confirmar Pedido
                        </v-btn>
                    </v-col>


                    <!-- Productos -->
                    <v-col cols="12" sm="6" md="12">
                        <h3 class="mb-4">{{ selectedCategory }}</h3>
                        <v-row style="display: flex; flex-wrap: wrap">
                            <v-col v-for="item in filteredMenu" :key="item.id" sm="12" md="6" class="d-flex justify-center">
                                <v-card class="hover-card" elevation="2" style="width: 100%">
                                    <v-img :src="item.image" height="260px" class="rounded-t object-fill" contain />
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
    </v-app>
</template>
  
<script>
export default {
    name: "McStyleOrder",
    data() {
        return {
            selectedCategory: "Comidas",
            categories: ["Comidas", "Bebidas", "Postres"],
            menu: [
                { id: 1, name: "Big Burger", price: 10, category: "Comidas", image: require("@/assets/productos/nuggt.png") },
                { id: 2, name: "Chicken Nuggets", price: 7, category: "Comidas", image: require("@/assets/productos/hambur.png") },
                { id: 3, name: "Coca Cola", price: 3, category: "Bebidas", image: require("@/assets/productos/cocacola.png") },
                { id: 4, name: "Helado", price: 4, category: "Postres", image: require("@/assets/productos/helado.png") },
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
</style>