import React, { createContext, useContext, useState, ReactNode } from "react";
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiXCircle } from "react-icons/fi";
import "./index.css";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

type NotificationContextType = {
  addNotification: (message: string, type: Notification["type"]) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification["type"]) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 5000);
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="icon success" />;
      case "error":
        return <FiXCircle className="icon error" />;
      case "info":
        return <FiInfo className="icon info" />;
      case "warning":
        return <FiAlertTriangle className="icon warning" />;
      default:
        return null;
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            {getIcon(notification.type)}
            <span className="message">{notification.message}</span>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
