import { cn } from "../../lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md";
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        size === "md" && "h-9 px-4 text-sm",
        size === "sm" && "h-7 px-3 text-xs",
        variant === "default" && "bg-[var(--accent)] text-white hover:opacity-90",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
        variant === "ghost" && "hover:bg-[var(--accent-bg)] text-[var(--text)]",
        variant === "outline" &&
          "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--code-bg)]",
        className
      )}
      {...props}
    />
  );
}
