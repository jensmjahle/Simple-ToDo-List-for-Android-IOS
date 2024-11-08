
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet, Button, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'Home' | 'Details'>('Home');
  const [selectedListName, setSelectedListName] = useState<string>('Quick Notes');

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  const handleSelectList = (listName: string) => {
    setSelectedListName(listName);
    setCurrentScreen('Home');
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />

      {/* Navigation Buttons */}
      <View>
        {currentScreen === 'Home' ? (
          <Button title="Go to My Lists" onPress={() => setCurrentScreen('Details')} />
        ) : (
        <View/>
        )}
      </View>

      {/* Conditionally Render Screens */}
      {currentScreen === 'Home' ? (
        <HomeScreen selectedListName={selectedListName} />
      ) : (
        <DetailsScreen onGoBack={() => setCurrentScreen('Home')} onSelectList={handleSelectList} />
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
