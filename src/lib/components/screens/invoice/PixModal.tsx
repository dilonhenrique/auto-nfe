import { copyToClipboard } from "@/utils/copyToClipboard";
import {
  addToast,
  Button,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@abstrato/hero-ui";
import Confetti from "react-confetti-boom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PIX_CODE =
  "00020101021126330014br.gov.bcb.pix0111009553790245204000053039865802BR5918DILON H S DA SILVA6008GRAVATAI62070503***63048AE3";

export default function PixModal({ ...props }: Props) {
  async function copyPixCode() {
    const success = await copyToClipboard(PIX_CODE);

    if (success) {
      addToast({
        title: "Código Pix copiado!",
        color: "success",
      });
    } else {
      addToast({
        title: "Erro ao copiar código Pix",
        color: "danger",
      });
    }
  }

  return (
    <>
      <Modal {...props}>
        <ModalContent>
          <ModalHeader>Obrigado, amigo, vc é um amigo.</ModalHeader>

          <ModalBody className="border-b pb-6">
            <p className="pb-4">
              Todo valor arrecadado será convertido em café que servirá de
              combustível para melhorar ainda mais esse projeto. Muito obrigado!
            </p>

            <Image
              src="/pix.png"
              alt="Qr code do Pix"
              shadow="none"
              radius="none"
              classNames={{
                wrapper: "mx-auto",
                img: "max-w-60 outline outline-background -outline-offset-1",
              }}
            />

            <Button
              variant="bordered"
              radius="md"
              endContent={<Icon icon="copy" size="sm" />}
              className="justify-start"
              onPress={copyPixCode}
            >
              <span className="truncate text-foreground-500">{PIX_CODE}</span>
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button
              startContent={<Icon icon="rocket" size="sm" />}
              onPress={props.onClose}
              color="primary"
            >
              Tamo junto
            </Button>
          </ModalFooter>
        </ModalContent>

        {props.isOpen && (
          <div className="fixed top-0 bottom-0 right-0 left-0 overflow-hidden z-50 pointer-events-none">
            <Confetti
              particleCount={120}
              shapeSize={20}
              launchSpeed={2.5}
              spreadDeg={100}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
