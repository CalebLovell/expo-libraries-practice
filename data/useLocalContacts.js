import * as Contacts from 'expo-contacts'

import { useQuery } from 'react-query'

const getLocalContacts = async () => {
	const { status } = await Contacts.requestPermissionsAsync()
	if (status === 'granted') {
		const { data } = await Contacts.getContactsAsync({
			sort: Contacts.SortTypes.LastName,
		})
		return data
	} else {
		throw new Error('You will need to enable Contact permissions first.')
	}
}

export const useLocalContacts = () => {
	return useQuery('localContacts', getLocalContacts)
}
