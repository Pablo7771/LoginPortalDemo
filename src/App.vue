<template>
  <v-app class="full-height">
    <LanguageSelector />

    <v-main class="full-height">
      <v-container fluid class="pa-0 full-height">
        <v-row no-gutters justify="center" class="full-height">
          <LoginLeft />
          <LoginRight />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import LoginLeft from "@/components/LoginLeft.vue";
import LoginRight from "@/components/LoginRight.vue";

export default defineComponent({
  name: "App",
  components: {
    LanguageSelector,
    LoginLeft,
    LoginRight,
  },
});
</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
