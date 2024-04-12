import { MouseEventHandler, ReactNode } from "react";

export interface NavLinkProps {
    href: string;
    title?: string;
}

export interface TabButtonProps {
    active: boolean;
    selectTab: MouseEventHandler<HTMLButtonElement>; 
    children: ReactNode;
}

export interface CardProps {
    imgUrl: string;
    imgAlt?: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl: string | '';
}