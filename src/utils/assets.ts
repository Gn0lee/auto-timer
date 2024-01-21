import { Image } from 'react-native';
import { FontSource, loadAsync } from 'expo-font';
import { Asset } from 'expo-asset';
import {
  FontAwesome,
  Ionicons,
  Entypo,
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export const vectorFonts = [
  FontAwesome.font,
  Ionicons.font,
  Entypo.font,
  SimpleLineIcons.font,
  MaterialIcons.font,
  MaterialCommunityIcons.font,
];

export const fontAssets = [
  ...vectorFonts,
  { SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf') },
];

export const imageAssets = [];

export const cacheFonts = (fonts: (string | Record<string, FontSource>)[]) => {
  return fonts.map((font) => loadAsync(font));
};

export const cacheImages = (images: (string | number)[]) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
};
