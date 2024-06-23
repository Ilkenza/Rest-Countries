/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
const LanguageSelector = ({ onChangeLanguage }) => {
  return (
    <div>
      <button onClick={() => onChangeLanguage("en")}>English</button>
      <button onClick={() => onChangeLanguage("sr")}>Serbian</button>
      <button onClick={() => onChangeLanguage("es")}>Spanish</button>
      <button onClick={() => onChangeLanguage("pt")}>Portuguese</button>
      <button onClick={() => onChangeLanguage("fr")}>French</button>
      <button onClick={() => onChangeLanguage("it")}>Italian</button>
      <button onClick={() => onChangeLanguage("ru")}>Russian</button>
    </div>
  );
};

export default LanguageSelector;
