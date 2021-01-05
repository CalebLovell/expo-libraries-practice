import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { pull } from 'lodash'
import { useLocalContacts } from '../data/useLocalContacts'

const Item = ({ item, selectedData, setSelectedData }) => {
	const [selected, setSelected] = useState(selectedData.includes(item))
	const addSelected = () => setSelectedData([...selectedData, item])
	const removeSelected = () => setSelectedData(pull(selectedData, selected))
	const onPress = () => {
		if (selected) {
			setSelected(false)
			removeSelected()
		} else {
			setSelected(true)
			addSelected()
		}
	}
	return (
		<TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' }]}>
			<Text>{item.name}</Text>
		</TouchableOpacity>
	)
}

export const ContactExample = () => {
	const { status, data, error, isFetching } = useLocalContacts()
	const [selectedData, setSelectedData] = useState([])

	const renderPosts = () => {
		if (status === 'loading') {
			return <Text>Loading...</Text>
		} else if (status === 'error') {
			return <Text>{error.message}</Text>
		} else {
			const renderItem = ({ item }) => {
				return <Item item={item} selectedData={selectedData} setSelectedData={setSelectedData} />
			}
			return <FlatList data={data} keyExtractor={item => item.id} renderItem={renderItem} extraData={selectedData} />
		}
	}

	return (
		<View style={styles.container}>
			<Text>{isFetching ? 'Updating...' : ''}</Text>
			<Text>Here's ur contacts: </Text>
			{renderPosts()}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		marginVertical: 4,
	},
})
