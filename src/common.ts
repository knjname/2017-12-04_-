import { Foobar } from "./index.scss";
import * as moment from "moment";

export function makeDouble(n: number) {
    return n * 2
}

export function dFormat(d: Date) {
    return moment(d).format("YYYY-MM-DD")
}
