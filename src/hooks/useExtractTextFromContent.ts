import { useCallback } from 'react';

export function useExtractTextFromContent() {
    const extractTextFromContent = useCallback((contentJson: string): string => {
        let text = '';

        const content = JSON.parse(contentJson);

        function traverse(node: any) {
            if (node.text) {
                text += node.text;
            }
            if (node.children && Array.isArray(node.children)) {
                node.children.forEach(traverse);
            }
        }

        if (Array.isArray(content)) {
            content.forEach(traverse);
        }

        return text;
    }, []);

    return { extractTextFromContent };
}
