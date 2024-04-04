"use server";

export const createSession = async (data: Record<string, any>) => {
  console.log("createSession [data]", data);

  try {
    const paymentRef = "PAY_" + new Date().getTime();
    const checkoutUrl = process.env.MAXICASH_API_URL as string;
    const checkoutParams = {
      Reference: paymentRef,
      PayType: "MaxiCash",
      Language: "EN",
      Currency: data.currency,
      Amount: data.amount * 100,
      MerchantID: process.env.MAXICASH_APP_ID,
      MerchantPassword: process.env.MAXICASH_APP_PWD,
      declineurl: `${process.env.NEXT_PUBLIC_APP_URL}/failed?handle=decline`,
      cancelurl: `${process.env.NEXT_PUBLIC_APP_URL}/failed?handle=cancel`,
      accepturl: `${process.env.NEXT_PUBLIC_APP_URL}/accepted?handle=accept`,
      // notifyurl: `${process.env.NEXT_PUBLIC_APP_URL}/api/maxicash_checkout_callback?checkout_session_id=${paymentRef}`,
      notifyurl: `https://webhook.site/6fc5fe3a-0e5f-48e2-b872-1747b311ccec?checkout_session_id=${paymentRef}`,
    };

    /** const checkoutSession = await db.checkoutSession.create({
      data: {
        reference: paymentRef,
        type: "maxicash",
        status: "created",
        amount: Number(data.amount || 1),
        currency: data.currency,
        metadata: JSON.stringify({}),
        api_request: JSON.stringify(checkoutParams),
        created_at: new Date().getTime() / 1000,
      },
    }); */

    return {
      session: {
        url: checkoutUrl,
        params: checkoutParams,
      },
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
