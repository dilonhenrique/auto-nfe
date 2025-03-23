"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import PageContainer from "../../ui/PageContainer/PageContainer";
import { InvoiceUser } from "@/types/invoice";
import InvoiceLoginForm from "./InvoiceLoginForm";
import InvoiceEmitForm from "./InvoiceEmitForm";
import { AnimatePresence, motion } from "framer-motion";

export default function InvoiceEmitScreen() {
  const session = useSession({ required: true });
  const user = session.data?.user;

  const [loggedUser, setLoggedUser] = useState<InvoiceUser>();

  if (!user) return <></>;

  return (
    <PageContainer>
      <h1>Olá, {user?.name?.split(" ")[0]}!</h1>

      <AnimatePresence initial={false} mode="popLayout">
        {!loggedUser && (
          <motion.div
            key="login-form"
            className="max-w-xl w-full"
            initial={{ opacity: 0, x: "5rem" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-5rem" }}
          >
            <InvoiceLoginForm user={user} setLoggedUser={setLoggedUser} />
          </motion.div>
        )}

        {loggedUser && (
          <motion.div
            key="emit-form"
            className="max-w-xl w-full"
            initial={{ opacity: 0, x: "5rem" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-5rem" }}
          >
            <InvoiceEmitForm loggedUser={loggedUser} className="max-w-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
