import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "./ui/dialog";
  
  interface ModalProps {
    className?: string;
    description?: string;
    title?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    footer?: React.ReactNode;
    children?: React.ReactNode;
  }
  const Modal = ({
    className,
    open,
    setOpen,
    description,
    title,
    footer,
    children,
  }: ModalProps) => {
    return (
      <Dialog open={open} onOpenChange={(open:boolean) => setOpen(open)}>
        <DialogContent className={` bg-slate-100 dark:bg-slate-800 ${className}`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Modal;
  