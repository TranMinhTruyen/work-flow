import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

import { SERVER_URL } from '../constants/commonConst';

export type UseWebSocketProps<T> = {
  receiveUrl: string;
  sendUrl?: string;
  onSubscribe: (data: T) => void;
};

export type UseWebSocketReturn<P> = {
  sendMessage: (message: P) => void;
};

const useWebSocket = <T = any, P = any>(props: UseWebSocketProps<T>): UseWebSocketReturn<P> => {
  const { receiveUrl, sendUrl, onSubscribe } = props;
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(`${SERVER_URL}/ws`),
      onConnect: () => {
        // Receive message from server
        stompClient.subscribe(receiveUrl, message => {
          const receive: T = JSON.parse(message.body);
          onSubscribe(receive);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    sendMessage,
  };
};

export default useWebSocket;
