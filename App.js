import { StatusBar } from 'expo-status-bar';
import { 
	Platform, 
	StyleSheet, 
	Text, 
	KeyboardAvoidingView,
} from 'react-native';

import SearchInput from './components/SearchInput';

export default function App() {
	return (
		<KeyboardAvoidingView style={styles.container} behavior='padding'>
			<Text style={[styles.largeText, styles.textStyle]}>Nairobi</Text>
			<Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
			<Text style={[styles.largeText, styles.textStyle]}>24°</Text>

			<SearchInput placeholder='Search any city ...' />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStyle: {
		textAlign: 'center',
		...Platform.select({
			ios: {
				fontFamily: 'AvenirNext-Regular',
			},
			android: {
				fontFamily: 'Roboto',
			},
		}),
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},
});
