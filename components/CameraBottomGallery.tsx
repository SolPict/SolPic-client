import { router } from "expo-router";
import {  useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export default function CameraBottomGallery() {
  const [firstImage, setFirstImage] = useState<string>("");
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        setPermissionGranted(true);
      } else {
        Alert.alert("갤러리 접근 권한이 필요합니다.");
      }
    };

    getPermission();
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      getFirstImage();
    }
  }, [permissionGranted]);

  const getFirstImage = async () => {
    if (!permissionGranted) {
      Alert.alert("권한이 없습니다.");
      return;
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 1,
      sortBy: MediaLibrary.SortBy.creationTime,
    });

    if (media.assets.length > 0) {
      const asset = media.assets[0];
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

      if (assetInfo.localUri) {
        setFirstImage(assetInfo.localUri);
      }
    } else {
      Alert.alert("갤러리에 이미지가 없습니다.");
    }
  };

  const uploadImage = async () => {
    const { assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (assets) {
      router.replace({
        pathname: "/(tabs)/Camera/Preview",
        params: {
          image: JSON.stringify(assets[0]),
        },
      });
    }
  };

  return (
    <TouchableOpacity style={styles.gallery} onPress={uploadImage}>
      {firstImage && (
        <Image style={styles.firstImage} source={{ uri: firstImage }} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gallery: {
    position: "absolute",
    width: 35,
    height: 35,
    right: 110,
    bottom: 90,
    borderRadius: 10,
  },
  firstImage: {
    resizeMode: "cover",
    width: 35,
    height: 35,
    borderRadius: 10,
  },
});
