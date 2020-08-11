import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ColorThemeTest } from './components/ColorThemeExample'

const App = () => {
	return (
		<View style={styles.container}>
			<ColorThemeTest />
		</View>
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
