<script setup lang="ts">
import { useBreadcrumbContext } from "@/composable/useBreadcrumbContext";
import { useBreadcrumbs } from "@/composable/useBreadcrumbs";
import { onMounted } from "vue";

const breadcrumbContext = useBreadcrumbContext();

onMounted(() => {

  if (breadcrumbContext?.hideBreadcrumbsInCurrent) {
    breadcrumbContext.hideBreadcrumbsInCurrent('dashboard')
  }
})
</script>

<template>
  <h1>Dashboard</h1>
</template>
