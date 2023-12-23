import { useState, useEffect } from 'react';
import Config from 'react-native-config';
import { 
	Platform, 
	StyleSheet, 
	Text, 
	KeyboardAvoidingView,
	View,
	ImageBackground,
	ActivityIndicator,
	StatusBar
} from 'react-native';

import { getWeatherData } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

const App = () => {
	const [location, setLocation] = useState('');

	const handleWeather= async (location) => {
		const weather = await getWeatherData(location)
		console.log(Config.APP_ENV);
	}

	
	
	const handleUpdateLocation = (location) => {
		setLocation(location);
		handleWeather(location);
	}


	useEffect(() => {
		console.log('Component did mount');
		handleUpdateLocation('Mombasa');
	}, [setLocation]);

	return (
		<KeyboardAvoidingView style={styles.container} behavior='padding'>
			<ImageBackground
				source={getImageForWeather('Clear')}
				style={styles.imageContainer}
				imageStyle={styles.image}
			>
				<View style={styles.detailsContainer}>
					<Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
					<Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
					<Text style={[styles.largeText, styles.textStyle]}>24°</Text>

					<SearchInput 
						placeholder='Search any city ...' 
						onSubmit={handleUpdateLocation}
					/>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495E',
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
	textStyle: {
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
		color: 'white',
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},
	detailsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		paddingHorizontal: 20,
	}
});


export default App;