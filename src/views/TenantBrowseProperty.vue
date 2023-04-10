<script>
import AllPropsOnRent from "../components/Property/AllPropsOnRent.vue";

export default {
  data() {
    return {
      //
    };
  },
  components: {
    AllPropsOnRent,
  },
  methods: {
    mthd() {
      //
    },
  },
  created() {
    var scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js",
    ];
    scripts.forEach((script) => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  },
}
</script>


<template>
  <div class="wrapper">
    <div class="about">Browse Property</div>
    <AllPropsOnRent />
  </div>
</template>

<style scoped>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";

</style>
