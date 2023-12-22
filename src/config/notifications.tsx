import { ArrowRightCircle, CheckCircle2, Circle, AlertCircle } from "lucide-react";

export type NotificationType = "pending" | "error" | "started" | "done";

export const notificationsIcons = {
    pending: <Circle size={16} />,
    started: <ArrowRightCircle size={16} />,
    done: <CheckCircle2 size={16} />,
    error: <AlertCircle size={16} />,
};

export interface Notification {
    id: string;
    user_id: string;
    type: NotificationType;
    title: string;
    description?: string;
    link?: string;
    read: boolean;
    created_at?: Date;
}
