import {
  addToast,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@abstrato/hero-ui";
import PixModal from "./PixModal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ ...props }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Modal {...props}>
        <ModalContent>
          <ModalHeader>Nota Fiscal emitida! 👌</ModalHeader>

          <ModalBody className="border-b pb-6">
            {/* <p>
            Sua nota fiscal foi emitida com sucesso! Confira os dados abaixo:
          </p> */}
            <p>
              Ajudei você a ganhar dinheiro e economizar tempo, que acha de me
              ajudar a manter esse projeto de pé?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              startContent={<Icon icon="coffee" size="sm" />}
              onPress={() => {
                addToast({
                  title: "Te aguardo ansiosamente...",
                  color: "warning",
                  timeout: 10000,
                  icon: (
                    <span>
                      <Icon
                        icon="coffee"
                        variant="duotone"
                        className="!fill-none"
                      />
                    </span>
                  ),
                });
              }}
            >
              Buscar um café
            </Button>
            <Button
              color="primary"
              startContent={<Icon icon="dollar" size="sm" />}
              onPress={() => {
                props.onClose();
                setOpen(true);
              }}
            >
              Pagar um café
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <PixModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
}
