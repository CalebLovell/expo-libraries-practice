import React, { useState, useEffect, useCallback } from 'react'
import { Text } from 'react-native'
import * as Contacts from 'expo-contacts'
import { ContactPermissionsButton } from './ContactPermissionsButton'

export const ContactExample = () => {
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		checkContactsPermission()
	}, [checkContactsPermission])

	const checkContactsPermission = useCallback(async () => {
		const { status } = await Contacts.requestPermissionsAsync()
		if (status === 'granted') {
			const { data } = await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Emails],
			})

			if (data.length > 0) {
				const contact = data[0]
				console.log(contact)
			}
		}
	}, [])

	return (
		<>
			<Text>Here's a contact: {contacts[0]}</Text>
			<ContactPermissionsButton />
		</>
	)
}
