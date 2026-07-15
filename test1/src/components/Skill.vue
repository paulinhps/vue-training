<script setup lang="ts">
import { ref } from 'vue';

type Skill = {
    name: string,
    level: number
};

const skill = ref<Skill>({
    name: "JavaScript",
    level: 5
});

function increaseLevel(): void {
    skill.value.level += 1;
}
function decreaseLevel(): void {
    skill.value.level -= 1;
}

</script>

<template>
  <div class="skill-card">
    <h3>{{ skill.name }}</h3>
    <p>Level: {{ skill.level }}</p>
    <button @click="increaseLevel">Increase Level</button>
    <button @click="decreaseLevel">Decrease Level</button>
    </div>
</template>
<style scoped>
.skill-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}
</style>