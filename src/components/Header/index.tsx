import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StatusBarContainer, Title } from './styles';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <StatusBarContainer>
      <StatusBar translucent style='light' />
      <Title>{title}</Title>
    </StatusBarContainer>
  );
}

export default Header;
