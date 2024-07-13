import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  ScaledSize,
  ColorSchemeName,
  Platform,
  useWindowDimensions,
  useColorScheme
} from "react-native"

type DeviceInfoProvider<T> = () => T

type DeviceInfoDataProvider<D, S> = (dat: D) => S

export type DeviceSizeInfo = ScaledSize & {
  isPortrait: boolean
  isLandscape: boolean
  os: typeof Platform.OS
  theme: ColorSchemeName
}

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

interface StyleSheetData<T, S> {
  diProvider: DeviceInfoProvider<T>
  styles: DeviceInfoDataProvider<T, S>
}

export function registerDeviceInfo<T extends DeviceSizeInfo | any>(diProvider: DeviceInfoProvider<T>) {
  return <S extends NamedStyles<S> | NamedStyles<any>>(fn: (dvData: T) => S): StyleSheetData<T, S> => {
    return {
      styles: fn,
      diProvider
    }
  }
}

export function useDeviceData<
  T extends DeviceSizeInfo | any,
  S extends NamedStyles<S> | NamedStyles<any>
>(data: StyleSheetData<T, S>): NamedStyles<S> {
  const dvData = data.diProvider()
  return data.styles(dvData)
}

export const useDeviceInfo = (): DeviceSizeInfo => {
  const windowDimensions = useWindowDimensions()
  const colorscheme = useColorScheme()
  return {
    ...windowDimensions,
    isLandscape: windowDimensions.width > windowDimensions.height,
    isPortrait: windowDimensions.height > windowDimensions.width,
    os: Platform.OS,
    theme: colorscheme
  }
}

export const styleSheetFactory = registerDeviceInfo(() => {
  const deviceInfo = useDeviceInfo()
  return deviceInfo
})
