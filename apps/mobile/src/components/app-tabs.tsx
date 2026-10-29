/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef } from 'react';
import {
  PanResponder,
  View,
  useColorScheme,
} from 'react-native';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  House,
  FolderKanban,
  BriefcaseBusiness,
  UserRound,
  Code2,
} from 'lucide-react-native';

const ROUTES = [
  '/',
  '/projects',
  '/career',
  '/about',
  '/explore',
] as const;

export default function AppTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const dark = scheme !== 'light';

  const routeRef = useRef(pathname);
  const navigatingRef = useRef(false);

  routeRef.current = pathname;

  useEffect(() => {
    navigatingRef.current = false;
  }, [pathname]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      // Capture horizontal swipes before a child ScrollView does.
      onMoveShouldSetPanResponderCapture: (_, gesture) => {
        const { dx, dy } = gesture;

        return (
          Math.abs(dx) > 18 &&
          Math.abs(dx) > Math.abs(dy) * 1.5
        );
      },

      onPanResponderTerminationRequest: () => false,

      onPanResponderRelease: (_, gesture) => {
        const { dx, dy, vx } = gesture;

        if (
          navigatingRef.current ||
          Math.abs(dx) < 60 ||
          Math.abs(dx) < Math.abs(dy) * 1.5
        ) {
          return;
        }

        const currentPath = routeRef.current.replace(/\/$/, '') || '/';
        const currentIndex = ROUTES.indexOf(
          currentPath as (typeof ROUTES)[number],
        );

        if (currentIndex === -1) return;

        // Left = next page. Right = previous page.
        const direction = dx < 0 ? 1 : -1;
        const nextIndex = currentIndex + direction;

        if (nextIndex < 0 || nextIndex >= ROUTES.length) return;

        // Avoid duplicate navigation from the same gesture.
        navigatingRef.current = true;
        router.navigate(ROUTES[nextIndex]);
      },
    }),
  ).current;

  const background = dark ? '#111113' : '#FFFFFF';
  const inactive = dark ? '#85858D' : '#777780';
  const border = dark ? '#29292E' : '#E9E9EC';
  const accent = '#FF6A00';

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: inactive,

          tabBarStyle: {
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: Math.max(insets.bottom, 10),
            height: 68,
            paddingTop: 8,
            paddingBottom: 5,
            paddingHorizontal: 3,
            backgroundColor: background,
            borderRadius: 22,
            borderTopWidth: 0,
            borderWidth: 1,
            borderColor: border,
            elevation: 12,
            shadowColor: '#000',
            shadowOpacity: dark ? 0.3 : 0.12,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 5 },
          },

          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            marginTop: 2,
          },

          tabBarIconStyle: {
            marginTop: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <House
                size={size + 1}
                color={color}
                strokeWidth={focused ? 2.6 : 1.8}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
            tabBarIcon: ({ color, size, focused }) => (
              <FolderKanban
                size={size}
                color={color}
                strokeWidth={focused ? 2.6 : 1.8}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="career"
          options={{
            title: 'Career',
            tabBarIcon: ({ color, size, focused }) => (
              <BriefcaseBusiness
                size={size}
                color={color}
                strokeWidth={focused ? 2.6 : 1.8}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, size, focused }) => (
              <UserRound
                size={size}
                color={color}
                strokeWidth={focused ? 2.6 : 1.8}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size, focused }) => (
              <Code2
                size={size}
                color={color}
                strokeWidth={focused ? 2.6 : 1.8}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
