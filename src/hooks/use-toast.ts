
// Re-exporting the toast component and hook from radix ui toast
import { useToast as useRadixToast } from "@/components/ui/toast"
import { toast as radixToast } from "@/components/ui/toast"

export const useToast = useRadixToast
export const toast = radixToast
