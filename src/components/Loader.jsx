function Loader() {
  const styledDot =
    "absolute flex justify-center after:w-2 after:h-2 after:rounded-[50%] dark:after:bg-white after:bg-text_light";
  return (
    <div className="flex justify-center items-center h-60">
      <div className="relative h-[3.75rem] w-[3.75rem]">
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
      </div>
    </div>
  );
}

export default Loader;
