import type { InjectionKey, Ref } from 'vue'

export type ThemeName = 'light' | 'dark'

export type ThemeContext = {
  theme: Readonly<Ref<ThemeName>>
  toggleTheme: () => void
}

export const themeContextKey: InjectionKey<ThemeContext> = Symbol('themeContext')
