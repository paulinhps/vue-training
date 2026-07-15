<script setup lang="ts">
import { useBreadcrumbContext } from "@/composable/useBreadcrumbContext";
import { computed, inject, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbContext = useBreadcrumbContext();

onMounted(() => {
  if (breadcrumbContext) {
    breadcrumbContext.changeBreadcrumbLabel(
      route.name?.toString() || "",
      `Detalhes do usuario ${route.params.id}`
    );
  }
});

const userId = computed(() => {
  return String(route.params.id);
});
</script>

<template>
  <section>
    <h1>Detalhes do usuario {{ userId }}</h1>
  </section>
</template>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
