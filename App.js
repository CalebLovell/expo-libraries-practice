import React from 'react'
import { StyleSheet, View } from 'react-native'
import ImagePickerExample from './components/ImagePickerExample'

const App = () => {
	return (
		<View style={styles.container}>
			<ImagePickerExample />
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
