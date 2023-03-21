<template>
  <div class="about">
    <h1>Profile</h1>
  </div>
  <br />
  <ViewProfile @showEdit="showEditFunc($event)" v-if="showView" />
  <EditProfile @showView="showViewFunc($event)" v-if="showEdit" />
</template>

<style></style>

<script>
import ViewProfile from "../components/Profile/ViewProfile.vue";
import EditProfile from "../components/Profile/EditProfile.vue";

export default {
  data() {
    let showEdit;
    let showView = true;

    return {
      showEdit,
      showView,
    };
  },

  components: {
    ViewProfile,
    EditProfile,
  },

  methods: {
    showEditFunc(value) {
      this.showEdit = true;
      this.showView = false;
    },

    showViewFunc(value) {
      this.showEdit = false;
      this.showView = true;
    },
  },
};
</script>
