<template>
    <v-col v-if="$vuetify.breakpoint.mdAndUp" md="7" class="login-left-col">
        <div class="bg-layer" :style="{ backgroundImage: `url(${currentImage})`, opacity: isLayer1Visible ? 1 : 0 }"></div>
        <div class="bg-layer" :style="{ backgroundImage: `url(${nextImage})`, opacity: isLayer1Visible ? 0 : 1 }"></div>
    </v-col>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    name: "LoginLeft",
    setup() {
        const images = [
            require("@/assets/backgrounds/fnd_1.avif"),
            require("@/assets/backgrounds/fnd_2.avif"),
            require("@/assets/backgrounds/fnd_3.avif"),
            require("@/assets/backgrounds/fnd_4.avif"),
            require("@/assets/backgrounds/fnd_5.avif"),
            require("@/assets/backgrounds/fnd_6.avif"),
            require("@/assets/backgrounds/fnd_7.avif"),
            require("@/assets/backgrounds/fnd_8.avif"),
        ];

        const currentImage = ref(images[0]);
        const nextImage = ref(images[1]);
        const isLayer1Visible = ref(true);
        let index = 1;

        const preloadImage = (src: string): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve();
            });
        };

        onMounted(() => {
            setInterval(async () => {
                const next = images[index];
                await preloadImage(next);

                // Actualiza nextImage y alterna visibilidad
                if (isLayer1Visible.value) {
                    nextImage.value = next;
                } else {
                    currentImage.value = next;
                }

                isLayer1Visible.value = !isLayer1Visible.value;
                index = (index + 1) % images.length;
            }, 4000);
        });

        return { currentImage, nextImage, isLayer1Visible };
    },
});
</script>
  
<style scoped>
    .col-md-7 {
        flex: 0 0 62.3333333333%;
        max-width: 62.3333333333%;
    }
.login-left-col {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(60%);
    transition: opacity 1s ease-in-out;
    z-index: 1;
}
</style>
  