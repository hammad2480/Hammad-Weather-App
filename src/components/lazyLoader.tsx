import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../utils/theme';
import LinearGradient from 'react-native-linear-gradient';

const LazyLoader = importFunc => {
  return React.memo(props => {
    const theme = useSelector((state) => state.theme.mode);
    const themeStyles = theme === 'dark' ? darkTheme : lightTheme;
    const [LazyComponent, setLazyComponent] = useState(null);

    useEffect(() => {
      let componentDidMount = true;
      importFunc().then(mod => {
        if (componentDidMount) setLazyComponent(() => mod.default);
      });
      return () => {
        componentDidMount = false;
      };
    }, []);

    if (!LazyComponent) {
      return (
        <LinearGradient colors={themeStyles.gradient} style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </LinearGradient>
      );
    }

    return <LazyComponent {...props} />;
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LazyLoader;
