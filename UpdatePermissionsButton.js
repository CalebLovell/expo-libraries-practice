import React from 'react'
import { Button, Alert, Linking } from 'react-native'
import { Notifications } from 'expo'
import useAppState from 'react-native-appstate-hook'

export const UpdatePermissionsButton = props => {
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
			'Notification Permission',
			'If you would like to be able to receive Push Notifications, you must change them in your app settings.',
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

	return <Button onPress={updatePermission} title='Get Permission Again' />
}
