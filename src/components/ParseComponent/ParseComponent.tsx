import { IParseProps } from "../../types/props.types";


function ParseComponent({ htmlContent, className }: IParseProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default ParseComponent