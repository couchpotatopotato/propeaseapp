<template>
    <div class="about"> 
        <h1>View Contract Details</h1>
    </div>
    <IndivContract/>
    <div class="about"> 
        <h1>Contract Payment History</h1>
    </div>
    <ContractPayHist/> 
</template>

<style></style>

<script>
import IndivContract from "../components/Property/IndivContract.vue";
import ContractPayHist from "../components/Property/ContractPayHist.vue";

export default {
    components: {
        IndivContract,
        ContractPayHist,
    }
};
</script>