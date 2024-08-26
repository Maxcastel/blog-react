import { 
    createPlugins, 
    PlateLeaf
} from '@udecode/plate-common';
import { withProps } from '@udecode/cn';
import { 
    createParagraphPlugin, 
    ELEMENT_PARAGRAPH 
} from '@udecode/plate-paragraph';
import { 
    createHeadingPlugin, 
    ELEMENT_H1, 
    ELEMENT_H2, 
    ELEMENT_H3, 
    ELEMENT_H4, 
    ELEMENT_H5, 
    ELEMENT_H6 
} from '@udecode/plate-heading';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { 
    createBoldPlugin, 
    MARK_BOLD,
    createItalicPlugin,
    MARK_ITALIC,
    createUnderlinePlugin,
    MARK_UNDERLINE,
    createStrikethroughPlugin,
    MARK_STRIKETHROUGH,
} from '@udecode/plate-basic-marks';
import { createAlignPlugin } from '@udecode/plate-alignment';
import {
    createFontBackgroundColorPlugin,
    createFontColorPlugin,
} from '@udecode/plate-font';


export const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createHeadingPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createAlignPlugin({
            inject: {
              props: {
                validTypes: [
                  ELEMENT_PARAGRAPH,
                  ELEMENT_H1,
                  ELEMENT_H2,
                  ELEMENT_H3,
                  ELEMENT_H4,
                  ELEMENT_H5,
                  ELEMENT_H6,
                ],
              },
            },
        }),
        createFontColorPlugin(),
        createFontBackgroundColorPlugin(),
    ],
    {
        components: withPlaceholders({
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'i' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [ELEMENT_PARAGRAPH]: withProps(HeadingElement, { variant: 'p' }),
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
        })
    }
);