import { AlertCircle, FileWarning, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDataEmpty() {
  return (
    <Alert
      variant="destructive"
      className="mt-10
    "
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Tidak ada Data</AlertTitle>
      {/* <AlertDescription>Sepertinya </AlertDescription> */}
    </Alert>
  );
}
