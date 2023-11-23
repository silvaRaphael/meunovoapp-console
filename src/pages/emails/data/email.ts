export interface Email {
    id: string;
    bcc?: string | string[];
    cc?: string;
    created_at: Date;
    from: string;
    to: string | string[];
    subject: string;
    html: string;
}
