function BigLoader() {
  const styledDot =
    "absolute flex justify-center after:w-4 after:h-4 after:rounded-[50%] dark:after:bg-white after:bg-text_light";
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative h-[7rem] w-[7rem]">
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
        <div className={`dot ${styledDot}`}></div>
      </div>
    </div>
  );
}

export default BigLoader;
