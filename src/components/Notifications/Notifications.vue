<template>
   <table id="table">
        <colgroup>
            <col span="1" style="width: 40%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 18%;">
            <col span="1" style="width: 17%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 15%;">
        </colgroup>
        <tr>
            <th>Address</th>
            <th>Tenant</th>
            <th>Due Date</th>
            <th>Payment Amount</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </table> <br><br>
</template>

<script>

</script>

<style scoped>
table {
    border-radius: 15px;
    border: solid var(--color-border);
    width: 120%;
    background-color: var(--color-background);
}

th {
    border-bottom: solid var(--color-border);
    font-weight: bold;
}

td, th {
    text-align: left;
    padding: 2px 15px 2px 15px; 
    line-height: 50px;
}
</style>