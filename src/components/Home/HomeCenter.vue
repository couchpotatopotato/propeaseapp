<template>
  <div>
    <h2 style="margin-bottom: 10px">5 Reminders</h2>
    <RouterLink to="/notif">
      <button class="button">View</button>
    </RouterLink>
  </div>
  <br />
  <br />
  <br />
  <div class="flexcontainer">
    <RouterLink to="/property"> 
      <button class="button button2">Property</button>
    </RouterLink>
    <RouterLink to="/dashboard">
      <button class="button button2">Dashboard</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.flexcontainer {
  display: flex;
  justify-content: flex-start;
  gap: 4rem;
}
.card {
  width: 50%;
}
</style>

<script></script>
