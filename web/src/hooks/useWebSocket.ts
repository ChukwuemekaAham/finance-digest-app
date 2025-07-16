// src/hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';
import { useLiveNewsStore } from '@/store/liveNewsStore';
import { FinnhubWebSocketMessage, FinhubNewsArticle } from '@/types';

// The symbols to subscribe to. You could make this dynamic via props.
const symbolsToSubscribe = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'TSLA'];

export function useWebSocket() {
  const { addLiveArticles, setConnectionStatus, clearLiveArticles } =
    useLiveNewsStore();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

    if (!API_KEY) {
      console.error('Finnhub API Key not found for WebSocket.');
      setConnectionStatus('error');
      return;
    }

    // Connect only if there isn't an active connection
    if (!socketRef.current) {
      console.log('WebSocket: Initializing connection...');
      setConnectionStatus('connecting');

      const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);
      socketRef.current = socket;

      // === The 'open' event listener is the ONLY place to send initial messages ===
      socket.addEventListener('open', (event) => {
        console.log('WebSocket: Connection opened. Subscribing to symbols...');
        setConnectionStatus('open');

        // Subscribe to news for the specified symbols *after* connection is open
        symbolsToSubscribe.forEach((symbol) => {
          // Check again if socket is still open before sending
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({ type: 'subscribe-news', symbol: symbol })
            );
            console.log(`WebSocket: Sent subscription request for ${symbol}`);
          }
        });
      });

      socket.addEventListener('message', (event) => {
        try {
          const message: FinnhubWebSocketMessage = JSON.parse(event.data);
          if (message.type === 'news' && Array.isArray(message.data)) {
            // Data mapping to ensure it matches our NewsArticle type
            const newArticles = message.data
              .map((item) => ({
                id: item.id,
                thumbnail: item.image,
                source: item.source,
                date: item.datetime,
                title: item.headline,
                url: item.url,
              }))
              .filter((article) => article.thumbnail); // Filter out articles with no image

            if (newArticles.length > 0) {
              addLiveArticles(newArticles);
            }
          } else if (message.type === 'ping') {
            // Finnhub sends ping messages to keep the connection alive
            // console.log("WebSocket: Ping received."); // This can be noisy, optional log
          }
        } catch (e) {
          console.error('WebSocket: Error parsing message data', e);
        }
      });

      socket.addEventListener('error', (event) => {
        console.error('WebSocket: An error occurred', event);
        setConnectionStatus('error');
      });

      socket.addEventListener('close', (event) => {
        console.log('WebSocket: Connection closed.', event);
        setConnectionStatus('closed');
        socketRef.current = null; // Clear the ref on close
      });
    }

    // --- Cleanup function ---
    return () => {
      // Check if the ref holds a socket instance when component unmounts
      if (socketRef.current) {
        console.log('WebSocket: Cleaning up connection.');
        // Unsubscribe from all symbols before closing
        symbolsToSubscribe.forEach((symbol) => {
          // Only send if connection is still open
          if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current?.send(
              JSON.stringify({ type: 'unsubscribe-news', symbol: symbol })
            );
            console.log(`WebSocket: Sent unsubscribe request for ${symbol}`);
          }
        });
        socketRef.current.close();
        clearLiveArticles(); // Clear the articles from the store
      }
    };
    // Ensure dependencies are correct. Actions from Zustand are stable.
  }, [addLiveArticles, setConnectionStatus, clearLiveArticles]);
}
