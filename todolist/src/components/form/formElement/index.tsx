import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormElementProps {
  control: any;
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  itemClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export default function FormElement({
  control,
  name,
  label,
  description,
  placeholder,
  itemClassName,
  inputClassName,
  disabled,
}: FormElementProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => {
        return (
          <FormItem className={itemClassName}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl defaultValue={field.value}>
              <Input
                disabled={disabled}
                className={inputClassName}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
