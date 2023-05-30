import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, View ,StyleSheet} from "react-native";
import  MediaLibrary from 'expo-media-library';

export default function App() {
   
    const[image,setImage]= useState(null);
    const[camera,setCamera]=useState(null);
    const[Permission,setPermission]=useState(null);
      useEffect(()=>{
       (async()=>{
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setPermission(cameraStatus.status ==='granted')
        })();
      },[]);  
      async function takePicture(){
        if(camera){
          const photo = await camera.takePictureAsync()
          console.log(photo.uril);
           
         await MediaLibrary.saveToLibraryAsync(photo.uril)
        }
          
      
      }
        return (
            <View style={styles.container}>
              <Camera
              ref={(l)=>setCamera(l)}
              style={styles.styleCamera}
              type={CameraType.back}
              ratio={'1:1'}
              />
              <Button title="tirar foto" onPress={()=>{takePicture}}/>

            </View>
            
      );
      
    
}

const styles = StyleSheet.create({
  container: {
   flex:1
  },
  styleCamera:{
    aspecRatio:1,
    flex:1,
  },

});