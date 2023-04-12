<template>
    <div class="wrapper">
      <div class="about">Notifications</div>
      <TenantNotifications />
    </div>
  </template>
  
  <style></style>
  
  <script>
  import TenantNotifications from "../components/Notifications/TenantNotifications.vue";
  export default {
    components: {
      TenantNotifications,
    },
  };
  </script>
  