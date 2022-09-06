import React from 'react';
import { SvgProps } from 'react-native-svg';
import colors from '../../global/styles/colors';
import { Container, TabText } from './styles';

interface TabBarProps {
  focused?: boolean;
  title: string;
  icon: React.FC<SvgProps>;
}

function TabBar({ focused, title, icon: Icon }: TabBarProps) {
  return (
    <Container>
      <Icon opacity={focused ? 1 : 0.5}  width={22} height={22} fill={colors.white} />
      <TabText focused={focused}>
        {title}
      </TabText>
    </Container>
  );
}

export default TabBar;