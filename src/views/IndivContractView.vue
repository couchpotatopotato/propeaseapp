<template>
  <div class="wrapper">
    <div class="about">View Contract Details</div>
    <IndivContract />
    <div class="about">Contract Payment History</div>
    <ContractPayHist />
  </div>
</template>

<style></style>

<script>
import IndivContract from "../components/Property/IndivContract.vue";
import ContractPayHist from "../components/Property/ContractPayHist.vue";

export default {
  components: {
    IndivContract,
    ContractPayHist,
  },
};
</script>
