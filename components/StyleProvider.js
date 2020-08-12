import React, { createContext, useContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'

const StyleStateContext = createContext()

const colorSchemes = {
	light: {
		background: '#fff',
		text: '#333',
	},
	dark: {
		background: '#333',
		text: '#fff',
	},
}

function StyleProvider({ children }) {
	// const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'light' ? false : true)
	const theme = colorSchemes[useColorScheme()]

	return <StyleStateContext.Provider value={theme}>{children}</StyleStateContext.Provider>
}

function useStyleState() {
	const context = useContext(StyleStateContext)
	if (context === undefined) {
		throw new Error('useStyleState must be used within a StyleProvider')
	}
	return context
}

export { StyleProvider, useStyleState }
