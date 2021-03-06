import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import { Button, Platform, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Constants from 'expo-constants'

Notifications.setNotificationHandler({
	handleNotification: () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
})

export const NewNotificationDisplay = () => {
	const [expoPushToken, setExpoPushToken] = useState('')
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()

	// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
	const sendPushNotification = async () => {
		const message = {
			to: expoPushToken,
			sound: 'default',
			title: 'Original Title',
			body: 'And here is the body!',
			data: { data: 'goes here' },
		}

		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		})
	}

	const registerForPushNotificationsAsync = async () => {
		let token
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!')
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
			console.log(token)
		} else {
			alert('Must use physical device for Push Notifications')
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			})
		}

		return token
	}

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification)
		})

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener)
			Notifications.removeNotificationSubscription(responseListener)
		}
	}, [])

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
			}}>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<Button
				title='Press to Send Notification'
				onPress={async () => {
					await sendPushNotification(expoPushToken)
				}}
			/>
		</View>
	)
}
