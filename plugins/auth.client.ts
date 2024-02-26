import { authStore } from "@/store/auth";
import { refreshSession } from "@/requests/accounts";
import type { MemberAccount } from "@/types/account";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {};
  }

  const { data, refresh } = await refreshSession();

  const loggedIn = computed(() => !!data.value);
  const redirectTo = useState("authRedirect");

  addRouteMiddleware(
    "auth",
    (to) => {
      if (to.meta.auth && !loggedIn.value) {
        redirectTo.value = to.path;
        return "/login";
      } else if (!to.meta.auth && loggedIn.value) {
        return navigateTo({ path: "/dashboard" }, { external: true });
      }
    },
    { global: true },
  );

  const currentRoute = useRoute();

  watch(loggedIn, async (loggedIn) => {
    if (!loggedIn && currentRoute.meta.auth) {
      redirectTo.value = currentRoute.path;
      await navigateTo("/login");
    }
  });

  return {
    provide: {
      auth: {
        loggedIn,
        user: data,
        redirectTo,
        refreshSession: refresh,
      },
    },
  };
});
