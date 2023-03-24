<template>
    <div class="card">
        <div id="Prop" class="card2">
            <img id="img1" src="src/components/Property/AddPropImg.jpeg" alt="Card Image">
            <span>Temp Address</span>
        </div>

        <div id="PayAmt" class="card2">
            <span class="field">Payment Amount</span> <br>
            <span class="info">$4000</span>
        </div>

        <div id="PayDate" class="card2">
            <span class="field">Payment Date</span> <br>
            <span class="info">25/03/2023</span>
        </div>

        <div id="PayMode" class="card2">
            <span class="field">Payment Mode</span> <br>
            <span class="info">PayLah!</span>
        </div>

        <div id="Tenant" class="card2">
            <span class="field">Tenant</span> <br>
            <span class="info">Name</span> <br>
            <span class="field"> email </span> <br>
            <span class="field"> phone </span>
        </div>

        <div id="Approve">
                <button class="button button2">Approve</button>
        </div>

        <div id="Reject">
                <button class="button button2">Reject</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: grid;
    grid-gap: 20px;
    grid-template: 
    "a b b c c d d"
    "a e e e e e e"
    "a f f f g g g";
}

#Prop {
    grid-area: a;
    width: 300px
}

#PayAmt {
    grid-area: b;
}

#PayDate {
    grid-area: c;
}

#PayMode {
    grid-area: d;
}

#Tenant {
    grid-area: e;
}

#Approve {
    grid-area: f;
}

#Reject {
    grid-area: g;
}

.card2 {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    background-color: var(--color-background);
    padding: 15px 0px 15px 0px;
}

#img1 {
    width:100%;
    margin: 0px;
}

span {
    padding: 15px;
    font-size: 18px;
}

.field {
    font-size: 12px;
}

.info {
    font-size: 24px;
    font-weight: bold;
    color: var(--color-darkblue);
}

.button2 {
    width: 100%;
}
</style>