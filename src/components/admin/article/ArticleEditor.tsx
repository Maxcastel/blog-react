import { Plate, Value } from '@udecode/plate-common';
import { Editor } from '@/components/plate-ui/editor';
import { useRef } from 'react';
import { cn } from '@udecode/cn';
import { FixedToolbar } from '../../plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '../../plate-ui/fixed-toolbar-buttons';
import { TooltipProvider } from '../../plate-ui/tooltip';
import { FloatingToolbar } from '../../plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '../../plate-ui/floating-toolbar-buttons';
import { plugins } from '@/lib/plate/plugins';

export function ArticleEditor({initialValue,onWrite,onValueChange}:{initialValue:Value,onWrite:(newJson:Value)=>void,onValueChange:(value: string) => void}){
    const containerRef = useRef(null);

    return (
    <>
        <TooltipProvider>
            <div className="relative">
                <Plate 
                    plugins={plugins}
                    initialValue={initialValue}
                    onChange={(newValue:Value) => {
                        onWrite(newValue)
                        onValueChange(JSON.stringify(newValue))
                    }}
                >
                    <div 
                        ref={containerRef}
                        className={cn(
                            'relative',
                            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                        )}
                    >
                        <FixedToolbar>
                            <FixedToolbarButtons />
                        </FixedToolbar>

                        <Editor
                            className="px-[50px] py-16"
                            autoFocus
                            focusRing={false}
                            variant="outline"
                            size="md"
                        />

                        <FloatingToolbar>
                            <FloatingToolbarButtons />
                        </FloatingToolbar>
                    </div>
                </Plate>
            </div>
        </TooltipProvider>
    </>
    )
}