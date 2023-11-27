import { toast } from "components/ui/toast/use-toast";
import { Fragment } from "react";

export function errorToast(error: any) {
    return toast({
        title: "Ocorreu algum erro!",
        description:
            error.length &&
            error.map(({ message }: any, i: number) => (
                <Fragment key={i}>
                    {message}
                    <br />
                </Fragment>
            )),
        variant: "destructive",
    });
}
