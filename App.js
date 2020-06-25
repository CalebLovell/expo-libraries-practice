import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Button, Alert, Linking } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import useAppState from 'react-native-appstate-hook'

const App = () => {
	const [notificationPermission, setNotificationPermission] = useState(false)
	const [token, setToken] = useState(null)
	const [preferencesClicked, setPreferencesClicked] = useState(false)

	const { appState } = useAppState({
		onForeground: async () => {
			if (preferencesClicked) {
				getPermission()
				setToken(null)
				setPreferencesClicked(false)
			}
		},
	})

	useEffect(() => {
		checkPermission()
	}, [checkPermission, notificationPermission])

	const checkPermission = useCallback(async () => {
		if (Constants.isDevice) {
			const permission = await getPermission()
			if (permission === 'granted') {
				try {
					const expoToken = await Notifications.getExpoPushTokenAsync()
					setToken(expoToken)
				} catch (error) {
					console.log(error)
				}
			} else {
				updatePermission()
			}
		} else {
			Alert.alert('Sorry!', 'You must use a physical device to receive Push Notifications.')
		}
	}, [updatePermission])

	const getPermission = async () => {
		const existingStatus = await Permissions.getAsync(Permissions.NOTIFICATIONS)
		return setNotificationPermission(existingStatus.granted)
	}

	const updatePermission = useCallback(() => {
		Alert.alert(
			'Notification Permission',
			'If you would like to be able to receive Push Notifications, you must change them in your app settings.',
			[
				{ text: 'Cancel', onPress: null, style: 'cancel' },
				{
					text: 'Continue',
					onPress: () => {
						Linking.openURL('app-settings:')
						setPreferencesClicked(true)
					},
				},
			],
		)
	}, [])

	return (
		<View style={styles.container}>
			<Text>App state: {appState}</Text>
			<Text>Here's the token maybe: {token}</Text>
			<Button onPress={updatePermission} title='Get Permission Again' />
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
