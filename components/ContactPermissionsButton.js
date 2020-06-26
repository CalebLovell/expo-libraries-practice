import React from 'react'
import { Button, Alert, Linking } from 'react-native'
import useAppState from 'react-native-appstate-hook'
import * as Contacts from 'expo-contacts'

export const ContactPermissionsButton = () => {
	useAppState({
		onForeground: async () => {
			try {
				const { status } = await Contacts.requestPermissionsAsync()
				// status === 'granted' ? navigation.navigate('Somewhere Relevant') : null
			} catch (error) {
				console.log(error)
			}
		},
	})

	const updatePermission = () => {
		Alert.alert(
			'Contacts Permission',
			"If you would like to be able to import your phone's Contacts, you must grant Circles permission in your app settings.",
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

	return <Button onPress={updatePermission} title='Get Contacts Permission Again' />
}
