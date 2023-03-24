<template>
    <div>
        <h2>Available Listings</h2>
        <colgroup>
            <col span="1" style="width: 80%;">
            <col span="1" style="width: 45%;">
        </colgroup>
        <table>
            <tr>
                <th>Address</th>
                <th>Action</th>
            </tr>
        </table>
    </div>
</template>

<style scoped>
h2 {
    text-align: left;
}

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

<script>

export default {
    
}
</script>
