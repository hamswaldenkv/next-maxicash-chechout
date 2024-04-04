"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Reply, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    reference: string;
  };
  searchParams: {
    reference: string;
    status: string;
    Method: string;
  };
};

export default function Page({ params, searchParams }: Props) {
  //const searchParams = useSearchParams();
  const router = useRouter();

  // const reference = searchParams.get("reference");
  const { reference, status, Method } = searchParams;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="border shadow-sm min-w-[20rem] min-h-[40rem] bg-white p-12 flex flex-col justify-between items-center">
        <div className="space-y-5">
          <div className="w-20 h-20 rounded-full bg-green-500/50 text-green-500 flex items-center justify-center self-center">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="font-bold text-4xl">Votre paiement a réussi</h1>
          <hr />
          <div className="divide-y">
            <div className="flex justify-between py-3">
              <span>Référence du paiement</span>
              <span>{reference}</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Status du paiement</span>
              <span>{status}</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Méthode du paiement</span>
              <span>{Method}</span>
            </div>
          </div>
        </div>

        <Button
          size={"lg"}
          variant={"default"}
          className="w-full"
          onClick={() => router.push("/")}
        >
          <Reply className="w-4 h-4 mr-2" />
          <span>Retourner à l&apos;accueil</span>
        </Button>
      </div>
    </div>
  );
}
