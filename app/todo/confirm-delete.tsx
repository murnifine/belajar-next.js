"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

type Props = {
  id: number;
  deleteTodo: (id: number) => Promise<void>;
};

export function ConfirmDelete({ id, deleteTodo }: Props) {
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <Button variant="ghost">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu benar-benar yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data todo
            secara permanen dari database kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Batal</AlertDialogAction>
          <AlertDialogCancel
            onClick={async () => {
              await deleteTodo(id);
              toast({
                title: "Data di hapus",
                description: "Data todo anda telah kami hapus",
              });
            }}
          >
            Lanjutkan
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
