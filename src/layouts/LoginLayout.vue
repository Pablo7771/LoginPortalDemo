<template>
  <div class="login-layout">
    <LanguageSelector />
    <LoginLeft />
    <LoginRight>
      <router-view/>
      <NoSignedUp />
    </LoginRight>
  </div>
</template>

<script>
import LoginLeft from "@/components/LoginLeft.vue"
import LoginRight from "@/components/LoginRight.vue"
import NoSignedUp from "@/components/NoSignedUp.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
  components: {
    LoginLeft,
    LoginRight,
    NoSignedUp,
    LanguageSelector
  },
}
</script>
