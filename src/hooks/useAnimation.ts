import { useCallback, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface AnimationConfig {
  toValue: number;
  duration?: number;
  easing?: (value: number) => number;
  useNativeDriver?: boolean;
}

export const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animate = useCallback((animation: Animated.Value, config: AnimationConfig) => {
    const {
      toValue,
      duration = 300,
      easing = Easing.inOut(Easing.ease),
      useNativeDriver = true,
    } = config;

    return Animated.timing(animation, {
      toValue,
      duration,
      easing,
      useNativeDriver,
    }).start();
  }, []);

  const fadeIn = useCallback((duration?: number) => {
    return animate(fadeAnim, { toValue: 1, duration });
  }, [fadeAnim, animate]);

  const fadeOut = useCallback((duration?: number) => {
    return animate(fadeAnim, { toValue: 0, duration });
  }, [fadeAnim, animate]);

  const scaleIn = useCallback((duration?: number) => {
    return animate(scaleAnim, { toValue: 1, duration });
  }, [scaleAnim, animate]);

  const scaleOut = useCallback((duration?: number) => {
    return animate(scaleAnim, { toValue: 0, duration });
  }, [scaleAnim, animate]);

  const slideIn = useCallback((duration?: number) => {
    return animate(slideAnim, { toValue: 1, duration });
  }, [slideAnim, animate]);

  const slideOut = useCallback((duration?: number) => {
    return animate(slideAnim, { toValue: 0, duration });
  }, [slideAnim, animate]);

  const rotate = useCallback((duration?: number) => {
    return animate(rotateAnim, { toValue: 1, duration });
  }, [rotateAnim, animate]);

  const resetRotate = useCallback((duration?: number) => {
    return animate(rotateAnim, { toValue: 0, duration });
  }, [rotateAnim, animate]);

  const createInterpolatedValue = useCallback(
    (animation: Animated.Value, inputRange: number[], outputRange: number[]) => {
      return animation.interpolate({
        inputRange,
        outputRange,
      });
    },
    []
  );

  const createSequence = useCallback((animations: Animated.CompositeAnimation[]) => {
    return Animated.sequence(animations);
  }, []);

  const createParallel = useCallback((animations: Animated.CompositeAnimation[]) => {
    return Animated.parallel(animations);
  }, []);

  const createStagger = useCallback(
    (animations: Animated.CompositeAnimation[], delay: number = 100) => {
      return Animated.stagger(delay, animations);
    },
    []
  );

  const createLoop = useCallback(
    (animation: Animated.CompositeAnimation, iterations: number = -1) => {
      return Animated.loop(animation, { iterations });
    },
    []
  );

  return {
    fadeAnim,
    scaleAnim,
    slideAnim,
    rotateAnim,
    fadeIn,
    fadeOut,
    scaleIn,
    scaleOut,
    slideIn,
    slideOut,
    rotate,
    resetRotate,
    createInterpolatedValue,
    createSequence,
    createParallel,
    createStagger,
    createLoop,
  };
}; 