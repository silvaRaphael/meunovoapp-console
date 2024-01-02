import { toast } from "components/ui/toast/use-toast";
import { Fragment } from "react";

export interface customError {
    error: {
        title: string;
        errors: { message: string; path?: string }[];
    };
    redirect?: string;
}

export function errorToast({ error }: customError) {
    const { title, errors } = error;

    return toast({
        title,
        description:
            !!errors &&
            errors.length &&
            errors?.map(({ message }: any, i: number) => (
                <Fragment key={i}>
                    {message}
                    <br />
                </Fragment>
            )),
        variant: "destructive",
    });
}
