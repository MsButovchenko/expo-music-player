import { AntDesign } from '@expo/vector-icons';
import { ButtonProps } from 'react-native';
import { EPlayButtonTypes } from './playButton.contant';

interface IPlayButtonProps extends ButtonProps {
  size?: number;
  color?: string;
  type: EPlayButtonTypes;
}

export const PlayButton = ({
  size,
  color,
  type,
  onPress,
  ...props
}: IPlayButtonProps) => {
  return (
    <AntDesign
      {...props}
      onPress={onPress}
      name={type}
      size={size}
      color={color}
    />
  );
};
