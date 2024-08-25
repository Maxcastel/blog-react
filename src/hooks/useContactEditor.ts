import { TDescendant, TElement, Value } from "@udecode/plate-common";
import { CSSProperties, createElement, useEffect, useState } from "react";

type TextAlign = "center" | "left" | "right";

export function useContactEditor(initialValue?:Value){
    const [contentJson, setContentJson] = useState<Value|undefined>(initialValue);
    const [contentHtml, setContentHtml] = useState<any>();

    useEffect(() => {
        let element;
        if (contentJson){
            element = createElement("div", null, contentJson.map((element:TElement, index) => {
                let style:CSSProperties = {};
                switch (element.type){
                    case "p":
                            style = {...style, fontSize: "1.125rem"}
                            break;
                        case "h1":
                            style = {...style, fontSize: "2.25rem", fontWeight: 700, marginBottom: "0.25rem"}
                            break;
                        case "h2":
                            style = {...style, fontSize: "1.5rem", fontWeight: 600, marginTop: "1.4em"}
                            break;
                        case "h3":
                            style = {...style, fontSize: "1.25rem", fontWeight: 600}
                            break;
                        case "h4":
                            style = {...style, fontSize: "1.125rem", fontWeight: 600}
                            break;
                        case "h5":
                            style = {...style, fontSize: "1.125rem", fontWeight: 600}
                            break;
                        case "h6":
                            style = {...style, fontSize: "1rem", fontWeight: 600}
                            break;
                }
                const firstChildText = element.children[0].text as string;

                if(firstChildText.trim() === ""){
                    style = {...style, height: "28px"}
                }
                if (element.align){
                    style = {...style, textAlign: element.align as TextAlign}
                }
                return (
                    createElement(element.type, { key: index, style }, element.children.map((child:TDescendant, index) => {
                        let tags = [];
                        if (child.bold) tags.push("b")
                        if (child.italic) tags.push("i")
                        if (child.underline) tags.push("u")
                        if (child.strikethrough) tags.push("s")
                        let style:CSSProperties = {};
                        if (child.color) style = {...style, color: child.color as string} 
                        if (child.backgroundColor) style = {...style, backgroundColor: child.backgroundColor as string} 

                        return (
                            tags.length === 0 ?
                                createElement("span", { key: index, style }, child.text as string)
                            : tags.reduceRight((acc:any, tag) => createElement(tag, { key: index, style }, acc), child.text as string)
                        )
                    }))
                )

                        
            })) 
        }

        setContentHtml(element)
    }, [contentJson])
    
    return [
        JSON.stringify(contentJson), 
        setContentJson,
        contentHtml
    ] as const
}