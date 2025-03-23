"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import PageContainer from "../../ui/PageContainer/PageContainer";
import { InvoiceUser } from "@/types/invoice";
import InvoiceLoginForm from "./InvoiceLoginForm";
import InvoiceEmitForm from "./InvoiceEmitForm";
import { AnimatePresence, motion } from "framer-motion";
import NextFeaturesCard from "../../shared/NextFeaturesCard/NextFeaturesCard";
import SuccessModal from "./SuccessModal";

type InvoiceResume = Record<string, string>[];

export default function InvoiceEmitScreen() {
  const session = useSession({ required: true });
  const user = session.data?.user;

  const [loggedUser, setLoggedUser] = useState<InvoiceUser>();
  const [resume, setResume] = useState<InvoiceResume>();

  if (!user) return <></>;

  return (
    <>
      <PageContainer>
        <h1>Olá, {user?.name?.split(" ")[0]}!</h1>

        <div className="flex flex-row flex-wrap items-start gap-8 w-full">
          <AnimatePresence initial={false} mode="popLayout">
            {!resume && !loggedUser && (
              <motion.div
                key="login-form"
                className="max-w-xl w-full"
                initial={{ opacity: 0, x: "5rem" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-5rem" }}
              >
                <InvoiceLoginForm user={user} onSuccess={setLoggedUser} />
              </motion.div>
            )}

            {!resume && loggedUser && (
              <motion.div
                key="emit-form"
                className="max-w-xl w-full"
                initial={{ opacity: 0, x: "5rem" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-5rem" }}
              >
                <InvoiceEmitForm
                  loggedUser={loggedUser}
                  onSuccess={(data) => setResume(data.resume)}
                />
              </motion.div>
            )}

            {resume && (
              <motion.div
                key="success"
                className="max-w-xl w-full"
                initial={{ opacity: 0, x: "5rem" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-5rem" }}
              >
                <h3 className="mb-2">Nota fiscal emitida! 🚀</h3>

                {resume.map((section, index) => (
                  <ul key={index} className="py-2">
                    {Object.entries(section).map(([key, val]) => (
                      <li key={key}>
                        <span className="font-bold">{key}:</span> {val}
                      </li>
                    ))}
                  </ul>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <NextFeaturesCard />
        </div>
      </PageContainer>

      {!!resume && <SuccessModal defaultOpen />}
    </>
  );
}
