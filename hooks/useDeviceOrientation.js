import { useState, useEffect, useCallback } from 'react';

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt');

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionState('granted');
        } else {
          setPermissionState('denied');
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        setPermissionState('denied');
      }
    } else {
      // For browsers that don't require permission
      setPermissionState('granted');
    }
  }, []);

  useEffect(() => {
    if (permissionState === 'granted') {
      const handleOrientation = (event) => {
        console.log(event.alpha, event.beta, event.gamma);
        setOrientation({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
        });
      };

      window.addEventListener('deviceorientation', handleOrientation, true);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    } else if (permissionState === 'prompt' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      // Automatically grant permission if not required
      setPermissionState('granted');
    }
  }, [permissionState]);

  return { orientation, requestPermission, permissionState };
};