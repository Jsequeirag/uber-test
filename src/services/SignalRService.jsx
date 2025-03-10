import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://ampm-orbitas-be.azurewebsites.net/UberAstro", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

const startConnection = async () => {
  try {
    await hubConnection.start();
    return { connectionError: false };
  } catch (err) {
    console.error("Error while establishing SignalR connection:", err);
    console.error("SignalR connection state:", hubConnection.state);
    return { connectionError: true };
  }
};

const onReceiveOrders = (callback) => {
  hubConnection.on("ReceiveOrders", (message) => {
    callback(message);
  });
};

const offReceiveOrders = () => {
  hubConnection.off("ReceiveOrders");
};

const offReceiveStatusUpdate = () => {
  hubConnection.off("ReceiveStatusUpdate");
};

const onReceiveErrors = (callback) => {
  hubConnection.on("ReceiveErrors", (message) => {
    callback(message);
  });
};

const onReceiveErrorUpdate = (callback) => {
  hubConnection.on("ReceiveErrorUpdate", (message) => {
    callback(message);
  });
};

const onReceiveStatusUpdate = (callback) => {
  hubConnection.on("ReceiveStatusUpdate", (message) => {
    callback(message);
  });
};

const requestOrders = async () => {
  try {
    await hubConnection.invoke("RequestOrders", "request");
    console.log("SignalR Method Invoked");
  } catch (err) {
    console.error("SignalR Invocation Error: ", err);
    throw err; // Re-throw the error to propagate it to the caller if needed
  }
};

const requestErrors = async () => {
  try {
    await hubConnection.invoke("RequestErrors", "request");
    console.log("Request errors method invoked");
  } catch (err) {
    console.error("SignalR Invocation Error: ", err);
    throw err;
  }
};

const requestOrderCancellation = async (data) => {
  await hubConnection.invoke("RequestOrderCancellation", data);
};

const requestNewDelivery = async (data) => {
  await hubConnection.invoke("RequestNewDelivery", data);
};

const requestMarkErrorAsSolved = async (data) => {
  await hubConnection.invoke("RequestMarkErrorAsSolved", data);
};

export {
  startConnection,
  onReceiveOrders,
  onReceiveStatusUpdate,
  requestOrders,
  requestOrderCancellation,
  requestNewDelivery,
  onReceiveErrors,
  onReceiveErrorUpdate,
  requestErrors,
  requestMarkErrorAsSolved,
  offReceiveOrders,
  offReceiveStatusUpdate,
};
