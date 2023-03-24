<template>
    <div class="about">
      <h1>Add Property</h1>
      <Card imageSrc="/src/components/Property/AddPropImg.jpeg" title="Card Title" description="This is the card description." />
    </div>
    <AddProp />
  </template>
  
  <style></style>
  
  <script>
  import AddProp from "../components/Property/AddProp.vue";
  export default {
    components: {
      AddProp,
    },
  };
  </script>