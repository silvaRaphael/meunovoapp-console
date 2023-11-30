import { ArrowRightCircle, CheckCircle2, Circle, XCircle } from "lucide-react";

export type Status = "waiting" | "in progress" | "completed" | "cancelled";

export const statuses: Status[] = ["waiting", "in progress", "completed", "cancelled"];

export const statusesIcons = {
    waiting: <Circle size={16} className="text-muted-foreground" />,
    "in progress": <ArrowRightCircle size={16} className="text-muted-foreground" />,
    completed: <CheckCircle2 size={16} className="text-green-400" />,
    cancelled: <XCircle size={16} className="text-red-600" />,
};

export const statusesColors = {
    waiting: "",
    "in progress": "",
    completed: "text-green-400",
    cancelled: "text-red-600",
};
