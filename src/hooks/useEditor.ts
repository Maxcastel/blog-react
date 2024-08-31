import { TDescendant, TElement, Value } from "@udecode/plate-common";
import { createElement, useEffect, useState } from "react";

interface Style{
    color?: string;
    backgroundColor?: string;
}

interface TElement2 extends TElement {
    caption?: { text: string }[];
}

export function useEditor(initialValue?:Value){
    const [contentJson, setContentJson] = useState<Value|undefined>(initialValue);
    const [contentHtml, setContentHtml] = useState<any>();

    useEffect(() => {
        let element;
        if (contentJson){
            element = createElement("div", null,
                contentJson.map((element:TElement2, index) => {
                    let className:string="";
                    switch (element.type){
                        case "p":
                            className += "text-lg"
                            break;
                        case "h1":
                            className += "text-4xl font-bold mb-1"
                            break;
                        case "h2":
                            className += "mt-[1.4em] text-3xl font-bold mb-px"
                            break;
                        case "h3":
                            className += "text-xl font-semibold mb-px"
                            break;
                        case "h4":
                            className += "text-lg font-semibold"
                            break;
                        case "h5":
                            className += "text-lg font-semibold"
                            break;
                        case "h6":
                            className += "text-base font-semibold mb-px"
                            break;
                    }

                    if (element.align){
                        switch (element.align){
                            case "center":
                                className += " text-center"
                                break;
                            case "left":
                                className += " text-left"
                                break;
                            case "right":
                                className += " text-right"
                                break;
                        }
                    }

                    const firstChildText = element.children[0].text as string;

                    if(firstChildText.trim() === "" && element.type !== "img"){
                        className += " h-[28px]"
                    }
                    
                    return (
                        element.type === "img" ?
                            element.caption ?
                                createElement("div", { key: index, className: "py-2.5" },
                                    createElement("figure", { className: "group relative m-0" },
                                        createElement("div", { className: "flex flex-col mx-auto", style:{width: element.width} },
                                            createElement(element.type, { className, src: element.url }, null)
                                        ),
                                        createElement("figcaption", { className: "max-w-full mx-auto", style:{width: element.width} },
                                            createElement("p", { className: "mt-2 w-full text-center h-6 bg-red-100" }, element.caption[0].text as string)
                                        ) 
                                    )
                                )
                            :  createElement("div", { key: index, className: "py-2.5" },
                                    createElement("div", { className: "flex flex-col mx-auto", style:{width: element.width} },
                                        createElement(element.type, { className, src: element.url }, null)
                                    ) 
                                )
                        :
                        createElement(element.type, { key: index, className }, element.children.map((child:TDescendant, index) => {
                            let className:string="";
                            let style:Style = {};
                            if (child.bold){ className += " font-bold" }
                            if (child.italic){ className += " italic" }
                            if (child.underline){ className += " underline" }
                            if (child.strikethrough){ className += " line-through" }
                            if (child.color){ style = {...style, color: child.color as string} }
                            if (child.backgroundColor){ style = {...style, backgroundColor: child.backgroundColor as string} }

                            return (
                                child.type === "a" ? 
                                    createElement("a", { key: index, className: "font-semibold underline underline-offset-4", href: child.url }, (child.children as TDescendant[]).map((child:TDescendant) => {
                                        let style:Style = {};
                                        if (child.color){ style = {...style, color: child.color as string} }
                                        if (child.backgroundColor){ style = {...style, backgroundColor: child.backgroundColor as string} }

                                        return createElement("span", { className: className.trim(), style }, child.text as string)
                                    }))
                                : createElement("span", { key: index, className: className.trim(), style }, child.text as string)
                            )
                        }))
                    )
                }) 
            )
        }

        setContentHtml(element)
    }, [contentJson])
    
    return [
        JSON.stringify(contentJson), 
        setContentJson,
        contentHtml
    ] as const
}