import { useState, useEffect } from 'react';
import { FiDroplet, FiWind, FiSun, FiCloudRain, FiAlertTriangle } from 'react-icons/fi';

const WeatherWidget = ({ location = "Delhi" }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=9b8467007ffa437384182602252607&q=${location}&aqi=no`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
      <FiAlertTriangle className="inline mr-2" />
      Couldn't load weather data
    </div>
  );

  const { current, location: loc } = weather;

  // Badminton weather conditions
  const isGoodForBadminton = current.precip_mm === 0 && 
                            current.wind_kph < 20 && 
                            current.humidity < 80;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      {/* Location and Date */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-800">{loc.name}, {loc.country}</h3>
          <p className="text-sm text-gray-500">
            {new Date(loc.localtime).toLocaleString('en-US', {
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <img 
          src={`https:${current.condition.icon}`} 
          alt={current.condition.text}
          className="h-12 w-12"
        />
      </div>

      {/* Main Weather Info */}
      <div className="flex items-end justify-between mt-2 mb-4">
        <span className="text-3xl font-bold text-gray-800">
          {current.temp_c}°C
        </span>
        <div className="text-right">
          <p className="text-sm capitalize">{current.condition.text}</p>
          <p className="text-xs text-gray-500">
            Feels like {current.feelslike_c}°C
          </p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
        <div className="flex flex-col items-center">
          <FiDroplet className="text-blue-500 mb-1" />
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm font-medium">{current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <FiWind className="text-gray-500 mb-1" />
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm font-medium">{current.wind_kph} km/h</p>
        </div>
        <div className="flex flex-col items-center">
          <FiSun className="text-amber-500 mb-1" />
          <p className="text-xs text-gray-500">UV Index</p>
          <p className="text-sm font-medium">{current.uv}</p>
        </div>
      </div>

      {/* Badminton Advice */}
      <div className={`mt-4 p-2 rounded-lg text-sm flex items-center ${
        isGoodForBadminton 
          ? 'bg-green-50 text-green-700 border border-green-100'
          : 'bg-amber-50 text-amber-700 border border-amber-100'
      }`}>
        {isGoodForBadminton ? (
          <>
            <FiSun className="mr-2" />
            <span>Great weather for badminton!</span>
          </>
        ) : (
          <>
            <FiCloudRain className="mr-2" />
            <span>Suboptimal conditions - consider indoor courts</span>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;