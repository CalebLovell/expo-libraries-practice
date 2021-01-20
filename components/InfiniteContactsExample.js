import * as React from 'react'

import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useInfiniteLocalContacts } from '../data/useLocalContacts'

const Item = ({ item, index }) => {
	return (
		<View style={[styles.item, { backgroundColor: '#f9c2ff' }]}>
			<Text>{`${item.name} ${index}`}</Text>
		</View>
	)
}

export const InfiniteContactExample = () => {
	const { status, data, error, isLoading, isFetching, refetch, fetchNextPage } = useInfiniteLocalContacts()
	const [contacts, setContacts] = React.useState([])

	React.useEffect(() => {
		const allPagesArray = []
		data ? data.pages.forEach(x => allPagesArray.push(x.data)) : null
		setContacts(allPagesArray.flat())
	}, [data])

	const renderPosts = () => {
		if (status === 'loading') {
			return <Text>Loading...</Text>
		} else if (status === 'error') {
			return <Text>{error.message}</Text>
		} else {
			const renderItem = ({ item, index }) => {
				return <Item item={item} index={index} />
			}
			return (
				<FlatList
					data={contacts}
					keyExtractor={item => item.id}
					renderItem={renderItem}
					onRefresh={refetch}
					refreshing={isLoading}
					progressViewOffset={100}
					onEndReached={fetchNextPage}
					onEndReachedThreshold={0.7}
				/>
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={{ marginTop: 20 }}>{isFetching ? 'Updating...' : ''}</Text>
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
