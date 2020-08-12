import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleState } from './StyleProvider'

export const ColorThemeTest = () => {
	const Styles = useStyleState()
	const renders = useRef(0)
	renders.current++
	console.log(renders.current + Styles.theme)
	return (
		<View style={{ backgroundColor: Styles.colors.background }}>
			<Text style={{ color: Styles.colors.text }}>
				renders number is: {renders.current} and mode is: {Styles.theme}
			</Text>
		</View>
	)
}
