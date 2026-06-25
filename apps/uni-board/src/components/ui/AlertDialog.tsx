import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";

type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  onConfirm,
}: AlertDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-xl">
          <Dialog.Title className="text-base font-semibold text-[var(--text-h)] mb-2">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-[var(--text)] mb-6">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
