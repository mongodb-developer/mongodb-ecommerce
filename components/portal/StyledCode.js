import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const StyledCode = ({ codeString, lang }) => {
  if (!codeString) return null;

  return (
    <SyntaxHighlighter
      language={lang}
      style={materialDark}
      className="syntaxhighlighter"
    >
      {codeString}
    </SyntaxHighlighter>
  );
};

export default StyledCode;
