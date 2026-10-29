/* eslint-disable react-hooks/refs */

import { useEffect, useRef } from "react";
import {
  PanResponder,
  View,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from "react-native";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "expo-router";

const ROUTES = ["/", "/projects", "/career", "/about", "/explore"] as const;

type Props = {
  children: ReactNode;
};

export default function SwipeableTabScreen({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const routeRef = useRef(pathname);
  const navigatingRef = useRef(false);

  // Keep the route current without recreating the gesture responder.
  routeRef.current = pathname;

  useEffect(() => {
    navigatingRef.current = false;
  }, [pathname]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        const { dx, dy } = gesture;

        return Math.abs(dx) > 25 && Math.abs(dx) > Math.abs(dy) * 1.4;
      },

      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        const { dx, dy, vx } = gesture;

        if (
          navigatingRef.current ||
          Math.abs(dx) < 65 ||
          Math.abs(dx) < Math.abs(dy) * 1.4
        ) {
          return;
        }

        const currentPath = routeRef.current.replace(/\/$/, "") || "/";

        const currentIndex = ROUTES.indexOf(
          currentPath as (typeof ROUTES)[number],
        );

        if (currentIndex === -1) return;

        // Swipe left = next tab; swipe right = previous tab.
        const direction =
          Math.abs(dx) > 100 || Math.abs(vx) > 0.5 ? (dx < 0 ? 1 : -1) : 0;

        if (direction === 0) return;

        const nextIndex = currentIndex + direction;

        if (nextIndex < 0 || nextIndex >= ROUTES.length) {
          return;
        }

        navigatingRef.current = true;
        router.navigate(ROUTES[nextIndex]);
      },
    }),
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}
