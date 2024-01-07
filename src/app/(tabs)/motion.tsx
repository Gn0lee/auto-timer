import { View, Text } from '@components/Themed';

import useGetDeviceMotionPermission from '@hooks/useGetDeviceMotionPermission';

export default function Motion() {
  const { granted } = useGetDeviceMotionPermission();

  console.log(granted);

  return (
    <View>
      <Text>Motion</Text>
    </View>
  );
}
