
<template>
  <div class="about">
    <h1>Property</h1>
  </div>
  <PropListing /><br><br>
  <ActiveContracts/><br><br>
  <AvailableListings/>

</template>

<style></style>

<script>
import PropListing from "../components/Property/PropListing.vue";
import ActiveContracts from "../components/Property/ActiveContracts.vue"
import AvailableListings from "../components/Property/AvailableListings.vue"

export default {
  components: {
    PropListing,
    ActiveContracts,
    AvailableListings,
  },
}
</script>

