const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  // Exercise 2.17: Dynamic styling based on the type prop
  const notificationStyle = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
