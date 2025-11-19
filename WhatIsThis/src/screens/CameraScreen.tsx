import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Photo } from "../types";

interface CameraScreenProps {
  onCapture: (photo: Photo) => void;
  onCancel: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onCapture, onCancel }) => {
  const cameraRef = useRef<CameraView>(null);
  const [type, setType] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
  }

  const handleCapture = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.4,
      });
      console.log("Foto capturada, enviando para backend...");
      console.log("Base64 existe? ", photo.base64?.substring(0, 30));

      const response = await fetch("http://192.168.1.8:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image: photo.base64 }),
      });

      const result = await response.json();

      const formattedPhoto: Photo = {
        uri: photo.uri,
        base64: photo.base64 ?? "",
        width: photo.width,
        height: photo.height,
        category: result.category,
        description: result.description,
        object: result.object,
        price: result.price,
      };

      console.log("Resposta recebida do backend:", result);

      onCapture(formattedPhoto);
    } catch (error) {
      console.log("Erro ao capturar foto:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Feather
        style={styles.iconCamera}
        name="camera"
        size={50}
        color="#ffffff"
      />
      <CameraView
        style={styles.cameraView}
        ref={cameraRef}
        facing={type}
      ></CameraView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Feather name="camera" size={20} color="#ffffff" />
          <Text style={styles.buttonTextCapture}>Capturar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7c1ae4e5",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCamera: {
    marginBottom: 20,
  },
  cameraView: {
    width: 350,
    height: 400,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },
  cancelButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 10,
    width: 150,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonTextCancel: {
    color: "#7c1ae4e5",
    fontWeight: "bold",
  },
  buttonTextCapture: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  captureButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#6c31b8c2",
    padding: 10,
    width: 150,
    justifyContent: "center",
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default CameraScreen;
