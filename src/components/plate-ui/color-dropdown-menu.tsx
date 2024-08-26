import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import {
  useColorDropdownMenu,
  useColorDropdownMenuState,
} from '@udecode/plate-font';

import { DEFAULT_CUSTOM_COLORS } from './color-constants';
import { ColorPicker } from './color-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { useTranslation } from 'react-i18next';

export type TColor = {
  isBrightColor: boolean;
  name: string;
  value: string;
};

type ColorDropdownMenuProps = {
  nodeType: string;
  tooltip?: string;
} & DropdownMenuProps;

export function ColorDropdownMenu({
  children,
  nodeType,
  tooltip,
}: ColorDropdownMenuProps) {
  const { t } = useTranslation();

  const DEFAULT_COLORS = [
    {
      name: t("editor.colors.black"),
      value: '#000000',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_grey_4"),
      value: '#434343',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_grey_3"),
      value: '#666666',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_grey_2"),
      value: '#999999',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_grey_1"),
      value: '#B7B7B7',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.grey"),
      value: '#CCCCCC',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_grey_1"),
      value: '#D9D9D9',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_grey_2"),
      value: '#EFEFEF',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_grey_3"),
      value: '#F3F3F3',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.white"),
      value: '#FFFFFF',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.red_berry"),
      value: '#980100',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.red"),
      value: '#FE0000',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.orange"),
      value: '#FE9900',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.yellow"),
      value: '#FEFF00',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.green"),
      value: '#00FF00',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.cyan"),
      value: '#00FFFF',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.cornflower_blue"),
      value: '#4B85E8',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.blue"),
      value: '#1300FF',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.purple"),
      value: '#9900FF',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.magenta"),
      value: '#FF00FF',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_red_berry_3"),
      value: '#E6B8AF',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_red_3"),
      value: '#F4CCCC',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_orange_3"),
      value: '#FCE4CD',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_yellow_3"),
      value: '#FFF2CC',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_green_3"),
      value: '#D9EAD3',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_cyan_3"),
      value: '#D0DFE3',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_cornflower_blue_3"),
      value: '#C9DAF8',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_blue_3"),
      value: '#CFE1F3',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_purple_3"),
      value: '#D9D2E9',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_magenta_3"),
      value: '#EAD1DB',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_red_berry_2"),
      value: '#DC7E6B',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_red_2"),
      value: '#EA9999',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_orange_2"),
      value: '#F9CB9C',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_yellow_2"),
      value: '#FFE598',
      isBrightColor: true,
    },
    {
      name: t("editor.colors.light_green_2"),
      value: '#B7D6A8',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_cyan_2"),
      value: '#A1C4C9',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_cornflower_blue_2"),
      value: '#A4C2F4',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_blue_2"),
      value: '#9FC5E8',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_purple_2"),
      value: '#B5A7D5',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_magenta_2"),
      value: '#D5A6BD',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_red_berry_1"),
      value: '#CC4125',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_red_1"),
      value: '#E06666',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_orange_1"),
      value: '#F6B26B',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_yellow_1"),
      value: '#FFD966',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_green_1"),
      value: '#93C47D',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_cyan_1"),
      value: '#76A5AE',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_cornflower_blue_1"),
      value: '#6C9EEB',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_blue_1"),
      value: '#6FA8DC',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_purple_1"),
      value: '#8D7CC3',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.light_magenta_1"),
      value: '#C27BA0',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_red_berry_1"),
      value: '#A61B00',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_red_1"),
      value: '#CC0000',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_orange_1"),
      value: '#E59138',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_yellow_1"),
      value: '#F1C231',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_green_1"),
      value: '#6AA74F',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_cyan_1"),
      value: '#45818E',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_cornflower_blue_1"),
      value: '#3B78D8',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_blue_1"),
      value: '#3E84C6',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_purple_1"),
      value: '#664EA6',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_magenta_1"),
      value: '#A64D78',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_red_berry_2"),
      value: '#84200D',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_red_2"),
      value: '#990001',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_orange_2"),
      value: '#B45F05',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_yellow_2"),
      value: '#BF9002',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_green_2"),
      value: '#38761D',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_cyan_2"),
      value: '#124F5C',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_cornflower_blue_2"),
      value: '#1155CB',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_blue_2"),
      value: '#0C5394',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_purple_2"),
      value: '#351C75',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_magenta_2"),
      value: '#741B47',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_red_berry_3"),
      value: '#5B0F00',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_red_3"),
      value: '#660000',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_orange_3"),
      value: '#783F04',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_yellow_3"),
      value: '#7E6000',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_green_3"),
      value: '#274E12',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_cyan_3"),
      value: '#0D343D',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_cornflower_blue_3"),
      value: '#1B4487',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_blue_3"),
      value: '#083763',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_purple_3"),
      value: '#1F124D',
      isBrightColor: false,
    },
    {
      name: t("editor.colors.dark_magenta_3"),
      value: '#4C1130',
      isBrightColor: false,
    },
  ];

  const state = useColorDropdownMenuState({
    closeOnSelect: true,
    colors: DEFAULT_COLORS,
    customColors: DEFAULT_CUSTOM_COLORS,
    nodeType,
  });

  const { buttonProps, menuProps } = useColorDropdownMenu(state);

  return (
    <DropdownMenu modal={false} {...menuProps}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip={tooltip} {...buttonProps}>
          {children}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <ColorPicker
          clearColor={state.clearColor}
          color={state.selectedColor || state.color}
          colors={state.colors}
          customColors={state.customColors}
          updateColor={state.updateColorAndClose}
          updateCustomColor={state.updateColor}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
