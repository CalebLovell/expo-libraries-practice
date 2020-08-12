import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import { useColorScheme } from 'react-native-appearance'

const colorSchemes = {
	light: {
		background: '#fff',
		text: '#333',
	},
	dark: {
		background: '#333',
		text: '#fff',
	},
}

export const ColorThemeTest = () => {
	const colorScheme = useColorScheme()
	const colors = colorSchemes[colorScheme]
	const renders = useRef(0)
	renders.current++
	console.log(renders.current + colorScheme)
	return (
		<View style={{ backgroundColor: colors.background }}>
			<Text style={{ color: colors.text }}>
				renders number is: {renders.current} {colorScheme}
			</Text>
		</View>
	)
}
