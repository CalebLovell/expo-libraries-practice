import React, { createContext, useContext } from 'react'
import { useColorScheme } from 'react-native-appearance'

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
	const theme = useColorScheme()
	const colors = colorSchemes[theme]
	const state = {
		theme: theme,
		colors: colors,
	}

	return <StyleStateContext.Provider value={state}>{children}</StyleStateContext.Provider>
}

function useStyleState() {
	const context = useContext(StyleStateContext)
	if (context === undefined) {
		throw new Error('useStyleState must be used within a StyleProvider')
	}
	return context
}

export { StyleProvider, useStyleState }
