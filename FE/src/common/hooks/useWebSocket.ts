import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const URL = import.meta.env.VITE_SERVER_URL;

export type UseWebSocketProps = {
  receiveUrl: string;
  sendUrl?: string;
};

export type UseWebSocketReturn<T, P> = {
  receiveData?: T;
  sendMessage: (message: P) => void;
};

const useWebSocket = <T = any, P = any>(props: UseWebSocketProps): UseWebSocketReturn<T, P> => {
  const { receiveUrl, sendUrl } = props;
  const [receiveData, setReceiveData] = useState<T | undefined>();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(`${URL}/ws`), // Websocket url
      onConnect: () => {
        // Receive message from server
        stompClient.subscribe(receiveUrl, message => {
          const receive = JSON.parse(message.body);
          setReceiveData(receive);
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
      setClient(null);
    };
  }, [receiveUrl]);

  const sendMessage = useCallback(
    (message: P) => {
      if (client) {
        if (sendUrl) {
          client.publish({
            destination: sendUrl,
            body: JSON.stringify(message),
          });
        }
      }
    },
    [client, sendUrl]
  );

  return {
    receiveData,
    sendMessage,
  };
};

export default useWebSocket;
