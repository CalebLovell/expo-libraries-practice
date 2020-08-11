import React from 'react'
import { Text, View, useColorScheme } from 'react-native'
import { useColorScheme as useRNAppearanceColorScheme } from 'react-native-appearance'

export const ColorThemeTest = () => {
	const rnColorScheme = useColorScheme()
	const colorScheme = useRNAppearanceColorScheme()
	return (
		<View>
			<Text style={{ color: rnColorScheme === 'light' ? 'red' : 'purple' }}>RN says it is: {rnColorScheme}</Text>
			<Text style={{ color: rnColorScheme === 'light' ? 'red' : 'purple' }}>rn-appearance says it is: {colorScheme}</Text>
		</View>
	)
}
