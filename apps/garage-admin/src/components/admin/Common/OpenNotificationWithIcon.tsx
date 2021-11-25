import { notification } from 'antd';

const openNotificationWithIcon = (
  type: 'success' | 'info' | 'warning' | 'error',
  title: string,
  message: string,
) => {
  notification[type]({
    message: title,
    description: message,
    placement: 'topLeft',
  });
};

export default openNotificationWithIcon;
