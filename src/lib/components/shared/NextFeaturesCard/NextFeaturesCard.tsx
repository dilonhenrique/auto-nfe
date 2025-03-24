import { Card, CardBody, CardHeader, Checkbox } from "@abstrato/hero-ui";

export default function NextFeaturesCard() {
  return (
    <Card fullWidth className="max-w-md">
      <CardHeader className="px-6 pt-6 pb-2">
        <h3 className="text-foreground-600">Próximas features:</h3>
      </CardHeader>

      <CardBody className="px-6 pb-8 gap-2">
        <Checkbox isReadOnly isSelected color="success" radius="full">
          Emissão manual das Notas
        </Checkbox>
        <Checkbox isReadOnly color="success" radius="full">Envio por e-mail para financeiro</Checkbox>
        <Checkbox isReadOnly color="success" radius="full">Configuração de valores padrão</Checkbox>
        <Checkbox isReadOnly color="success" radius="full">Agendamento de Emissão automática</Checkbox>
      </CardBody>
    </Card>
  );
}
