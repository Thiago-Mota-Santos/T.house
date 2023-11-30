import { Box, Button, Card, Text } from "@radix-ui/themes";
import { FileTextIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function qrCode() {
  const value = "R$ 16.50";
  const desc = "long description about the product";

  return (
    <div className="flex items-center justify-center h-screen">
      <Box className="flex items-center justify-center flex-col w-[484px] h-[660px] border border-gray-400 rounded-3xl">
        <Text align="center" size="6" weight="bold">
          QRCODE
        </Text>

        <Box className="mt-2">
          <div className="flex justify-between">
            <Text>VALOR TOTAL</Text> <Text as="span">{value}</Text>
          </div>
          <Text>DESCRIÇÃO: </Text> <Text as="span">{desc}</Text>
        </Box>

        <Card mt="4" size="4">
          <Image
            alt="QRCODE"
            height={300}
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
            width={300}
          />
        </Card>
        <Button color="purple" mt="5" radius="large">
          Adicione outro QRCODE
        </Button>
        <Button color="gray" mt="5" radius="large">
          <FileTextIcon /> Imprimir
        </Button>
      </Box>
    </div>
  );
}
