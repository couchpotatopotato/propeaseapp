<template>
    <div class="about"> 
        <IndivContract/> <br><br>
        <ContractPayHist/> 
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
    }
};
</script>