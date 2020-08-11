import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, Text } from 'react-native'
import * as Contacts from 'expo-contacts'

export const ContactExample = () => {
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		checkContactsPermission()
	}, [checkContactsPermission])

	const checkContactsPermission = useCallback(async () => {
		const { status } = await Contacts.requestPermissionsAsync()
		if (status === 'granted') {
			const { data } = await Contacts.getContactsAsync({
				sort: Contacts.SortTypes.LastName,
			})
			const specialContacts = data.filter(person => person.id)
			console.log(specialContacts[0])

			if (data.length > 0) {
				setContacts(specialContacts)
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
		</>
	)
}
