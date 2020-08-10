import * as React from 'react'

export interface ThemeContextType {
  theme: 'light' | 'dark'
}

export const ThemeContext = React.createContext<ThemeContextType>(null as any)
