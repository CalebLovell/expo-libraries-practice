import { StyleSheet, View } from 'react-native'

import { ContactExample } from './components/ContactExample'
import React from 'react'
import { StyleProvider } from './components/StyleProvider'

const App = () => {
	return (
		<StyleProvider>
			<View style={styles.container}>
				<ContactExample />
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
