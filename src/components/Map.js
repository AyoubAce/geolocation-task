import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import LatestSearches from "./LatestSearches";

const center = {
  lat: 51.51661,
  lng: 7.45829,
};

function Map() {
  const [map, setMap] = useState();
  const [location, setLocation] = useState();
  const [latestSearches, setLatestSearches] = useState([]);
  const inputRef = useRef(null);
  // clock icon -> show latest searches
  const historyBtnRef = useRef(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("locations"))) {
      setLatestSearches(JSON.parse(localStorage.getItem("locations")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search location
  const handleLocation = (e) => {
    if (inputRef.current.value === "") {
      return;
    }
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: inputRef.current.value }, (results, status) => {
      if (status === "OK") {
        setLocation(results[0].geometry.location);
        map.setCenter(results[0].geometry.location);
        map.setZoom(13);
        // let marker= new window.google.maps.Marker({
        //     map:map,
        //     position:results[0].geometry.location
        // })

        handleLatestSearches();
      } else {
        alert("Geocode was not successful for the following reason:" + status);
      }
    });
  };

  const handleLatestSearches = () => {
    if (latestSearches) {
      let existing = latestSearches?.find(
        (element) => element === inputRef.current.value
      );

      if (existing) {
        //remove the existing item and re-push it to the end of the array
        let removeExisting = latestSearches
          ?.filter((item) => item !== existing)
          .slice(-19);
        setLatestSearches([...removeExisting, existing]);
        localStorage.setItem(
          "locations",
          JSON.stringify([...removeExisting, existing])
        );
      } else {
        localStorage.setItem(
          "locations",
          JSON.stringify([...latestSearches.slice(-19), inputRef.current.value])
        );
        setLatestSearches([
          ...latestSearches.slice(-19),
          inputRef.current.value,
        ]);
      }
    } else {
      localStorage.setItem(
        "locations",
        JSON.stringify([inputRef.current.value])
      );
    }
  };

  return (
    <div className="container">
      {/* input controls */}
      <div className="controls-container">
        <div className="controls">
          <span
            ref={historyBtnRef}
            className="history material-icons"
            style={{ color: latestSearches.length > 0 && "rgb(140, 204, 247)" }}
          >
            query_builder
          </span>

          <div className="search">
            <Autocomplete className="auto">
              <input
                ref={inputRef}
                type="text"
                placeholder="search location"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLocation();
                  }
                }}
              />
            </Autocomplete>
             
          </div>

          <button className="material-icons" onClick={() => handleLocation()}>
            search
          </button>
        </div>
      </div>

      <LatestSearches
        latestSearches={latestSearches}
        setLatestSearch={setLatestSearches}
        handleLocation={handleLocation}
        inputRef={inputRef}
        historyBtnRef={historyBtnRef}
      />

      {/* show map */}
      <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(map) => setMap(map)}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {location && (
          <Marker
            position={location}
            onClick={() => {
              map.setZoom(17);
              map.setCenter(location);
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
