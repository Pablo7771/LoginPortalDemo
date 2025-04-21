<template>
    <v-card style="min-height: 100%; width: 100%; margin: 0; padding: 30px">
        <!-- Botón de cierre -->
        <v-btn icon small class="close-btn" @click="$emit('cerrar')">
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-main>
            <v-container>
                <v-row>
                    <!-- Menú lateral de categorías -->
                    <v-col cols="12" md="3" class="sticky-categories">
                        <v-list nav dense shaped>
                            <v-subheader>Categorías</v-subheader>
                            <v-list-item v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
                                :class="{ 'bg-grey lighten-4': selectedCategory === cat }">
                                <v-list-item-title class="text-capitalize">
                                    {{ cat }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>

                    <!-- Productos -->
                    <v-col cols="12" md="6">
                        <h3 class="mb-4 text-center">{{ selectedCategory }}</h3>
                        <v-row dense>
                            <v-col v-for="item in filteredMenu" :key="item.id" cols="12" sm="6" md="6"
                                class="d-flex justify-center">
                                <v-card class="hover-card" elevation="2" style="width: 100%">
                                    <v-img :src="item.image" height="200px" class="rounded-t object-fill" contain />
                                    <v-card-title class="text-wrap font-weight-bold">{{ item.name }}</v-card-title>
                                    <v-card-subtitle>€{{ item.price.toFixed(2) }}</v-card-subtitle>
                                    <v-card-actions class="justify-center">
                                        <template v-if="getItemQty(item.id)">
                                            <v-btn icon @click="changeQty(item, -1)">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <span class="mx-2 font-weight-bold">{{ getItemQty(item.id) }}</span>
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

                    <!-- Carrito -->
                    <v-col cols="12" md="3" class="cart-col">
                        <h3 class="text-center">Mi Pedido</h3>
                        <v-list dense>
                            <v-list-item v-for="(item, index) in cart" :key="index" class="justify-space-between">
                                <div>{{ item.name }} x{{ item.qty }}</div>
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
            cart: [],
            menu: []
        };
    },
    created() {
        this.menu = [
            // Comidas
            ...Array.from({ length: 6 }, (_, i) => ({
                id: 100 + i,
                name: `Comida ${i + 1}`,
                price: 7 + i,
                category: "Comidas",
                image: require(`../assets/productos/comida_${i + 1}.jpg`)
            })),
            ...Array.from({ length: 4 }, (_, i) => ({
                id: 200 + i,
                name: `Hamburguesa ${i + 1}`,
                price: 10 + i,
                category: "Comidas",
                image: require(`../assets/productos/hamburguesa_${i + 1}.jpg`)
            })),
            {
                id: 210,
                name: "Nuggets",
                price: 6.5,
                category: "Comidas",
                image: require("../assets/productos/nuggt.jpg")
            },
            ...Array.from({ length: 2 }, (_, i) => ({
                id: 220 + i,
                name: `Papas Fritas ${i + 1}`,
                price: 4.5 + i,
                category: "Comidas",
                image: require(`../assets/productos/papa_frita_${i + 1}.jpg`)
            })),

            // Bebidas
            {
                id: 300,
                name: "Coca Cola",
                price: 3,
                category: "Bebidas",
                image: require("../assets/productos/cocacola.jpg")
            },
            ...["cafe", "coctela", "limoda", "malteada", "morado", "rojo"].map((name, i) => ({
                id: 310 + i,
                name: `Bebida ${this.capitalize(name)}`,
                price: 3.5 + i * 0.5,
                category: "Bebidas",
                image: require(`../assets/productos/bebida_azul_${name}.jpg`)
            })),

            // Postres
            {
                id: 400,
                name: "Helado",
                price: 4,
                category: "Postres",
                image: require("../assets/productos/helado.jpg")
            },
            {
                id: 401,
                name: "Postre de Coco",
                price: 4.5,
                category: "Postres",
                image: require("../assets/productos/postre_coco_1.jpg")
            },
            ...[
                "copa_1",
                "crema_1",
                "empanada_1",
                "empanada_2",
                "fresa_1",
                "mermelada_1",
                "mermelada_2",
                "pastelillo",
                "rosquilla"
            ].map((name, i) => ({
                id: 410 + i,
                name: this.formatDessertName(name),
                price: 4 + i * 0.3,
                category: "Postres",
                image: require(`../assets/productos/${name}.jpg`)
            }))
        ];
    },
    computed: {
        filteredMenu() {
            return this.menu.filter(item =>
                item.category.toLowerCase() === this.selectedCategory.toLowerCase()
            );
        },
        cartTotal() {
            return this.cart
                .reduce((sum, item) => sum + item.price * item.qty, 0)
                .toFixed(2);
        }
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
        capitalize(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        },
        formatDessertName(name) {
            return name.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        }
    }
};
</script>

<style scoped>
.form-wrapper>.v-card>.v-sheet {
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
    overflow-x: hidden;
}

.close-btn {
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 2;
}
</style>