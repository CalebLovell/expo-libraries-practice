import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { UpdatePermissionsButton } from './UpdatePermissionsButton'

const App = () => {
	const [notificationPermission, setNotificationPermission] = useState(false)
	const [token, setToken] = useState(null)

	useEffect(() => {
		checkPermission()
	}, [checkPermission, notificationPermission])

	const checkPermission = useCallback(async () => {
		if (Constants.isDevice) {
			const existingStatus = await Permissions.getAsync(Permissions.NOTIFICATIONS)
			setNotificationPermission(existingStatus.granted)
			if (notificationPermission) {
				try {
					const expoToken = await Notifications.getExpoPushTokenAsync()
					setToken(expoToken)
					console.log(`hello? ${expoToken}`)
				} catch (error) {
					console.log(error)
				}
			}
		} else {
			Alert.alert('Sorry!', 'You must use a physical device to receive Push Notifications.')
		}
	}, [notificationPermission])

	return (
		<View style={styles.container}>
			<Text>Here's the token maybe: {token}</Text>
			<UpdatePermissionsButton setToken={setToken} />
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
