import { Plate, Value } from '@udecode/plate-common';
import { Editor } from '@/components/plate-ui/editor';
import { useRef } from 'react';
import { cn } from '@udecode/cn';
import { plugins } from '@/lib/plate/plugins';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FixedToolbarButtons } from '../plate-ui/fixed-toolbar-buttons-comment';
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons-comment';

export function CommentEditor({onValueChange}:{onValueChange:(value: string) => void}){
    const containerRef = useRef(null);

    return (
        <div className='w-full'>
        <TooltipProvider>
            <div className="relative">
                <Plate 
                    plugins={plugins}
                    onChange={(newValue:Value) => {
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
        </div>
    )
}