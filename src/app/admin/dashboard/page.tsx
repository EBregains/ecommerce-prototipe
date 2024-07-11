'use server'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getPayments } from "@/lib/data"
import { ARS } from "@/utils/utils"

export default async function PrivatePage() {

  const payments = await getPayments() || []

  return (
    <section>
      <Table>
        <TableCaption>Lista de ultimas compras</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Usuario</TableHead>
            <TableHead>Mensaje</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.payer_info.identification.number}</TableCell>
              <TableCell>{payment.message}</TableCell>
              <TableCell>{payment.created_at}</TableCell>
              <TableCell className="text-right">{ARS.format(payment.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </section>
  )

}