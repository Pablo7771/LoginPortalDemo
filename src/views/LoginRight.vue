<template >
    <div class="login-right">
      <slot />
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
    .login-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
  </style>
  