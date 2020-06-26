import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, Text } from 'react-native'
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
				setContacts(data)
			}
		}
	}, [])

	return (
		<>
			<ScrollView>
				<Text>Here's ur contacts: </Text>
				{contacts.map((contact, i) => (
					<Text key={i}>{contact.name}</Text>
				))}
			</ScrollView>
			<ContactPermissionsButton />
		</>
	)
}
