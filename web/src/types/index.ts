// Shape of a single news article based on data mapping
export interface FinhubNewsArticle {
  id: number;
  thumbnail: string;
  source: string;
  date: number; // Unix timestamp
  title: string;
  url: string;
}

export interface FinhubMarketNewsApiResponse {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

/**
 * Interface for the entire message object received from the
 * Finnhub WebSocket when the message type is 'news'.
 */
export interface FinnhubNewsMessage {
  data: FinhubMarketNewsApiResponse[]; // An array of news articles
  type: 'news'; // The message type discriminator
}

/**
 * Interface for the 'ping' message to keep the connection alive.
 */
export interface FinnhubPingMessage {
  type: 'ping';
}

// A Union Type representing any possible message from the WebSocket
export type FinnhubWebSocketMessage = FinnhubNewsMessage | FinnhubPingMessage;

// Potential error response
export interface FinhubError {
  error: string;
}
