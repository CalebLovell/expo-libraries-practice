import React from 'react'
import { Text, useColorScheme } from 'react-native'

export const ColorThemeTest = () => {
	const colorScheme = useColorScheme()
	return <Text>The color scheme is: {colorScheme}</Text>
}
