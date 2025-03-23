import { useRef, useCallback } from 'react';
import {
  PanResponder,
  PanResponderGestureState,
  GestureResponderEvent,
  Animated,
  Dimensions,
} from 'react-native';

interface GestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPanStart?: () => void;
  onPanMove?: (gestureState: PanResponderGestureState) => void;
  onPanEnd?: (gestureState: PanResponderGestureState) => void;
  onPanCancel?: () => void;
  onPanRelease?: (gestureState: PanResponderGestureState) => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (rotate: number) => void;
  minSwipeDistance?: number;
  minPanDistance?: number;
  longPressDuration?: number;
  doubleTapDelay?: number;
  shouldCancelWhenOutside?: boolean;
  simultaneousHandlers?: any[];
}

interface GestureState {
  isActive: boolean;
  isSwiping: boolean;
  isPanning: boolean;
  isPinching: boolean;
  isRotating: boolean;
  lastTap?: number;
  lastScale?: number;
  lastRotation?: number;
}

export const useGesture = (config: GestureConfig = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPanStart,
    onPanMove,
    onPanEnd,
    onPanCancel,
    onPanRelease,
    onLongPress,
    onDoubleTap,
    onPinch,
    onRotate,
    minSwipeDistance = 50,
    minPanDistance = 10,
    longPressDuration = 500,
    doubleTapDelay = 300,
    shouldCancelWhenOutside = true,
    simultaneousHandlers = [],
  } = config;

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const state = useRef<GestureState>({
    isActive: false,
    isSwiping: false,
    isPanning: false,
    isPinching: false,
    isRotating: false,
  }).current;

  const handleStartShouldSetPanResponder = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      return true;
    },
    []
  );

  const handleMoveShouldSetPanResponder = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      return Math.abs(gestureState.dx) > minPanDistance || Math.abs(gestureState.dy) > minPanDistance;
    },
    [minPanDistance]
  );

  const handlePanResponderGrant = useCallback(() => {
    state.isActive = true;
    onPanStart?.();
  }, [onPanStart]);

  const handlePanResponderMove = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (!state.isActive) return;

      state.isPanning = true;
      pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      onPanMove?.(gestureState);
    },
    [onPanMove]
  );

  const handlePanResponderRelease = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (!state.isActive) return;

      state.isActive = false;
      state.isPanning = false;

      const { dx, dy } = gestureState;
      const isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
      const isVerticalSwipe = Math.abs(dy) > Math.abs(dx);

      if (Math.abs(dx) > minSwipeDistance || Math.abs(dy) > minSwipeDistance) {
        if (isHorizontalSwipe) {
          if (dx > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        } else if (isVerticalSwipe) {
          if (dy > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }

      onPanRelease?.(gestureState);
      pan.setValue({ x: 0, y: 0 });
    },
    [minSwipeDistance, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPanRelease]
  );

  const handlePanResponderCancel = useCallback(() => {
    if (!state.isActive) return;

    state.isActive = false;
    state.isPanning = false;
    onPanCancel?.();
    pan.setValue({ x: 0, y: 0 });
  }, [onPanCancel]);

  const handlePanResponderTerminate = useCallback(() => {
    handlePanResponderCancel();
  }, [handlePanResponderCancel]);

  const handlePanResponderTerminationRequest = useCallback(() => {
    return true;
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderCancel: handlePanResponderCancel,
      onPanResponderTerminate: handlePanResponderTerminate,
      onPanResponderTerminationRequest: handlePanResponderTerminationRequest,
      onShouldBlockNativeResponder: () => true,
      simultaneousHandlers,
    })
  ).current;

  const handlePinchGesture = useCallback(
    (event: GestureResponderEvent) => {
      const touches = event.nativeEvent.touches;
      if (touches.length !== 2) return;

      const touch1 = touches[0];
      const touch2 = touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
      );

      if (state.lastScale) {
        const newScale = (currentDistance / state.lastScale) * scale._value;
        scale.setValue(newScale);
        onPinch?.(newScale);
      }

      state.lastScale = currentDistance;
      state.isPinching = true;
    },
    [onPinch]
  );

  const handleRotateGesture = useCallback(
    (event: GestureResponderEvent) => {
      const touches = event.nativeEvent.touches;
      if (touches.length !== 2) return;

      const touch1 = touches[0];
      const touch2 = touches[1];
      const currentAngle = Math.atan2(
        touch2.pageY - touch1.pageY,
        touch2.pageX - touch1.pageX
      );

      if (state.lastRotation) {
        const rotation = currentAngle - state.lastRotation;
        const newRotation = rotate._value + rotation;
        rotate.setValue(newRotation);
        onRotate?.(newRotation);
      }

      state.lastRotation = currentAngle;
      state.isRotating = true;
    },
    [onRotate]
  );

  const handleTouchStart = useCallback(() => {
    const now = Date.now();
    if (state.lastTap && now - state.lastTap < doubleTapDelay) {
      onDoubleTap?.();
      state.lastTap = undefined;
    } else {
      state.lastTap = now;
      setTimeout(() => {
        if (state.lastTap === now) {
          onLongPress?.();
        }
      }, longPressDuration);
    }
  }, [doubleTapDelay, longPressDuration, onDoubleTap, onLongPress]);

  const handleTouchEnd = useCallback(() => {
    if (state.lastTap) {
      const now = Date.now();
      if (now - state.lastTap >= longPressDuration) {
        state.lastTap = undefined;
      }
    }
  }, [longPressDuration]);

  return {
    panResponder,
    pan,
    scale,
    rotate,
    handlePinchGesture,
    handleRotateGesture,
    handleTouchStart,
    handleTouchEnd,
    isActive: state.isActive,
    isSwiping: state.isSwiping,
    isPanning: state.isPanning,
    isPinching: state.isPinching,
    isRotating: state.isRotating,
  };
}; 