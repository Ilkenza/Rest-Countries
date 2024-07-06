import { commonStyles } from "../styles/commonStyles";

function BigLoader() {
  const { flexCenter, styledDot, bigDot } = commonStyles;

  return (
    <div className={`${flexCenter} h-screen`}>
      <div className="relative h-[7rem] w-[7rem]">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className={`dot ${styledDot} ${bigDot}`}></div>
        ))}
      </div>
    </div>
  );
}

export default BigLoader;
