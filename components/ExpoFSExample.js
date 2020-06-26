import React, { useState } from 'react'
import { Text } from 'react-native'
import * as FileSystem from 'expo-file-system'

export const ExpoFSExample = () => {
	const [photo, setPhoto] = useState(null)

	FileSystem.readAsStringAsync(photo.url, FileSystem.EncodingType.Base64).then(media => {
		this.post(`zoobee/record-id/${photo.recordId}/album/photo`, {
			media,
		})
	})

	return (
		<>
			<Text>Here's a file read out: {photo}</Text>
		</>
	)
}
