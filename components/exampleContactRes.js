export const iosExample = {
	contactType: 'person',
	emails: [
		{
			email: 'adsfadsf@gmail.com',
			id: '3',
			isPrimary: 0,
			label: 'home',
			type: '1',
		},
	],
	firstName: 'Person',
	id: '1',
	imageAvailable: true,
	lastName: 'Pers',
	lookupKey: '0r1-48324C4E464448324C4E',
	name: 'Person Pers',
	note: 'a dude',
	phoneNumbers: [
		{
			id: '1',
			isPrimary: 0,
			label: 'mobile',
			number: '(222) 255-5555',
			type: '2',
		},
		{
			id: '2',
			isPrimary: 0,
			label: 'home',
			number: '(582) 255-5555',
			type: '1',
		},
	],
	addresses: [
		{
			city: 'Maryville',
			country: 'United States',
			id: '027F7890-759B-4063-8523-6412150579EE',
			isoCountryCode: 'us',
			label: 'home',
			postalCode: '37803',
			region: 'TN',
			street: '939 Shannondale Way',
		},
	],
	birthday: {
		day: 18,
		format: 'gregorian',
		month: 10, // November
		year: 1939,
	},
	image: {
		height: 320,
		uri:
			'file:///var/mobile/Containers/Data/Application/FD557C0A-0D4B-4EB3-B5ED-27D89656E700/Library/Caches/ExponentExperienceData/%2540caleblovell%expo-libraries-test/Contacts/DD213B2E-29B8-470E-8C17-2A2A1BE2A23E-thumbnailImageData.png',
		width: 320,
	},
	rawImage: {
		height: 345,
		uri:
			'file:///var/mobile/Containers/Data/Application/FD557C0A-0D4B-4EB3-B5ED-27D89656E700/Library/Caches/ExponentExperienceData/%2540caleblovell%expo-libraries-test/Contacts/DD213B2E-29B8-470E-8C17-2A2A1BE2A23E-imageData.png',
		width: 345,
	},
}

export const androidExample = {
	contactType: 'person',
	emails: [
		{
			email: 'myla.vandenbogaert@example.com',
			id: '1610',
			isPrimary: 0,
			label: 'home',
			type: '1',
		},
	],
	birthday: {
		day: 5,
		format: 'gregorian',
		month: 8, // september
		year: 2019,
	},
	firstName: 'Myla Van',
	id: '231',
	image: {
		uri: 'content://com.android.contacts/contacts/231/photo',
	},
	imageAvailable: true,
	lastName: 'bogaert',
	lookupKey: '2020i5fecfee88b213abc',
	middleName: 'den',
	name: 'Myla Van den bogaert',
	phoneNumbers: [
		{
			id: '1615',
			isPrimary: 0,
			label: 'home',
			number: '(630)-298-9491',
			type: '1',
		},
	],
}
