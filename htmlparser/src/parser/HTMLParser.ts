import { Token } from "../token/Token";

enum HTMLParseErrorType {
    UnclosedTag
}

type HTMLParseError = {
    error: HTMLParseErrorType,
    type: "error"
}

type HTMLParseSuccess = {
    element: RHTMLElement,
    type: "element"
}

type ParseResult = HTMLParseError | HTMLParseSuccess;

export class HTMLParser {
    protected tokens: Token[];
    private current: number;
    private currentToken: Token;

    constructor(tokens: Token[]) {
        if (tokens.length < 1) {
            throw new Error("No tokens!!!");
        }
        this.tokens = tokens;
        this.current = 0;
        this.currentToken = tokens[0];
    }

    public startParse(): RHTMLElement[] {
        let parsedElements: RHTMLElement[] = [];
        while (true) {
            if (this.currentToken.kind == TokenKind.Eof) {
                break;
            }
            let result: ParseResult = this.parseSingleElement();
            if (result.type === "element") {
                parsedElements.push(result.element);
            } else {
                console.error("Error: " + result.error);
            }
        }
        return [];
    }

    parseSingleElement(): ParseResult {
        for (let token of this.tokens) {
            switch (token.kind) {
                case TokenKind.LeftArrow: {
                    this.skipToNextToken();
                }
            }
        }
        return {
            type: "element",
            element: {
                lang: "hello"
            }
        };
    }

    private skipToNextToken(): void {
        this.current += 1;
        if (this.current < this.tokens.length) {
            this.currentToken = this.tokens[this.current];
        } else {
            console.error("Can't read the next token: out of bounds.");
        }
    }
}