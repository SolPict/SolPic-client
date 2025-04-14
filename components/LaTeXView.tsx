import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";

interface LaTeXViewProps {
  latex: string;
  isWideBorder: boolean;
}

export default function LaTeXView({ latex, isWideBorder }: LaTeXViewProps) {
  const fontSize = isWideBorder ? "1.7rem" : "1.6rem";
  const containerHeight = isWideBorder ? 610 : 390;

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
        html, body {
          margin: 0;
          padding: 10px;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: start;
          align-items: start;
          font-size: ${fontSize};
        }
        #math {
          text-align: left;
          }
          #math > mjx-container {
            justify-content: flex-start !important;
            text-align: left !important;
        }
      </style>
    </head>
    <body>
      <div id="math">
        ${latex}
      </div>
    </body>
  </html>
`;

  return (
    <View style={[styles.latexContainer, { height: containerHeight }]}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled={true}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  latexContainer: {
    width: 350,
    backgroundColor: "red",
  },
});
