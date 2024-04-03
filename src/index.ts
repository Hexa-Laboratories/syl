import { Token } from "../htmlparser/src/token/Token";
import { HTMLParser } from "../htmlparser/src/parser/HTMLParser";

let tokens: Token[] = [
    {
        kind: TokenKind.LeftArrow,
        lexeme: "<",
        line: 1,
        column: 1
    }
];
let parser = new HTMLParser(tokens);
parser.startParse();