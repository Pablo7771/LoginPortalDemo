<template>
	<v-app>
		<div  class="login-layout">
			<LanguageSelector />
			<LoginLeft />
			<LoginRight>
				<router-view />
				<NoSignedUp v-if="showNoSignedUpBtn"/>
				<BackHome v-if="!showNoSignedUpBtn" />
			</LoginRight>

		</div>
	</v-app>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

import LoginLeft from "@/components/LoginLeft.vue"
import LoginRight from "@/components/LoginRight.vue"
import NoSignedUp from "@/components/NoSignedUp.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import BackHome from "@/components/BackHome.vue";

export default defineComponent({
	name: "App",
  components: {
    LoginLeft,
    LoginRight,
    NoSignedUp,
    LanguageSelector,
    BackHome
},
  computed: {

    showNoSignedUpBtn() {
		return this.$route.name === "login" || this.$route.name === "register";
    }
  }
});
</script>
  
<style scoped>

	.login-layout {
	display: flex;
	height: 100vh;
	}
</style>