import { breadCrumbContextKey } from "@/contexts/breadcrumbContext";
import { inject } from "vue";

export function useBreadcrumbContext() {

    return inject(breadCrumbContextKey);

}