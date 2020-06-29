import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ContactExample } from './components/ContactExample'

const App = () => {
	return (
		<View style={styles.container}>
			<ContactExample />
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
