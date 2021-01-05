import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from "@eva-design/eva";

import LandingScreen from "./screens/Home/LandingScreen";
import AppNavigation from './navigation/AppNavigation';

export default function App() {
  return <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar style="light" />
      <AppNavigation/>
    </ApplicationProvider>
  </>
}
