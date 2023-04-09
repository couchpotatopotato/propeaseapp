<template>
    <div class="card">
        <div id="Prop" class="card2">
            <img id="img1" src="@/components/Property/AddPropImg.jpeg" alt="Card Image">
            <span id="inputAddress"> Address </span>
        </div>

        <div id="PayAmt" class="card2">
            <span class="field">Payment Amount</span> <br>
            <span id="inputPayAmt" class="info"> PaymentAmount </span>
        </div>

        <div id="PayDate" class="card2">
            <span class="field">Payment Date</span> <br>
            <span id="inputPayDate" class="info"> PaymentDate </span>
        </div>

        <div id="PayMode">
            <span style="font-size:1.2rem; padding-left:0%;">Payment Mode:</span> <br>
            <input type="text" id="input1" placeholder="Paylah!/VISA/Credit Card etc."/>
        </div>

        <div id="Back">
                <button id="backbtn" class="button button2">Back</button>
        </div>

        <div id="Pay">
                <button id="paybtn" class="button button2">Pay</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 70%;
    align-self: center;
    display: grid;
    grid-gap: 20px;
    grid-template: 
    "a b c"
    "a d d"
    "a e f";
    grid-auto-rows: 1fr;
    grid-auto-columns: 1fr;
}

#Prop {
    grid-area: a;
    width: 300px;
}

#PayAmt {
    grid-area: b;
}

#PayDate {
    grid-area: c;
}

#PayMode {
    padding: 15px 0px 15px 0px;
    grid-area: d;
}

#Back {
    grid-area: e;
}

#Pay {
    grid-area: f;
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

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2rem;
}
</style>