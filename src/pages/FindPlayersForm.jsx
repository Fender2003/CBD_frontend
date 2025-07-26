import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WeatherWidget from "../components/WeatherWidget";

const TimePicker = ({ onSelect }) => {
  const [ampm, setAmpm] = useState("AM");
  const [selectedHour, setSelectedHour] = useState(null);

  const handleClick = (hour) => {
    setSelectedHour(hour);
    onSelect(hour, ampm);
  };

  const handleAmpmChange = (period) => {
    setAmpm(period);
    if (selectedHour) onSelect(selectedHour, period);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-6 gap-3">
        {[...Array(12)].map((_, i) => {
          const hour = i + 1;
          return (
            <button
              key={hour}
              onClick={() => handleClick(hour)}
              className={`aspect-square rounded-lg flex items-center justify-center text-lg font-medium transition-all ${
                selectedHour === hour
                  ? "bg-teal-100 text-teal-800 border-2 border-teal-400"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {hour}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center space-x-4">
        {["AM", "PM"].map((period) => (
          <button
            key={period}
            onClick={() => handleAmpmChange(period)}
            className={`px-8 py-2 rounded-lg border transition-all ${
              ampm === period
                ? "bg-teal-500 text-white border-teal-500"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {selectedHour && (
        <div className="text-center text-gray-600 py-2 border-t border-gray-100">
          Selected time: <span className="font-semibold">{selectedHour}:00 {ampm} - {(selectedHour % 12) + 1}:00 {ampm}</span>
        </div>
      )}
    </div>
  );
};

const PlayerInput = ({ value, onChange, onRemove, disabled, index }) => (
  <div className="flex items-center space-x-3">
    <input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-gray-50"
      placeholder={`Player ${index + 1} phone`}
    />
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-400 hover:text-teal-600 transition-colors p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    )}
  </div>
);

const FindPlayers = () => {
  const [matchType, setMatchType] = useState("Single");
  const [groupName, setGroupName] = useState("");
  const [players, setPlayers] = useState([""]);
  const [bookingDate, setBookingDate] = useState("");
  const [court, setCourt] = useState("");
  const [startHour, setStartHour] = useState(null);
  const [ampm, setAmpm] = useState("AM");

  const handleAddPlayer = () => {
    if (matchType === "Double" && players.length < 2) {
      setPlayers([...players, ""]);
    }
  };

  const handleRemovePlayer = (index) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const handleTimeSelect = (hour, period) => {
    setStartHour(hour);
    setAmpm(period);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const end = (startHour % 12) + 1;
    const summary = `
      Match Type: ${matchType}
      Group Name: ${groupName}
      Players: ${players.join(", ")}
      Booking Date: ${bookingDate}
      Start Time: ${startHour}:00 ${ampm}
      End Time: ${end}:00 ${ampm}
      Court: ${court}
    `;
    alert(summary);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Weather Widget */}
          <div className="lg:w-1/4" lg:mt-10>
            <div className="lg:sticky lg:top-48"> {/* Changed to match form starting point */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <WeatherWidget location="New Delhi" />
                
                {/* Additional Points Section */}
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Match Tips</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>Morning sessions (7-9AM) are cooler and less crowded</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>Bring at least 2-3 pickleballs per match</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>Wear court shoes to prevent injuries</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


          {/* Main Form Content */}
          <div className="lg:w-3/4">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-gray-800">Schedule Your Pickleball Match</h1>
              <p className="mt-2 text-lg text-gray-600">Find players and book your court in just a few steps</p>
            </div>

            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
              <div className="p-8 space-y-8">
                {/* Match Type */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">1. Match Details</h2>
                  <div className="flex space-x-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-2">Match Type</label>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setMatchType("Single");
                            setPlayers([""]);
                          }}
                          className={`px-6 py-3 rounded-lg border transition-all flex-1 ${
                            matchType === "Single"
                              ? "bg-teal-50 border-teal-300 text-teal-800 font-medium"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Single
                        </button>
                        <button
                          onClick={() => {
                            setMatchType("Double");
                            setPlayers(players.length === 1 ? ["", ""] : [""]);
                          }}
                          className={`px-6 py-3 rounded-lg border transition-all flex-1 ${
                            matchType === "Double"
                              ? "bg-teal-50 border-teal-300 text-teal-800 font-medium"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Double
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-2">Group Name (Optional)</label>
                      <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-gray-50"
                        placeholder="Team name"
                      />
                    </div>
                  </div>
                </div>

                {/* Players */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">2. Players</h2>
                    {matchType === "Double" && players.length < 2 && (
                      <button
                        type="button"
                        onClick={handleAddPlayer}
                        className="flex items-center text-sm text-teal-600 hover:text-teal-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Player
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {players.map((player, idx) => (
                      <PlayerInput
                        key={idx}
                        value={player}
                        index={idx}
                        onChange={(value) => {
                          const updated = [...players];
                          updated[idx] = value;
                          setPlayers(updated);
                        }}
                        onRemove={matchType === "Double" && players.length > 1 ? () => handleRemovePlayer(idx) : null}
                        disabled={matchType === "Single" && idx > 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">3. Date</h2>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-gray-50"
                    />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">4. Time Slot</h2>
                    <TimePicker onSelect={handleTimeSelect} />
                  </div>
                </div>

                {/* Court */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">5. Court Location</h2>
                  <input
                    type="text"
                    value={court}
                    onChange={(e) => setCourt(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-gray-50"
                    placeholder="Enter court name or facility"
                  />
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!startHour || !bookingDate || players.some((p) => !p)}
                    className="w-full py-3 px-6 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Schedule Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindPlayers;