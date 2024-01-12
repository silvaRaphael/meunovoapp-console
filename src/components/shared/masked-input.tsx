import InputMask from "react-input-mask";
import { Input } from "../ui/input";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string | (string | RegExp)[];
}

const MaskedInput = React.forwardRef<HTMLInputElement, InputProps>(({ mask, className, type, ...props }, ref) => {
  return (
    <InputMask mask={mask} maskChar={null} {...props}>
      {
        ((inputProps: any): React.ReactNode => {
          return <Input type={type} {...inputProps} className={className} ref={ref} />;
        }) as unknown as React.ReactNode
      }
    </InputMask>
  );
});

export { MaskedInput };
