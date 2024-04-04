"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Calculator, Loader2, Receipt, ShieldAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { moneyFormat, redirectByPost } from "@/lib/helpers";
import { createSession } from "@/actions/checkout-session";

const formSchema = z.object({
  amount: z.number().min(1, {
    message: "Le montant doit être supérieur à 1",
  }),
  currency: z.string().min(2, {
    message: "Vous devrez choisir au moins une dévise",
  }),
});

const CheckoutForm = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("CDF");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { currency: "CDF" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("onSubmit [values]", values);

    startTransition(() => {
      createSession(values)
        .then((result) => {
          const { session, error } = result;

          if (session) {
            redirectByPost(session.url, session.params, false);
          } else if (error) {
            toast({
              title: "Echec",
              description: error,
              variant: "destructive",
            });
          } else {
            throw new Error("Error occured");
          }
        })
        .catch((err: any) => {
          toast({
            title: "Echec",
            description: err.message,
            variant: "destructive",
          });
        });
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center">
      <div className="hidden md:flex md:w-1/2 min-h-screen bg-primary/80"></div>
      <div className="w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center">
        <Image
          src={"/img/logo-org.png"}
          alt="logo"
          width={160}
          height={40}
          className="mb-5"
        />

        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="border shadow-sm w-[90%] md:w-[80%] xl:w-[60%] min-h-[40rem] bg-white p-12 flex flex-col justify-between items-center"
          >
            <div>
              <h1 className="font-bold text-4xl md:text-6xl">
                {moneyFormat(amount, currency)}
              </h1>

              <div className="my-10">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        defaultValue={field.value || "CDF"}
                        onValueChange={(value) => {
                          setAmount(0);
                          setCurrency(value);
                          field.onChange(value);
                          form.setValue("amount", 0);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="md:w-[280px]">
                            <SelectValue placeholder="Sélectionner une dévise" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CDF">Payer en CDF</SelectItem>
                          <SelectItem value="USD">Payer en USD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choisissez ou entrez un montant</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "$ 5,00", price: 5, currency: "USD" },
                          { label: "$ 10,00", price: 10, currency: "USD" },
                          { label: "$ 20,00", price: 20, currency: "USD" },
                          { label: "$ 100,00", price: 50, currency: "USD" },
                          { label: "$ 100,00", price: 100, currency: "USD" },
                          { label: "F 500,00", price: 500, currency: "CDF" },
                          { label: "F 1000,00", price: 1000, currency: "CDF" },
                          { label: "F 2500,00", price: 2500, currency: "CDF" },
                          { label: "F 5000,00", price: 5000, currency: "CDF" },
                          {
                            label: "F 10.000,00",
                            price: 10000,
                            currency: "CDF",
                          },
                        ]
                          .filter((e) => e.currency === currency)
                          .map((item, x) => (
                            <Button
                              key={x}
                              type="button"
                              variant={"outline"}
                              onClick={() => {
                                setAmount(item.price);
                                field.onChange(item.price);
                              }}
                            >
                              <Receipt className="w-4 h-4 mr-2 text-gray-600" />
                              <span>{item.label}</span>
                            </Button>
                          ))}

                        <div className="flex items-center">
                          <Input
                            {...field}
                            placeholder="Entrer un montant"
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                              setAmount(Number(e.target.value));
                            }}
                          />
                          <Calculator className="ml-2" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-5">
              <Button
                size={"lg"}
                type="submit"
                variant={"default"}
                className="w-full"
                disabled={amount === 0 || isPending}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <ShieldAlert className="w-4 h-4 mr-2" />
                )}

                <span>Effectuer le paiement</span>
              </Button>

              <p className="text-sm text-gray-500">
                En poursuivant, vous acceptez les Conditions Générales de
                Fortuna Software & Training. Veuillez lire la politique de
                remboursement ici
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutForm;
