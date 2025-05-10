import { Button } from "@/components/ui/button";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";

interface FormDateElementProps {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
  description?: string;
  placeholder?: string;
  itemClassName?: string;
  buttonClassName?: string;
}

export default function FormDateElement({
  control,
  name,
  label,
  description,
  placeholder,
  itemClassName,
  disabled = false,
  buttonClassName,
}: FormDateElementProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => {
        return (
          <FormItem className={itemClassName}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal pointer-events-auto",
                      !field.value && "text-muted-foreground",
                      buttonClassName
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP", { locale: ptBR })
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="single"
                  locale={ptBR}
                  disabled={disabled}
                  selected={field.value}
                  onSelect={field.onChange}
                  className="bg-black border border-gray-700 rounded-2xl"
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
