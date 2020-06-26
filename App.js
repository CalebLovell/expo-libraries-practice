import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NotificationDisplay } from './components/NotificationDisplay'

const App = () => {
	return (
		<View style={styles.container}>
			<NotificationDisplay />
		</View>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
