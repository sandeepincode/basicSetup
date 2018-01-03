export default function eventToAction(dispatchAction) {
  return (e) => {
    dispatchAction(e.currentTarget.value);
  }
}
