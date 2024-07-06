import { commonStyles } from "../styles/commonStyles";

function Loader() {
  const { flexCenter, styledDot, smallDot } = commonStyles;

  return (
    <div className={`${flexCenter} h-60`}>
      <div className="relative h-[3.75rem] w-[3.75rem]">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className={`dot ${styledDot} ${smallDot}`}></div>
        ))}
      </div>
    </div>
  );
}

export default Loader;
