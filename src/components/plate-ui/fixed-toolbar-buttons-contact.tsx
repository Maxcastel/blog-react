import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';

import { Icons, iconVariants } from '@/components/icons';

import { InsertDropdownMenu } from './insert-dropdown-menu';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { AlignDropdownMenu } from './align-dropdown-menu';
import { ColorDropdownMenu } from './color-dropdown-menu';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { useTranslation } from 'react-i18next';

export function FixedToolbarButtons() {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
          <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
              <MarkToolbarButton tooltip={t('editor.toolbar.tooltip.bold')} nodeType={MARK_BOLD}>
                  <Icons.bold />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip={t('editor.toolbar.tooltip.italic')} nodeType={MARK_ITALIC}>
                  <Icons.italic />
              </MarkToolbarButton>

              <MarkToolbarButton
                  tooltip={t('editor.toolbar.tooltip.underline')}
                  nodeType={MARK_UNDERLINE}
              >
                  <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                  tooltip={t('editor.toolbar.tooltip.strikethrough')}
                  nodeType={MARK_STRIKETHROUGH}
              >
                  <Icons.strikethrough />
              </MarkToolbarButton>

              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip={t('editor.toolbar.tooltip.textColor')}>
                  <Icons.color className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>

              <ColorDropdownMenu
                  nodeType={MARK_BG_COLOR}
                  tooltip={t('editor.toolbar.tooltip.highlight')}
              >
                  <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
          </ToolbarGroup>

          <ToolbarGroup>
              <AlignDropdownMenu />
          </ToolbarGroup>

        <div className="grow" />

      </div>
    </div>
  );
}
