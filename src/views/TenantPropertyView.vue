<template>
  <div class="wrapper">
    <div class="about">Rented Property</div>
    <TenantContract /> <br>
    <TenantPaymentHistory />
    <br />
    <br />
    <RouterLink to="/home">
      <button type="back" class="button2">Back</button>
    </RouterLink>
  </div>
</template>

<style></style>

<script>

import TenantContract from "../components/Property/TenantContract.vue";
import TenantPaymentHistory from "../components/Property/TenantPaymentHistory.vue";

export default {
  components: {
    TenantContract,
    TenantPaymentHistory
  },
};

</script>
