import { createClient } from "@/utils/supabase/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";


const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCES_TOKEN! });

export async function POST(req: NextRequest) {

  const supabase = createClient();
  const body = await req.json().then((data) => data as { data: { id: string } });
  const secret = req.headers.get('x-signature-id');

  // if (secret !== process.env.SECRET) return Response.json({ success: false, code: 401 })
  console.log('body:', body);

  const payment = await new Payment(mercadopago).get({ id: body.data.id })

  console.log("payment response:", payment)
  const payment_info = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description,
    payer_info: payment.payer
  }

  const result = await supabase.from('payments').insert(payment_info)
  console.log(result);


  return Response.json({ success: true })
}

export async function GET() {

}
