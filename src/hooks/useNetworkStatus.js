import { useState, useEffect } from 'react';
import { notification } from 'antd';

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      notification.success({
        message: 'Network Status',
        description: 'You are online! Please refresh the page.',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      notification.error({
        message: 'Network Status',
        description: 'You are offline! Please check your internet connection.',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useNetworkStatus;
