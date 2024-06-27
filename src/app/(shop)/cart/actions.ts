import MercadoPagoConfig, { Preference } from "mercadopago";

const ACCESS_TOKEN = process.env.MP_ACCES_TOKEN ?? ""

export async function OnSubmit(formData: FormData) {

  console.log(formData);

  // callback llamado al hacer clic en el botón enviar datos
  const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });

  const preference = new Preference(client);

  // preference.create({
  //   // body: { }
  // }).then(console.log).catch(console.log);
}