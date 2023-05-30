import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {  View, StyleSheet, TouchableHighlight,Text} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import {Image} from 'expo-image';

export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [Permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted')
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      const { uri } = await camera.takePictureAsync()
      console.log(uri);
      setImage(uri);

      await MediaLibrary.saveToLibraryAsync(uri)
    }


  }
  return (
    <View style={styles.container}>
     
      <Camera
        ref={(l) => setCamera(l)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'}
      /> 
      <Image
      style={styles.container}
      source={image}
      contentFit="cover"
      transition={1000}
      />
      <View style={styles.bottonCenter}>
         <TouchableHighlight 
      style={styles.botton}
        onPress={() => {takePicture()}}>
       
        <Text 
        style={{color:'#fff',fontSize:40}}
         >
         Tirar foto
        </Text>
      </TouchableHighlight>
    </View>
      </View>
      
     

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  styleCamera: {
    aspecRatio: 1,
    flex: 1,
  },
  botton:{
    justifyContent:'center',
    backgroundColor:'rgb(100,128,139)',
    elevation:5,
    alignItems:'center',
    height:150,
    width:150,
    borderRadius:30,
    position:'absolute',
    bottom:100,
    
    
  },
  bottonCenter:{
  alignItems:'center',
  }

});