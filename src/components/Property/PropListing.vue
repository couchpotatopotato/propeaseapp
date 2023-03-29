<template>
    <div>
        <h1>Property Listings Page</h1>
    </div>
    <div class="flexcontainer">
        <RouterLink to="/addtenant">
            <button class="button button2">Add Tenant</button>
        </RouterLink>
        <RouterLink to="/addproperty">
            <button class="button button2">Add Property</button>
        </RouterLink>
    </div>
</template>

<style>
.flexcontainer {
    display: flex;
    justify-content: flex-start;
    gap: 4em;
}
</style>