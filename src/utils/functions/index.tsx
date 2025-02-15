export const WeatherColors = (weather) => {
    switch (weather?.toLowerCase()) {
      case "sunny":
        return ["#ff9800", "#ffcc80"];
      case "cloudy":
        return ["#757575", "#bdbdbd"]; 
      case "rainy":
        return ["#37474F", "#607D8B"];
    }
  };

  export  const getAnimationSource = weather => {
      switch (weather) {
        case 'Sunny':
          return require('../../assets/lottie/sunny.json');
        case 'Cloudy':
          return require('../../assets/lottie/cloudy.json');
          case 'Rainy':
            return require('../../assets/lottie/rainy.json');  
        default:
          return require('../../assets/lottie/sunny.json');
      }
    };