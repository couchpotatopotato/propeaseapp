<template>
    <div id="dashboard">
        <div id="metric1" class="card">
            <span class="field">Current Overdue</span> <br>
            <span class="info">5</span>
        </div>

        <div id="metric2" class="card">
            <span class="field">Active Contracts</span> <br>
            <span class="info">8</span>
        </div>

        <div id="metric3" class="card">
            <span class="field">Total Contracts</span> <br>
            <span class="info">10</span>
        </div>

        <div id="metric4" class="card">
            <span class="field">Available Contracts</span> <br>
            <span class="info">2</span>
        </div>

        <div id="metric5" class="card">
            <span class="field">Total Revenue</span> <br>
            <span class="info">$42 000</span>
        </div>
    </div>
</template>

<style scoped>
#dashboard {
    display: grid;
    grid-gap: 20px;
    grid-template: 
    "a b"
    "c d"
    "e e";
    width: 60%;
    text-align: center;
}

#metric1 {
    grid-area: a;
}

#metric2 {
    grid-area: b;
}

#metric3 {
    grid-area: c;
}

#metric4 {
    grid-area: d;
}

#metric5 {
    grid-area: e;
}

.field {
    font-size: 12px;
}

.info {
    font-size: 24px;
    font-weight: bold;
    color: var(--color-darkblue);
}
</style>