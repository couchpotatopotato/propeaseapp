<template>
    <div class="card">
        <img src = "src/components/Property/AddPropImg.jpeg" alt="Card Image">
        <div class="form-group">
            <label for="prop_name">Name:</label>
            <input type="text" id="input1" v-model="prop_name">
            <label for="prop_address">Address:</label>
            <input type="text" id="input2" v-model="prop_address">
            <button type="add" @click="saveCard">Add</button>
        </div>
    </div>
</template>
  
<style scoped>
    .card {
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        display: flex;
    }

    .card-image {
        width: 200px;
        height: auto;
        object-fit: cover;
        margin-right: 1rem; /* Adjust this value to move the image to the left */
    }

    .form-group {
        margin-left: 1rem;
        height: 50%;
        width: 100%
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        margin-top: 2rem;
        width: 15%
    }

    .card-content {
        display: flex; /* Add this to use flexbox layout */
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
    }
    
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Card Title',
    },
  },
  data() {
    return {
      prop_name: '',
      prop_address: '',
    };
  },
  methods: {
    saveCard() {
        const card = {
            prop_name: this.prop_name,
            prop_address: this.prop_address
        };
        console.log(card)
    },
  },
};
</script>
  