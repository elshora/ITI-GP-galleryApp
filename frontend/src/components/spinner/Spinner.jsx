import "./spainner.scss";

const Spinner = () => {
  return (
    <div className="loadingContainer">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
