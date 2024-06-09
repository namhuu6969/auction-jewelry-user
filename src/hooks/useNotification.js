import { notification } from 'antd';

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({ type, description }) => {
    api[type]({
      message: description,
      placement: 'top',
      duration: 5,
    });
  };

  return { openNotification, contextHolder };
};
