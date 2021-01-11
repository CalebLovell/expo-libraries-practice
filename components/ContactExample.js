import * as React from 'react'

import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { differenceWith, isEqual, pull } from 'lodash'

import { useDeleteLocalContacts } from '../data/useDeleteContacts'
import { useLocalContacts } from '../data/useLocalContacts'

const Item = ({ item, selectedData, setSelectedData }) => {
	const [selected, setSelected] = React.useState(selectedData.includes(item))
	const addSelected = () => setSelectedData([...selectedData, item])
	const removeSelected = () => setSelectedData(pull(selectedData, item))
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
	const { status: getStatus, data, error, isFetching, refetch } = useLocalContacts()
	const [selectedData, setSelectedData] = React.useState([])
	const [dataGroups, setDataGroups] = React.useState([])
	const { mutate: deleteMutate, status: deleteStatus } = useDeleteLocalContacts()

	React.useEffect(() => {
		if (getStatus !== 'loading' && getStatus !== 'error') setDataGroups(groupData())
	}, [data, groupData, getStatus])

	const groupData = React.useCallback(() => {
		const letters = []
		const groups = []
		data.forEach(contact => {
			const { firstName, lastName, company } = contact
			const letter = lastName?.charAt(0) || firstName?.charAt(0) || company?.charAt(0)
			if (!letters.includes(letter)) {
				letters.push(letter)
				groups.push({ title: letter, data: [] })
			}
			const group = groups.find(x => x.title === letter)
			group.data.push(contact)
		})
		return groups.sort((a, b) => a.title > b.title)
	}, [data])

	const renderPosts = () => {
		if (getStatus === 'loading') {
			return <Text>Loading...</Text>
		} else if (getStatus === 'error') {
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
					onRefresh={refetch}
					refreshing={isFetching}
					progressViewOffset={100}
				/>
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={{ marginTop: 20 }}>{isFetching ? 'Updating...' : ''}</Text>
			<Text>Here's ur contacts: </Text>
			<TouchableOpacity
				style={{ backgroundColor: 'blue', paddingVertical: 10 }}
				onPress={() => {
					const remainingData = differenceWith(data, selectedData, isEqual)
					deleteMutate(remainingData)
				}}>
				<Text style={{ color: 'white' }}>{deleteStatus === 'loading' ? 'Loading' : 'IMPORT HERE'}</Text>
			</TouchableOpacity>
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
