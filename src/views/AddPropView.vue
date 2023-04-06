<template>
  <div class="wrapper">
    <div class="about">
      Add Property
      <Card
        imageSrc="/src/components/Property/AddPropImg.jpeg"
        title="Card Title"
        description="This is the card description."
      />
    </div>
    <AddProp />
  </div>
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
