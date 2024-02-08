interface IParseProps {
  htmlContent: string;
  className: string;
}

function ParseComponent({ htmlContent, className }: IParseProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default ParseComponent