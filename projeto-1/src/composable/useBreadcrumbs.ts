import { breadCrumbContextKey, type BreadcrumbItem } from "@/contexts/breadcrumbContext";
import { provide, ref, computed, watch } from "vue";
import { useRoute, type RouteRecordNameGeneric } from "vue-router";


export function useBreadcrumbs() {

    const route = useRoute();
    const labelOverrides = ref<Record<string, string>>({});
    const pageToHide = ref<RouteRecordNameGeneric | string>('');

    const showBreadcrumbsInCurrent = computed(() => {
        return route.name !== pageToHide.value;
    });

    const breadcrumbItems = computed(() => showBreadcrumbsInCurrent.value ? route.matched
        .filter(match => match.meta?.breadcrumb && match.name)
        .map(({ path, name, meta }, level: number) => {

            const routeName = String(name)

            return {
                name: name?.toString(),
                path,
                label: labelOverrides.value[routeName] ??
                    (typeof meta.breadcrumb === 'string' ? meta.breadcrumb : routeName),
                level,
            }
        }) : [] as BreadcrumbItem[]);

    function changeBreadcrumbLabel(name: RouteRecordNameGeneric | string, label: string) {

        if (!name) {
            return
        }
        labelOverrides.value[String(name)] = label
    }

    function hideBreadcrumbsInCurrent(name: RouteRecordNameGeneric | string) {
        pageToHide.value = name
    }

    provide(breadCrumbContextKey, {
        breadcrumbs: breadcrumbItems,
        changeBreadcrumbLabel,
        hideBreadcrumbsInCurrent: hideBreadcrumbsInCurrent,
    });
}
