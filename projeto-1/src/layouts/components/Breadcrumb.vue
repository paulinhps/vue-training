<script setup lang="ts">
import { breadCrumbContextKey } from "@/contexts/breadcrumbContext";
import { useLogger } from "@/plugins/logger/useLogger";
import { inject } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const logger = useLogger();

type Props = {
    homeLabel?: string;
};

const props = defineProps<Props>();

const breadcrumbContext = inject(breadCrumbContextKey);

const breadcrumbs = breadcrumbContext?.breadcrumbs || null;

function resolveBreadcrumbPath(baseName: string): string {
    const resolvedPath = router.resolve({
        name: baseName,
        params: route.params,
    }).path;

    return resolvedPath;
}

function isCurrent(baseName: string | undefined) {
    if (!baseName) return false;
    const path = resolveBreadcrumbPath(baseName); // Aqui eu tenho que carregar os route.params na base. como fazer?

    logger.info(`Checking if current: ${path} === ${route.path}`);
    return route.path === path;
}
</script>
<template>
    <nav class="breadcrumb-nav" aria-label="breadcrumb" v-if="breadcrumbContext?.breadcrumbs?.value.length">
        <ol class="breadcrumb">
            <li class="breadcrumb-item home">
                <RouterLink to="/">{{ props.homeLabel || "🏠" }}</RouterLink>
            </li>
            <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path">
                <RouterLink v-if="!isCurrent(breadcrumb.name)" :to="breadcrumb.path">{{ breadcrumb.label }}
                </RouterLink>
                <span v-else>{{ breadcrumb.label }}</span>
            </li>
        </ol>
    </nav>
</template>

<style lang="css" scoped>
.breadcrumb-nav {
    margin-bottom: 24px;
    width: 100%;
}

.breadcrumb {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin: 0;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 12px;
    background-color: #f8fafc;
}

.breadcrumb-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 14px;
}

.breadcrumb-item:not(:last-of-type)::after {
    content: "/";
    color: #94a3b8;
}

.breadcrumb-item a {
    color: #2563eb;
    text-decoration: none;
}

.breadcrumb-item.home a:hover {
    text-decoration: none;
}

.breadcrumb-item a:hover {
    text-decoration: underline;
}

.breadcrumb-item span {
    color: #0f172a;
    font-weight: 600;
}
</style>
