import * as React from 'react'
import { CSSProperties, useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../ThemeContext'

type PropsType = {}

const ThemeButton: React.FC<PropsType> = (props) => {
  const context = useContext(ThemeContext)
  const styleMap: Record<ThemeContextType['theme'], CSSProperties> = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    dark: {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  }
  return <button style={styleMap[context.theme]}>{props.children}</button>
}

export default ThemeButton
