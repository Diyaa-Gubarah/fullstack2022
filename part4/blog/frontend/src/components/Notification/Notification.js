import "./Notification.css";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const classes = ["notification", type];
  return <div className={classes.join(" ")}>{message}</div>;
};


export default Notification;