import { IRate } from "@/entity/vote";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { RatingCalculus } from "./rating";

export default function TableVote(dta: { data: IRate[] }) {
    const { data } = dta
    return (
        <Table>
            <TableBody>
                {data.map((v, i) => (
                    <TableRow key={i}>
                        <TableHead>{v.option}</TableHead>
                        <TableCell><RatingCalculus rate={v.value} /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
