import React from "react";
import { Text } from "react-native";

export const textBoldStyles = {
  fontFamily: 'Montserrat_700Bold',
  fontStyle: "normal",
  fontSize: 30,
  color: "#2A2A30",
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