import { statement as origin } from "./Statement.js";
import { statement as refactored } from "./StatementBookVersion.js";
import INVOICE from "./mock/invoices.js";
import PLAYS from "./mock/plays.js";
//console.log(statement(INVOICE[0], PLAYS));

origin(INVOICE[0], PLAYS) === refactored(INVOICE[0], PLAYS)
  ? console.log(true)
  : console.log(origin(INVOICE[0], PLAYS), refactored(INVOICE[0], PLAYS));
