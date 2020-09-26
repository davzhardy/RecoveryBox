import React from "react";
import { Text } from "react-native";
import colors from './colors'

export const textBoldStyles = {
  fontFamily: 'Montserrat_700Bold',
  fontStyle: "normal",
  fontSize: 22,
  color: colors.darkGrayFont,
  marginBottom: 10,
};

const { Provider, Consumer } = React.createContext(textBoldStyles);

export const BoldAppText = ({style, ...props}) => (
  <Consumer>
    {(contextStyle) => {
      const mergedStyle = style
        ? {...contextStyle, ...style}
        : contextStyle;

      return (
        <Text {...props} style={mergedStyle} />
      );
    }}
  </Consumer>
);

export const textMediumStyles = {
  fontFamily: 'Montserrat_500Medium',
  fontStyle: "normal",
  fontSize: 12,
  color: "#7B7C86",
  marginBottom: 10,
};

const MediumStyles = React.createContext(textMediumStyles)

export const MediumAppText = ({style, ...props}) => (
  <MediumStyles.Consumer>
    {(contextStyle) => {
      const mergedStyle = style
        ? {...contextStyle, ...style}
        : contextStyle;

      return (
        <Text {...props} style={mergedStyle} />
      );
    }}
  </MediumStyles.Consumer>
);