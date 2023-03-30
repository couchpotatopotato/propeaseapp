<template>
  <div id="maincontainer">
    <div style="margin-bottom: 30px">
      <h2 style="margin-bottom: 10px">5 Notifications</h2>
      <RouterLink to="/notif">
        <button class="button">View</button>
      </RouterLink>
    </div>
    <div class="flexcontainer">
      <RouterLink to="/property">
        <button class="button button2">Property</button>
      </RouterLink>
      <RouterLink to="/dashboard">
        <button class="button button2">Dashboard</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.flexcontainer {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
}
.card {
  width: 50%;
}

#maincontainer {
  margin-left: 15%;
}
</style>

<script></script>
