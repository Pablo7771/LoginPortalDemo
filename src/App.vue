<template>
	<v-app>
		<div class="login-layout">
			<LanguageSelector @languageChanged = "" />
			<LoginLeft />
			<LoginRight>
				<router-view />
				<BtnTemplates v-if="showBtnTemplates" />
				<BackHome v-if="!showBtnTemplates" />
			</LoginRight>

		</div>
	</v-app>
</template>
  
<script lang="ts">

import { defineComponent } from "vue";

import LoginLeft from "@/views/LoginLeft.vue"
import LoginRight from "@/views/LoginRight.vue"
import BtnTemplates from "@/views/BtnTemplates.vue";
import LanguageSelector from "@/views/LanguageSelector.vue";
import BackHome from "@/views/BackHome.vue";

export default defineComponent({
	name: "App",
	components: {
		LoginLeft,
		LoginRight,
		BtnTemplates,
		LanguageSelector,
		BackHome
	},
	computed: {
		showBtnTemplates() {
			return this.$route.name === "login" || this.$route.name === "register";
		}
	},
});
</script>
  
<style>
.login-layout {
	display: flex;
	height: 100vh;
}
html {
    box-sizing: border-box;
    overflow-y: hidden;
	}
</style>