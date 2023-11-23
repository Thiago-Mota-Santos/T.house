import { type } from "node:os";
import { Button, Flex } from "@radix-ui/themes";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from "@radix-ui/react-form";
// import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { Account } from "../context/AccountFormContext";
import { Input, Textarea } from "./ui/Input";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

interface FormInterface {
  handleSubmit: () => Promise<void>;
  data: Account;
  userId?: string;
}

export default function FormPanel({ handleSubmit, data }: FormInterface) {
  const [info, setInfo] = useState({
    clientName: "",
    pixKey: "",
    value: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  return (
    <Form className="mt-10" onSubmit={handleSubmit}>
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
          <Input
            name="clientName"
            onChange={handleChange}
            required
            value={info.clientName}
          />
        </FormControl>
      </FormField>
      <FormField className="grid mb-4" name="qrcode">
        <Flex align="baseline" display="flex" justify="between">
          <FormLabel className="text-base font-medium text-black">
            Chave Pix
          </FormLabel>
          <FormMessage className="text-red-700" match="valueMissing">
            Por favor insira a chave pix
          </FormMessage>
        </Flex>
        <FormControl asChild>
          <Input
            name="pixKey"
            onChange={handleChange}
            placeholder="Chave Pix"
            required
            value={info.pixKey}
          />
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
          <Input
            name="value"
            onChange={handleChange}
            placeholder="Insira o valor"
            required
            type="number"
            value={info.value}
          />
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
            name="description"
            onChange={handleChange}
            placeholder="Insira uma descrição (opcional)"
            value={info.description}
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