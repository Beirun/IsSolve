import { create } from "zustand";

export const useNotification = create((set) => ({
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
    addNotification: async (notification)=>{
        console.log('notification', notification)
        try {
            const response = await fetch("http://localhost:3000/notification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    deleteNotification: async (notification_id) => {
        try {
            await fetch(`http://localhost:3000/notification/${notification_id}`, {
                method: "DELETE",
            });
            
        } catch (error) {
            console.error(error);
        }
    },
    getNotificationTime: async (notification) => {
        try {
            const response = await fetch(`http://localhost:3000/notification/gettime`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    addNotificationCommentReact: async (notification) => {
        try {
            const response = await fetch("http://localhost:3000/notification/commentreact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getNotificationCommentReactTime: async (notification) => {
        try {
            const response = await fetch(`http://localhost:3000/notification/commentreact/gettime`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    updateNotification: async (notification_id, notification) => {
        try {
            const response = await fetch(`http://localhost:3000/notification/${notification_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            });
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    updateNotificationCommentReact: async (notification_id, notification) => {
        try {
            const response = await fetch(`http://localhost:3000/notification/commentreact/${notification_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notification),
            });
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getCitizenNotifications: async (ctzn_id) => {
        try {
            const response = await fetch(`http://localhost:3000/notification/citizen/${ctzn_id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    deleteReactNotification: async (rprt_id, ctzn_id, reactor_id) => {
        try {
            await fetch(`http://localhost:3000/notification/report/${rprt_id}/citizen/${ctzn_id}/reactor/${reactor_id}`, {
                method: "DELETE",
            });
            
        } catch (error) {
            console.error(error);
        }
    }
}));