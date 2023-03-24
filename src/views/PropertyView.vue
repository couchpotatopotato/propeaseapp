
<template>
  <div class="about">
    <h1>Property</h1>
  </div>
  <ActiveContracts/>
  <AvailableListings/>
</template>

<style></style>

<script>

import ActiveContracts from "../components/Property/ActiveContracts.vue"
import AvailableListings from "../components/Property/AvailableListings.vue"

export default {
  components: {
    ActiveContracts,
    AvailableListings,
  },
}
</script>

