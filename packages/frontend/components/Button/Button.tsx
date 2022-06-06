import {css} from "../../helpers/css";
import {PropsWithChildren} from "react";

const buttonStyles = css("p-2",  "bg-pixels-yellow-100", "text-black", "font-bold", "disabled:bg-pixels-yellow-300",
    "disabled:active:translate-x-0.5", "disabled:active:translate-y-0.5", "disabled:text-pixels-yellow-400", "disabled:cursor-not-allowed", "disabled:border-pixels-yellow-400"
)

interface ButtonProps {
  onClick?: () => void;
  block?: boolean;
  disabled?: boolean
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({onClick, block, children, disabled= false}) => {
  return <div className={css("relative", "inline-block", "z-10", "h-fit", {"w-full": block})}>
    <button disabled={disabled} onClick={onClick && onClick} className={css(buttonStyles, "active:translate-x-1", "active:translate-y-1", "border-2", "border-black", "border-solid", {"w-full": block})}>
      {children}
    </button>
    <div aria-disabled={disabled} className={css("absolute", "bg-black", "w-full", "h-full", {"bg-pixels-yellow-400": disabled})} style={{top: "6px", left: "6px", zIndex: -1}}/>
  </div>
}

export default Button