import React, { useEffect, useReducer, useState } from "react";
import TrackerMap from "./TrackerMap";
import { rdb } from "../../firebase";
import { onValue, ref, onChildAdded } from "firebase/database";
import "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "leaflet-routing-machine";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

function Dashboard() {
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [marker, setMarker] = useState([]);

  const [trucks, setTrucks] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      fetchState: 0,
      trucks: [],
      count: 0,
    }
  );

  // useEffect(() => {
  //   if (!map) return;
  // }, []);

  const trackGarbageTruck = () => {
    if (trucks["fetchState"] == 1) {
      const truck = trucks["trucks"][0];

      if (route) {
        map.removeControl(route);
        setRoute(null);
      }

      if (marker.length > 0) {
        marker.map((item) => {
          map.removeLayer(item);
        });

        setMarker([]);
      }

      if (truck.current.length < 1) {
        return;
      }

      try {
        const current = truck.current[truck.current.length - 1]
          .split(",")
          .map((i) => parseFloat(i.trim()));
        var points = [];

        truck.current.map((item) => {
          const latlng = item.split(",").map((i) => i.trim());

          if (latlng.length != 2) return;

          const reg = new RegExp(
            "^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,10})$"
          );

          if (reg.exec(latlng[0]) && reg.exec(latlng[1])) {
            points.push([
              parseFloat(latlng[0].trim()),
              parseFloat(latlng[1].trim()),
            ]);
          }
          // points.push(item.split(",").map((i) => parseFloat(i.trim())));
        });

        map.flyTo(current, 18);

        const temp = L.polyline(points, {
          color: "red",
          weight: 5,
          opacity: 0.6,
          smoothFactor: 1,
        });

        const tempM = [points[points.length - 1]].map((item) =>
          L.marker(item, { icon: iconDefault }).addTo(map)
        );

        temp.addTo(map);
        setMarker(tempM);
        setRoute(temp);
      } catch {
        return;
      }
    }
  };

  useEffect(() => {
    if (!map) return;
    trackGarbageTruck();
  }, [trucks["trucks"]]);

  useEffect(() => {
    const query = ref(rdb, "/NODES");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const trucks = Object.keys(data).map((key) => data[key]);

        if (!("current" in trucks[0])) {
          setTrucks({
            fetchState: 2,
            trucks: [],
          });

          return;
        }

        setTrucks({
          fetchState: 1,
          trucks: trucks,
        });

        return;
      }

      setTrucks({
        fetchState: 2,
      });
    });
  }, []);

  return (
    <div className="w-full h-full rounded-lg">
      <TrackerMap
        map={map}
        setMap={setMap}
        trucks={trucks}
        track={() => {
          trackGarbageTruck();
        }}
      />
    </div>
  );
}

export default Dashboard;
