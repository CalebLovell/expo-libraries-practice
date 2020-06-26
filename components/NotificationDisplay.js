import React, { useState, useEffect, useCallback } from 'react'
import { Text, Alert, Vibration } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { UpdatePermissionsButton } from './UpdatePermissionsButton'

export const NotificationDisplay = () => {
	const [notificationPermission, setNotificationPermission] = useState(false)
	const [token, setToken] = useState(null)
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		Notifications.addListener(handleNotification)
	}, [])

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

	const handleNotification = notificationObject => {
		Vibration.vibrate()
		console.log(notificationObject)
		setNotification(notificationObject)
	}

	return (
		<>
			<Text>Here's the token maybe: {token}</Text>
			<Text>Here's a notification:</Text>
			{notification ? (
				<>
					<Text>Origin: {notification.origin}</Text>
					<Text>Message: {JSON.stringify(notification.data.message)}</Text>
				</>
			) : null}
			<UpdatePermissionsButton setToken={setToken} />
		</>
	)
}
