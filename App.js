import { QueryClient, QueryClientProvider } from 'react-query'
import { StyleSheet, View } from 'react-native'

import { ContactExample } from './components/ContactExample'
import React from 'react'
import { StyleProvider } from './components/StyleProvider'

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<StyleProvider>
				<View style={styles.container}>
					<ContactExample />
				</View>
			</StyleProvider>
		</QueryClientProvider>
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
