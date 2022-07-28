const Notification = ({messageObj=null}) => {
  if (messageObj === null) {
    return null;
  }

  return <div className={messageObj.className}>{messageObj.message}</div>;
};

export default Notification;
