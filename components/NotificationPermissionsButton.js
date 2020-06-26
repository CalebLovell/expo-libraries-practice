import React from 'react'
import { Button, Alert, Linking } from 'react-native'
import { Notifications } from 'expo'
import useAppState from 'react-native-appstate-hook'

export const NotificationPermissionsButton = props => {
	useAppState({
		onForeground: async () => {
			try {
				const expoToken = await Notifications.getExpoPushTokenAsync()
				props.setToken(expoToken)
			} catch (error) {
				console.log(error)
				props.setToken(null)
			}
		},
	})

	const updatePermission = () => {
		Alert.alert(
			'Notifications Permission',
			'If you would like to be able to receive Push Notifications, you must grant Circles permission in your app settings.',
			[
				{ text: 'Cancel', onPress: null, style: 'cancel' },
				{
					text: 'Continue',
					onPress: () => {
						Linking.openURL('app-settings:')
					},
				},
			],
		)
	}

	return <Button onPress={updatePermission} title='Get Notifications Permission Again' />
}
