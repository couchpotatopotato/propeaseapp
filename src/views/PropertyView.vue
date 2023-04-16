<template>
  <div class="wrapper">
    <div class="about">Property</div>
    <ActiveContracts /><br /><br />
    <AvailableListings /><br /><br />
    <PropListing />
  </div>
</template>

<style></style>

<script>
import PropListing from "../components/Property/PropListing.vue";
import ActiveContracts from "../components/Property/ActiveContracts.vue";
import AvailableListings from "../components/Property/AvailableListings.vue";

export default {
  components: {
    PropListing,
    ActiveContracts,
    AvailableListings,
  },
};
</script>
