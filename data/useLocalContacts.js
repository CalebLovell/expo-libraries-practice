import * as Contacts from 'expo-contacts'

import { useInfiniteQuery, useQuery } from 'react-query'

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

const getInfiniteLocalContacts = async ({ pageParam = 0 }) => {
	const { data } = await Contacts.getContactsAsync({
		pageOffset: pageParam,
		pageSize: 10,
	})
	return { data, pageParam }
}

export const useInfiniteLocalContacts = () => {
	return useInfiniteQuery('localContacts', getInfiniteLocalContacts, {
		getNextPageParam: lastPage => lastPage.pageParam + 10,
		onError: error => console.log(error),
	})
}
