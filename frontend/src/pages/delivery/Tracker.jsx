import React, { useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyAjE3ZYiEDeX7f_2pcHfosV7ARxaz3npRk"; // Use your restricted key

function Location() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateDistance = () => {
    if (!origin || !destination) {
      setError("Please enter both places");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          const element = response.rows[0].elements[0];
          if (element.status === "OK") {
            setResult({
              distance: element.distance.text,
              duration: element.duration.text,
            });
          } else {
            setError("Route not found");
          }
        } else {
          setError("Error fetching data: " + status);
        }
      }
    );
  };

  return (
    <div style={styles.container}>
      <h2>🚗 Distance Finder</h2>

      <input
        type="text"
        placeholder="Enter starting place"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={styles.input}
      />

      <button onClick={calculateDistance} style={styles.button}>
        Calculate
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={styles.result}>
          <p><b>Distance:</b> {result.distance}</p>
          <p><b>Duration:</b> {result.duration}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "50px auto",
    textAlign: "center",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 10,
  },
  input: { width: "90%", padding: 10, margin: "10px 0" },
  button: { padding: 10, backgroundColor: "#4CAF50", color: "#fff", border: "none" },
  result: { marginTop: 20 },
};

export default Location;