import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ColorThemeTest } from './components/ColorThemeExample'
import { StyleProvider } from './components/StyleProvider'

const App = () => {
	return (
		<StyleProvider>
			<View style={styles.container}>
				<ColorThemeTest />
			</View>
		</StyleProvider>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
