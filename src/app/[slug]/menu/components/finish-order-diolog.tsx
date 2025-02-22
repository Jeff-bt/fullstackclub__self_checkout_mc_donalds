"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PatternFormat } from "react-number-format";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { z } from "zod";
import { isValidCpf } from "../helpers/cpf";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1)
    .refine((cpf) => isValidCpf(cpf), {
      message: "CPF inválido",
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;
interface FinishOrderDiologProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const FinishOrderDiolog = ({ open, onOpenChange }: FinishOrderDiologProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });
  const onSubmit = (data: FormSchemaType) => {};

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar os eu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <PatternFormat
                      placeholder="Digite seu CPF..."
                      format="###.###.###-##"
                      customInput={Input}
                      {...field}
                    ></PatternFormat>
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDiolog;
