import React, { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import { Photo } from "./src/types";
import { Camera } from "expo-camera";
import ResultScreen from "./src/screens/ResultScreen"; 

const SCREENS = {
  HOME: "home",
  CAMERA: "camera",
  RESULTS: "results",
  PERMISSION_DENIED: "permission_denied",
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [capturedPhoto, setCapturedPhoto] = useState<Photo | null>(null);

  const handleStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      setCurrentScreen(SCREENS.CAMERA);
    } else if (status === "denied") {
      setCurrentScreen(SCREENS.PERMISSION_DENIED);
      Alert.alert(
        "Permissão Necessária",
        "Não foi possível acessar a câmera. Por favor, habilite a permissão nas configurações do seu dispositivo."
      );
    } else {
      setCurrentScreen(SCREENS.PERMISSION_DENIED);
    }
  };

  const handleGoHome = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  const handlePhotoCapture = (photo: Photo) => {
    console.log("Foto capturada. URI:", photo.uri);
    setCapturedPhoto(photo);
    setCurrentScreen(SCREENS.RESULTS);
  };

  if (currentScreen === SCREENS.CAMERA) {
    return (
      <CameraScreen onCapture={handlePhotoCapture} onCancel={handleGoHome} />
    );
  }

  if (currentScreen === SCREENS.RESULTS) {
    return <ResultScreen photo={capturedPhoto} onBack={handleGoHome} />;
  }

  if (currentScreen === SCREENS.PERMISSION_DENIED) {
    return (
      <View>
        <Text>Não foi possível acessar a câmera. Verifique as permissões.</Text>
        <TouchableOpacity onPress={handleGoHome}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <HomeScreen onStartCamera={handleStartCamera} />;
}
