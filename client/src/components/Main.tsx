export const Main = () => {
  return (
    <div className="mainContainer">
      <div className="cryptContainer">
        <h1 className="title">Crypt Card</h1>
        <button type="button">
          <p className="buttonText">Connect wallet</p>
        </button>
      </div>

      <div className="inputContainer">
        <input type="text" placeholder="Address" name="address" />
        <input type="number" placeholder="Currency (ETH)" name="amount" step={"0.0001"} />
        <button type="button">Send</button>
      </div>
    </div>
  );
};
