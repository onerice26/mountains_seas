<script setup>
import { getMap } from "../../components/maps/maps";
import { onMounted } from "vue";
onMounted(() => {
    getMap();
})
</script>
<template>
    <div id="container"></div>
</template>
<style scoped>
#container {
    width: 100%;
    height: 800px;
}
</style>