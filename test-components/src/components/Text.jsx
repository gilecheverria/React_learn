function Text({toggle, displayText}) {
  return <h2 data-testid="text">{toggle ? displayText : ""}</h2>
}

export default Text;
