import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

export default function CameraBottomGallery() {
  const [firstImage, setFirstImage] = useState<string>("");
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        setPermissionGranted(true);
      } else {
        setErrorMessage("GALLERY_PERMISSION_REQUIRED");
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
      setErrorMessage("PERMISSION_DENIED");
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
      setErrorMessage("NO_IMAGES");
    }
  };

  const uploadImage = async () => {
    try {
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
        allowsEditing: true,
      });

      if (assets && assets.length > 0) {
        router.replace({
          pathname: "/(tabs)/Camera/Preview",
          params: {
            image: JSON.stringify(assets[0]),
          },
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("IMAGE_PICKER_FAIL");
    }
  };

  return (
    <TouchableOpacity style={styles.gallery} onPress={uploadImage}>
      {firstImage && (
        <Image
          style={styles.firstImage}
          source={{ uri: firstImage }}
          contentFit="contain"
        />
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
