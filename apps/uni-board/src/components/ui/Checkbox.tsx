import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

type CheckboxProps = {
  checked: boolean | "indeterminate";
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

export function Checkbox({ checked, onCheckedChange, className }: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      checked={checked}
      onCheckedChange={(v) => onCheckedChange(v === true)}
      className={cn(
        "h-4 w-4 shrink-0 rounded border border-[var(--border)] bg-[var(--bg)] transition-colors",
        "data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)]",
        "data-[state=indeterminate]:bg-[var(--accent-bg)] data-[state=indeterminate]:border-[var(--accent)]",
        className
      )}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-white">
        <Check size={10} strokeWidth={3} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
