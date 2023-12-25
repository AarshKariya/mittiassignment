import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import InfoModal from '../../components/InfoModal/InfoModal';
import {BlrCoords, randomColorWithOpacity} from '../../helpers/mapsHelpers';

export default function GoogleMapsScreen() {
  const [drawingMode, setDrawingMode] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [currentPolygon, setCurrentPolygon] = useState({points: [], color: ''});
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const mapRef = useRef(null);

  const handleMapPress = event => {
    if (drawingMode) {
      const {coordinate} = event?.nativeEvent;
      setCurrentPolygon({
        points: [...currentPolygon?.points, coordinate],
        color: currentPolygon?.color || randomColorWithOpacity(0.7),
      });
    }
  };

  const eraseLastPoint = () => {
    if (currentPolygon?.points?.length > 0) {
      const updatedPolygon = [...currentPolygon?.points?.slice(0, -1)];
      setCurrentPolygon({
        points: updatedPolygon,
        color: currentPolygon?.color,
      });
    }
  };

  const eraseWholePolygon = () => {
    setCurrentPolygon({points: [], color: ''});
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);

    if (!drawingMode) {
      setCurrentPolygon({points: [], color: ''});
    } else {
      if (currentPolygon?.points?.length > 2) {
        setPolygons([...polygons, currentPolygon]);
        setCurrentPolygon({points: [], color: ''});
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={BlrCoords}
        onPress={handleMapPress}>
        {polygons?.map((polygon, index) => (
          <Polygon
            key={index}
            coordinates={polygon?.points}
            strokeColor="#F00"
            fillColor={polygon?.color}
          />
        ))}

        {currentPolygon?.points?.length > 0 && (
          <Polygon
            coordinates={currentPolygon?.points}
            strokeColor="#F00"
            fillColor={currentPolygon?.color || 'rgba(255, 0, 0, 0.5)'}
          />
        )}
      </MapView>

      {openInfoModal && (
        <InfoModal
          setOpenInfoModal={setOpenInfoModal}
          openInfoModal={openInfoModal}
        />
      )}

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={toggleDrawingMode}>
          <Text style={styles.buttonText}>
            {drawingMode ? 'Finish Drawing' : 'Draw Polygon'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !drawingMode || currentPolygon?.points?.length === 0
              ? styles.disabledButton
              : null,
          ]}
          onPress={eraseLastPoint}
          disabled={!drawingMode}>
          <Text style={styles.buttonText}>Erase Last Point</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            !drawingMode || currentPolygon?.points?.length === 0
              ? styles.disabledButton
              : null,
          ]}
          onPress={eraseWholePolygon}
          disabled={!drawingMode}>
          <Text style={styles.buttonText}>Erase Whole Polygon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setOpenInfoModal(!openInfoModal)}>
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 4,
    flex: 1,
    bottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#007bff',
    opacity: 0.6,
  },
});
