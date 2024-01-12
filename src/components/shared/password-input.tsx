import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  passwordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ passwordVisible, setPasswordVisible, ...props }, ref) => {
    return (
      <div className="flex space-x-2 relative">
        <Input
          type={!passwordVisible ? "password" : "text"}
          placeholder={props.placeholder ?? "Sua senha"}
          maxLength={20}
          className="pe-10"
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="hover:bg-transparent absolute right-0.5 top-1/2 -translate-y-1/2"
        >
          {!passwordVisible ? <Eye size={14} /> : <EyeOff size={14} />}
        </Button>
      </div>
    );
  },
);
Input.displayName = "PasswordInput";

export { PasswordInput };
