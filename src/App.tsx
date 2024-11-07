import React, {useState} from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from'./screens/DetailsScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
    const [currentScreen, setCurrentScreen] = useState<'Home' | 'TaskDetails'>('Home');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigateToDetails = () => setCurrentScreen('TaskDetails');
  const goBackToHome = () => setCurrentScreen('Home');

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
           {currentScreen === 'Home' ? (
              <HomeScreen onNavigateToDetails={navigateToDetails} />
            ) : (
              <DetailsScreen onGoBack={goBackToHome} />
            )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
