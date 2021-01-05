import * as React from 'react'

import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { pull } from 'lodash'
import { useLocalContacts } from '../data/useLocalContacts'

const Item = ({ item, selectedData, setSelectedData }) => {
	const [selected, setSelected] = React.useState(selectedData.includes(item))
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
	const [selectedData, setSelectedData] = React.useState([])
	const [dataGroups, setDataGroups] = React.useState([])

	React.useEffect(() => {
		if (status !== 'loading' && status !== 'error') {
			const groupContactsByLetter = () => {
				const contactsByLetter = []
				data.forEach(contact => {
					const { firstName, lastName, company } = contact
					const letter = lastName?.charAt(0) || firstName?.charAt(0) || company?.charAt(0)
					// If letter doesn't exist in array, create it
					!(letter in contactsByLetter) ? (contactsByLetter[letter] = { title: letter, data: [] }) : null
					// Push contact to correct letter
					contactsByLetter[letter].data.push(contact)
				})
				const sortedLetters = Object.keys(contactsByLetter).sort()
				const sortedArray = []
				sortedLetters.forEach(letter => {
					const letterGroup = contactsByLetter[letter]
					sortedArray.push(letterGroup)
				})
				return sortedArray
			}
			setDataGroups(groupContactsByLetter())
		}
	}, [data, status])

	const renderPosts = () => {
		if (status === 'loading') {
			return <Text>Loading...</Text>
		} else if (status === 'error') {
			return <Text>{error.message}</Text>
		} else {
			const renderItem = ({ item }) => {
				return <Item item={item} selectedData={selectedData} setSelectedData={setSelectedData} />
			}
			const renderSectionHeader = ({ section: { title } }) => {
				return (
					title && (
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionHeaderText}>{title}</Text>
						</View>
					)
				)
			}
			return (
				<SectionList
					sections={dataGroups}
					keyExtractor={item => item.id}
					renderItem={renderItem}
					renderSectionHeader={renderSectionHeader}
					extraData={selectedData}
				/>
			)
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
	sectionHeader: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	sectionHeaderText: {
		fontWeight: 'bold',
		textAlign: 'center',
		width: 30,
		height: 15,
	},
})
