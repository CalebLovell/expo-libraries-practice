import { ScrollView, Text } from 'react-native'

import React from 'react'
import { useLocalContacts } from '../data/useLocalContacts'

const renderPosts = (status, data, error) => {
	if (status === 'loading') return <Text>Loading...</Text>
	else if (status === 'error') return <Text>{error.message}</Text>
	else return data.map((contact, i) => <Text key={i}>{contact.name}</Text>)
}

export const ContactExample = () => {
	const { status, data, error, isFetching } = useLocalContacts()

	return (
		<ScrollView>
			<Text>{isFetching ? 'Updating...' : ''}</Text>
			<Text>Here's ur contacts: </Text>
			{renderPosts(status, data, error)}
		</ScrollView>
	)
}
