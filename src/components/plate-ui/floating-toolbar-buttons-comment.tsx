import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';

import { Icons, iconVariants } from '@/components/icons';

import { MarkToolbarButton } from './mark-toolbar-button';
import { ColorDropdownMenu } from './color-dropdown-menu';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { useTranslation } from 'react-i18next';

export function FloatingToolbarButtons() {
  const { t } = useTranslation();

  return (
    <>
      <MarkToolbarButton nodeType={MARK_BOLD} tooltip={t('editor.toolbar.tooltip.bold')}>
        <Icons.bold />
      </MarkToolbarButton>

      <MarkToolbarButton nodeType={MARK_ITALIC} tooltip={t('editor.toolbar.tooltip.italic')}>
        <Icons.italic />
      </MarkToolbarButton>

      <MarkToolbarButton
        nodeType={MARK_UNDERLINE}
        tooltip={t('editor.toolbar.tooltip.underline')}>
        <Icons.underline />
      </MarkToolbarButton>

      <MarkToolbarButton
        nodeType={MARK_STRIKETHROUGH}
        tooltip={t('editor.toolbar.tooltip.strikethrough')}>
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
    </>
  );
}