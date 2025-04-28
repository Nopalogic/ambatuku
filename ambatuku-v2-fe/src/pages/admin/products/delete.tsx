import { useNavigate } from "@tanstack/react-router";

import { useState } from "react";

import { deleteProduct } from "@/services/product";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductDelete({ id }: { id: string | number | any }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(id);
      if (response.success) {
        toast({
          title: "Delete product successfully!",
        });
        setOpen(false);
        navigate({ to: "/admin/products" });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Submission failed",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='mt-6 text-destructive hover:bg-destructive hover:text-foreground'
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e: any) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='default' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='outline'
            className='border border-destructive text-destructive hover:bg-destructive'
            onClick={handleDelete}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
