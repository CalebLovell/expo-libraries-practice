import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NewNotificationDisplay } from './components/NewNotificationDisplayer'
import { NotificationDisplay } from './components/NotificationDisplay'
import { StyleProvider } from './components/StyleProvider'

const App = () => {
	return (
		<StyleProvider>
			<View style={styles.container}>
				{/* <NewNotificationDisplay /> */}
				<NotificationDisplay />
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
