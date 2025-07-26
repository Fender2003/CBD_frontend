import React, { useState } from "react";
import "react-clock/dist/Clock.css";

const AnalogHourClock = ({ onSelect }) => {
  const [ampm, setAmpm] = useState("AM");
  const [selectedHour, setSelectedHour] = useState(null);

  const handleClick = (hour) => {
    setSelectedHour(hour);
    onSelect(hour, ampm);
  };

  const handleAmpmChange = (e) => {
    setAmpm(e.target.value);
    if (selectedHour) {
      onSelect(selectedHour, e.target.value);
    }
  };

  const renderNumbers = () => {
    const hours = [];
    const radius = 90;
    const center = 100;

    for (let i = 1; i <= 12; i++) {
      const angle = ((i - 3) * 30 * Math.PI) / 180;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      hours.push(
        <text
          key={i}
          x={x}
          y={y}
          fontSize="18"
          textAnchor="middle"
          dominantBaseline="middle"
          onClick={() => handleClick(i)}
          style={{
            cursor: "pointer",
            fill: selectedHour === i ? "#ef4444" : "#374151",
            fontWeight: selectedHour === i ? "bold" : "normal",
          }}
        >
          {i}
        </text>
      );
    }

    return hours;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
        {renderNumbers()}
        {selectedHour && (
          <line
            x1="100"
            y1="100"
            x2={100 + 50 * Math.cos(((selectedHour - 3) * 30 * Math.PI) / 180)}
            y2={100 + 50 * Math.sin(((selectedHour - 3) * 30 * Math.PI) / 180)}
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
      </svg>

      <div className="flex items-center gap-3">
        <label className="font-medium">AM/PM:</label>
        <select
          value={ampm}
          onChange={handleAmpmChange}
          className="border px-3 py-1 rounded"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      {selectedHour && (
        <p className="text-gray-700 text-base">
          <b>Start:</b> {selectedHour}:00 {ampm} &nbsp; | &nbsp;
          <b>End:</b> {(selectedHour % 12) + 1}:00 {ampm}
        </p>
      )}
    </div>
  );
};

const FindPlayers = () => {
  const [matchType, setMatchType] = useState("Single");
  const [groupName, setGroupName] = useState("");
  const [players, setPlayers] = useState([""]);
  const [bookingDate, setBookingDate] = useState("");
  const [court, setCourt] = useState("");
  const [startHour, setStartHour] = useState(null);
  const [ampm, setAmpm] = useState("AM");

  const handleAddPlayer = () => {
    if (matchType === "Double" && players.length < 4) {
      setPlayers([...players, ""]);
    }
  };

  const handleRemovePlayer = (index) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Find Players</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Match Type */}
        <div>
          <label className="font-semibold block mb-1">Match Type</label>
          <select
            value={matchType}
            onChange={(e) => {
              setMatchType(e.target.value);
              setPlayers([""]);
            }}
            className="w-full border rounded px-4 py-2"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
        </div>

        {/* Group Name */}
        <div>
          <label className="font-semibold block mb-1">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="e.g., Court Kings"
          />
        </div>

        {/* Player Numbers */}
        <div>
          <label className="font-semibold block mb-2">Player Phone Numbers</label>
          {players.map((player, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="tel"
                value={player}
                onChange={(e) => handlePlayerChange(idx, e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder={`Phone ${idx + 1}`}
                disabled={matchType === "Single" && idx > 0}
              />
              {matchType === "Double" && players.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePlayer(idx)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
          {matchType === "Double" && players.length < 4 && (
            <button
              type="button"
              onClick={handleAddPlayer}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Add Player
            </button>
          )}
        </div>

        {/* Booking Date */}
        <div>
          <label className="font-semibold block mb-1">Booking Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        {/* Analog Clock Picker */}
        <div>
          <label className="block font-semibold text-center mb-2">Match Time</label>
          <AnalogHourClock onSelect={handleTimeSelect} />
        </div>

        {/* Court */}
        <div>
          <label className="font-semibold block mb-1">Court</label>
          <input
            type="text"
            value={court}
            onChange={(e) => setCourt(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="e.g., Nehru Stadium"
          />
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={!startHour || !bookingDate || players.some((p) => !p)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindPlayers;
