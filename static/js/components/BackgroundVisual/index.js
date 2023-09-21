import { getRandomIndex } from "../../utils";
import "./index.scss";

const numOptions = 4;
const randomNumber = getRandomIndex(numOptions) + 1;

function BackgroundVisual({ isPlaying }) {
  return (
    <div className="background">
      <div className="background-wrapper" style={{backgroundImage: `url('/assets/background${randomNumber}.png')`}}></div>
      <div className={`background-color-overlay ${!isPlaying ? "hide-transition": ""}`}></div>
    </div>
  )
}

export default BackgroundVisual;