const STEPHANUS_BEKKER_REGEX = /((?<book>\d+)\.)?(?<page>\d+)(?<column>[ABCDE])/i;

export default class CTS_URN {
    __urn: string;
    collection: string;
    workComponent?: string;
    passageComponent?: string;
    textGroup?: string;
    work?: string;
    version?: string;
    exemplar?: string;
    citations: string[] = [];
    integerCitations: number[][] = [];
    tokens: string[] = [];

    constructor(urn: string) {
        const [_urn_s, _cts, collection, workComponent, passageComponent] = urn.split(':');
        const [textGroup, work, version, exemplar] = workComponent.split('.');

        this.__urn = urn;
        this.collection = collection;
        this.workComponent = workComponent;
        this.textGroup = textGroup;
        this.work = work;
        this.version = version;
        this.exemplar = exemplar;
        this.passageComponent = passageComponent;

        if (passageComponent) {
            this.setPassages(passageComponent);
        }
    }

    setPassages(passageComponent: string) {
        this.citations = passageComponent.split('-').map(p => p.split('@')[0]);
        this.integerCitations = this.citations.map(citationToInteger);
        this.tokens = passageComponent.split('-').map(p => p.split('@')[1]);
    }

    toJSON() {
        return {
            collection: this.collection,
            workComponent: this.workComponent,
            textGroup: this.textGroup,
            work: this.work,
            version: this.version,
            exemplar: this.exemplar,
            passageComponent: this.passageComponent,
            citations: this.citations,
            integerCitations: this.integerCitations,
            tokens: this.tokens
        };
    }

    toString() {
        return this.__urn;
    }
}

function citationToInteger(citation: string): number[] {
    const platoOrAristotle = STEPHANUS_BEKKER_REGEX.exec(citation);

    if (platoOrAristotle && platoOrAristotle.groups) {
        const book = platoOrAristotle.groups.book;
        const page = platoOrAristotle.groups.page;
        const column = platoOrAristotle.groups.column;

        if (book) {
            return [parseInt(book), parseInt(page), columnToInt(column)];
        }

        return [parseInt(page), columnToInt(column)];
    }

    return citation.split('.').map(parseInt);
}

function columnToInt(column: string): number {
    switch (column) {
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        case 'D':
            return 4;
        case 'E':
            return 5;
        default:
            return 0;
    }
}