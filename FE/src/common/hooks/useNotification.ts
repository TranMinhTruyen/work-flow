import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

export interface INotificationRequest {
  userId: string;
  title: string;
  message: string;
}

const useNotification = () => {
  const [notifications, setNotifications] = useState<Map<string, any>>(new Map());
  const [notificationsSize, setNotificationsSize] = useState<number>(0);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // Websocket url
      onConnect: () => {
        // Receive message from server
        stompClient.subscribe('/user/00001/check-notification', msg => {
          const newNotification = JSON.parse(msg.body);
          setNotifications(prevNotifications => {
            const newNotifications = new Map(prevNotifications);
            newNotifications.set(newNotification.id, newNotification.message);
            return newNotifications;
          });
          setNotificationsSize(prev => prev + notifications.size);
        });
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Init websocket connection
    stompClient.activate();
    setClient(stompClient);

    // Close websocket when unmount component
    return () => {
      stompClient.deactivate();
      setNotifications(new Map<string, any>());
      setClient(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendNotification = useCallback(
    (comment: INotificationRequest) => {
      if (client && client.connected) {
        client.publish({
          destination: '/work-flow/create',
          body: JSON.stringify(comment),
        });
      }
    },
    [client]
  );

  return {
    notifications,
    notificationsSize,
    sendNotification,
  };
};

export default useNotification;
