import type CTS_URN from "./cts_urn";

export type EditionConfig = {
    ctsUrn: CTS_URN;
    description: string;
    filename: string;
    label: string;
    urn: string;
};

export type PassageConfig = {
    ctsUrn: CTS_URN;
    label: string;
    urn: string;
    ref: string;
};

export type Word = {
    comments?: Comment[];
    offset: number;
    text: string;
    xml_id: string;
};

export type TextElement = {
    attributes: any;
    end_offset: number;
    line_offset: number;
    start_offset: number;
    subtype: string;
    type: "text_element";
};

export type TextContainer = {
    comments?: Comment[];
    location: string[];
    offset: number;
    subtype: "line" | "paragraph";
    text: string;
    type: "text_container";
    words: Word[];
    urn: string;
    textElements?: TextElement[];
};

export type Author = {
    email: string;
    name: string;
    username: string;
};

export type Card = {
    n: string;
    next_n: string;
    xml_content: string;
};

export type Tag = {
    description: string;
    name: string;
    image: string;
};

export type Comment = {
    attributes?: any;
    body: string;
    citable_urn: string;
    commentaryAttributes: any;
    content?: string;
    ctsUrn: any;
    end_offset?: string;
    image_paths: string | string[];
    isHighlighted?: boolean;
    lemma?: string;
    overlays: string | string[];
    page_ids: string | string[];
    start_offset?: string;
    transcript?: string;
    urn: string;
};

export type Line = {
    n: string;
};