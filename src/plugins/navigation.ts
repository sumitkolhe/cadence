import bottomNavigationVue from 'bottom-navigation-vue'

export default defineNuxtPlugin((nuxtApp) => {
  return nuxtApp.vueApp.use(bottomNavigationVue)
})
