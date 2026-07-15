import type { InjectionKey, Ref } from 'vue'
import type { RouteRecordNameGeneric } from 'vue-router';

export type BreadcrumbItem = {
    path: string,
    name?: string,
    label: string
    level: number
};

export type BreadcrumbContext = {
    breadcrumbs: Ref<BreadcrumbItem[]>
    changeBreadcrumbLabel: (name: RouteRecordNameGeneric | string, label: string) => void
    hideBreadcrumbsInCurrent?: (name: RouteRecordNameGeneric | string) => void
}

export const breadCrumbContextKey: InjectionKey<BreadcrumbContext> = Symbol('breadCrumbContext')