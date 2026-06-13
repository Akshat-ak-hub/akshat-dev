export default function Loader({ hidden }) {
  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} id="loader">
      <div className="loader-inner">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <span className="loader-text">AKSHAT.DEV</span>
      </div>
    </div>
  )
}
