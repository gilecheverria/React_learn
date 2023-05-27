function Button({setToggle, btnTxt}) {
  return (
    <button data-testid="button"
      onClick={() => setToggle((prev) => !prev)}
    >
      {btnTxt}
    </button>
  );
}

export default Button;
