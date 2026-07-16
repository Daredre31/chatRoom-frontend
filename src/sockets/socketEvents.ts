// event names as constants so nothing gets typo'd across the app
export const SOCKET_EVENTS = {
  ROOM_JOIN: "room:join",
  MESSAGE_SEND: "message:send",
  MESSAGE_NEW: "message:new",
  CONNECT_ERROR: "connect_error",
} as const;