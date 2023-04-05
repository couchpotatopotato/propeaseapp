<template>
  <div id="maincontainer">
    <div>
      <h2>5 Notifications</h2>
      <RouterLink to="/notif">
        <button class="button">View</button>
      </RouterLink>
    </div>
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
  margin-top: 3%;
}

.button {
  width: 150px;
}

.button2 {
  width: 200px;
}
</style>

<script></script>
