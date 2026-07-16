<script setup lang="ts">
import { ref } from 'vue';
import SkillBadge from './SkillBadge.vue';

type UserProfile = {
    name: string,
    role: string,
    company: string,
    yearsOfExperience: number
};

const profile =  ref<UserProfile>({
    name: "Paulo Henrique",
    role: "Front-end Developer",
    company: "Company Name",
    yearsOfExperience: 5
});
function promote(): void {
    profile.value.role = "Tech Lead";
}
</script>

<template>
  <main class="dashboard-page">
    <section class="hero">
      <h1>{{ profile.name }}</h1>
      <p>{{ profile.company }}</p>
    </section>

    <section class="cards-grid">
      <article class="summary-card">
        <h2>{{ profile.role }}</h2>
        <strong>{{ profile.yearsOfExperience }}</strong>
        <button @click="promote">Promote</button>
      </article>
    </section>
    <section>
      <SkillBadge />
    </section>
  </main>
</template>

<style scoped>
.dashboard-page {
  padding: 32px;
  font-family: Inter, system-ui, sans-serif;
}

.hero {
  margin-bottom: 24px;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 32px;
}

.hero p {
  margin: 0;
  color: #64748b;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.summary-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.summary-card h2 {
  margin: 0 0 12px;
  font-size: 16px;
}

.summary-card strong {
  display: block;
  margin-bottom: 8px;
  font-size: 24px;
}

.summary-card p {
  margin: 0;
  color: #64748b;
}
</style>
