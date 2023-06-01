"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import { useState, useTransition } from "react";

type Props = {
  updateTodo: (id: number, newTitle: string) => Promise<void>;
  id: number;
  title: string;
};

export function UpdateTodo({ updateTodo, id, title }: Props) {
  const [newTitle, setnewTitle] = useState(title);
  const { toast } = useToast();
  // dialog
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}

        <Button variant={"ghost"}>
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Ubah todo kamu. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col py-3">
          <Input
            value={newTitle}
            onChange={(e) => setnewTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={async () => {
                await updateTodo(id, newTitle);
                toast({
                  title: "Data di diperbarui",
                  description: "Data todo anda telah kami perbarui",
                });
              }}
            >
              Simpan Perubahan
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
