import { Button, Flex } from "@radix-ui/themes";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from "@radix-ui/react-form";
import { Input, Textarea } from "./ui/Input";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

export default function FormPanel(props) {
  return (
    <Form className="mt-10">
      <FormField className="grid mb-4" name="name">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Nome do cliente
          </FormLabel>
          <FormMessage className="text-red-700" match="valueMissing">
            Por favor insira o nome do cliente
          </FormMessage>
        </Flex>
        <FormControl asChild>
          <Input required />
        </FormControl>
      </FormField>
      <FormField className="grid mb-4" name="price">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Valor
          </FormLabel>
          <FormMessage className="text-red-700" match="valueMissing">
            Por favor insira um valor válido (em reais)
          </FormMessage>
        </Flex>
        <FormControl asChild>
          <Input placeholder="Insira o valor" required type="number" />
        </FormControl>
      </FormField>
      <FormField className="grid mb-4" name="question">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Descrição
          </FormLabel>
        </Flex>
        <FormControl asChild>
          <Textarea
            className="resize-none"
            placeholder="Insira uma descrição (opcional)"
            required
          />
        </FormControl>
      </FormField>
      <FormSubmit asChild>
        <Button
          className="bg-violet-600 h-9 px-4 py-2 shadow hover:bg-primary/90"
          type="submit"
        >
          Criar QRCODE
        </Button>
      </FormSubmit>
    </Form>
  );
}
