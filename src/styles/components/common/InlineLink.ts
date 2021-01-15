import styled, {
  css,
  FlattenInterpolation,
  ThemedStyledProps,
  DefaultTheme,
} from 'styled-components';

import { toRGBA } from 'utils/general';

export type InlineLinkStyleMode = 'primary' | 'secondaryBeige';

interface InlineLinkProps {
  styleMode: InlineLinkStyleMode;
}

type StyleModeCSS = {
  [key in InlineLinkProps['styleMode']]: FlattenInterpolation<
    ThemedStyledProps<any, DefaultTheme>
  >;
};

const styleModeCSS: StyleModeCSS = {
  primary: css<InlineLinkProps>`
    color: ${({ theme }) => theme.colors.primary};

    :hover {
      color: ${({ theme }) => theme.colors.primaryLight};
    }

    :active {
      color: ${({ theme }) => theme.colors.primaryOnHover};
    }
  `,

  secondaryBeige: css`
    color: ${({ theme }) => theme.colors.secondaryBeige};

    :hover {
      color: ${({ theme }) => toRGBA(theme.colors.secondaryBeige, 0.8)};
    }

    :active {
      color: ${({ theme }) => toRGBA(theme.colors.secondaryBeige, 0.6)};
    }
  `,
};

const InlineLink = styled.a<InlineLinkProps>`
  ${({ styleMode }) => styleModeCSS[styleMode]}
`;

export default InlineLink;
