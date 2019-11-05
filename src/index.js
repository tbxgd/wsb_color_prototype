import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import MutatorSection from "./Editor/MutatorSection";
import ColorSlider from "./Editor/Color/ColorSlider";
import ColorHuePicker from "./Editor/Color/ColorHuePicker";
import ColorPickerCategory from "./Editor/Color/ColorPickerCategory";
import ZoomSelector from "./Editor/ZoomSelector";
import Scaler from "./Editor/Scaler";
import Header from "./Theme/Widgets/Header";
import Welcome from "./Theme/Widgets/Welcome";
import About from "./Theme/Widgets/About";
import Page from "./Theme/Widgets/Page";
import Footer from "./Theme/Widgets/Footer";
import "./styles.css";

function reducer(zoomLevel, action) {
  switch (action.type) {
    case "increment":
      return zoomLevel + 0.1;
    case "decrement":
      return zoomLevel - 0.1;
    case "toggle":
      return zoomLevel === 1 ? 0.5 : 1;
    default:
      throw new Error();
  }
}

const Checkmark = ({ isLight }) => (
  <svg width={16} height={12}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.841 1.417L5.5 11.758.158 6.417l1.175-1.175L5.5 9.408 14.666.242l1.175 1.175z"
      fill={isLight ? "#000" : "#fff"}
    />
  </svg>
);

const pencil = (
  <svg width={16} height={16} fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.983.158L.5 11.642V15.5h3.858l7.95-7.95 1.175-1.175 2.359-2.358L11.983.158zM3.675 13.833H2.167v-1.508l7.458-7.458 1.508 1.508-7.458 7.458zm7.133-10.141l1.175-1.175 1.509 1.508L12.317 5.2l-1.509-1.508z"
      fill="#fff"
    />
  </svg>
);

const colorIcon = (
  <svg width={24} height={24}>
    <rect x={2.5} y={2.5} width={5} height={5} rx={1} fill="#D22F25" />
    <rect x={9.5} y={2.5} width={5} height={5} rx={1} fill="#FF7B01" />
    <rect x={16.5} y={2.5} width={5} height={5} rx={1} fill="#EEDF1E" />
    <rect x={2.5} y={9.5} width={5} height={5} rx={1} fill="#4CAD49" />
    <rect x={9.5} y={9.5} width={5} height={5} rx={1} fill="#0FB5DF" />
    <rect x={16.5} y={9.5} width={5} height={5} rx={1} fill="#0075C1" />
    <rect x={2.5} y={16.5} width={5} height={5} rx={1} fill="#7E54C6" />
    <rect x={9.5} y={16.5} width={5} height={5} rx={1} fill="#EF1285" />
    <rect x={16.5} y={16.5} width={5} height={5} rx={1} fill="#A28451" />
  </svg>
);

const chevronDownIcon = (
  <svg width={24} height={24}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.3901 9.01003L12.0001 16.4L4.61011 9.01003L6.02011 7.60003L12.0001 13.57L17.9801 7.59003L19.3901 9.01003Z"
      fill="#ffffff"
    />
  </svg>
);

const chevronUpIcon = (
  <svg width={24} height={24}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.3901 14.99L17.9801 16.4L12.0001 10.43L6.02011 16.4L4.61011 14.99L12.0001 7.59998L19.3901 14.99Z"
      fill="#ffffff"
    />
  </svg>
);

const fontIcon = (
  <svg width={24} height={24}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 2V22H22V2H2ZM20 20H4V4H20V20ZM9.11 15.96H14.92L16 19H18.17L12.78 5.01H11.26L5.83 19H8.03L9.11 15.96ZM12.02 7.97L14.24 14.19H9.79L12.02 7.97Z"
      fill="#ffffff"
    />
  </svg>
);

const plusIcon = (
  <svg width={24} height={24}>
    <path d="M20 13H13V20H11V13H4V11H11V4H13V11H20V13Z" fill="#ffffff" />
  </svg>
);

const addColorBtn = (
  <svg width={32} height={32} fill="none">
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="15.5"
      stroke="white"
      stroke-opacity="0.4"
      stroke-dasharray="5 3"
    />
    <path
      d="M22.6663 16.8333H16.833V22.6667H15.1663V16.8333H9.33301V15.1667H15.1663V9.33334H16.833V15.1667H22.6663V16.8333Z"
      fill="white"
      fill-opacity="0.5"
    />
  </svg>
);

const logoImgDefault =
  "https://img1.wsimg.com/isteam/ip/759cc48c-8ca0-4db4-9da3-3c653749aa98/logo/ccc5a9a6-1399-4adc-9370-f42191ddf726.webp/:/rs=h:344/ll";

const heroImgDefault =
  "https://img1.wsimg.com/isteam/ip/759cc48c-8ca0-4db4-9da3-3c653749aa98/allef-vinicius-ig-seteales-354911-unsplas-0002.jpg";

const widgets = [Welcome, About, Welcome, About];

function App() {
  const [primary, setPrimary] = useState("#92211d");
  const [scheme, setScheme] = useState("lightAlt");
  const [logoColors, setLogoColors] = useState([]);
  const [heroColors, setHeroColors] = useState([]);
  const [zoomLevel, setZoomLevel] = useReducer(reducer, 0.6);
  const [heroImg, setHeroImg] = useState(heroImgDefault);
  const [logoImg, setLogoImg] = useState(logoImgDefault);
  const [showPicker, setShowPicker] = useState(false);
  const [recentColor, setRecentColor] = useState(null);

  const recommendedColors = [
    { hex: "#92211d", type: "initialColor" },
    ...logoColors.map(c => ({ hex: c, type: "logoColor" })),
    ...heroColors.map(c => ({ hex: c, type: "heroColor" }))
  ];

  const isRecommended = recommendedColors
    .map(({ hex }) => hex)
    .includes(primary);

  useEffect(() => {
    if (!isRecommended) {
      setRecentColor(primary);
    }
  }, [primary, isRecommended]);

  const btnStyle = !recentColor
    ? {}
    : {
        backgroundColor: recentColor,
        border: "none"
      };
  return (
    <div className="App">
      <main id="scale-container" className="preview-container">
        <ZoomSelector
          zoomLevel={zoomLevel.toFixed(1)}
          setZoomLevel={setZoomLevel}
        />
        <Scaler scale={zoomLevel.toFixed(1)}>
          <div className="preview">
            <Page color={primary} scheme={scheme}>
              <Header
                logoImg={logoImg}
                setLogoImg={setLogoImg}
                heroImg={heroImg}
                setHeroImg={setHeroImg}
                setHeroColors={setHeroColors}
                setImgColors={setLogoColors}
              />
              {widgets.map((Widget, i) => {
                return <Widget key={i} index={i} />;
              })}
              <Footer />
            </Page>
          </div>
        </Scaler>
      </main>
      <aside>
        <div className="flex center color-dropdown">
          {colorIcon}
          <div className="pivot-label">
            <span>Site Color</span>
          </div>
          <div className="pivot-chevron">{chevronUpIcon}</div>
        </div>
        <div className="dropdown-content">
          <MutatorSection>
            <p className="section-label">Paint Your Site</p>
            <ColorSlider
              color={primary}
              scheme={scheme}
              setScheme={setScheme}
            />
          </MutatorSection>
          <MutatorSection>
            <p className="section-label">Recommended</p>
            <p className="color-picker-label">
              Use a color selected from your logo and images for a better
              looking site.
            </p>
            <ColorPickerCategory
              color={primary}
              colors={recommendedColors}
              isRecommended={isRecommended}
              setColor={setPrimary}
            />
            <p className="label">Or pick a color you like</p>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <button
                style={btnStyle}
                className={`add-btn ${
                  primary === recentColor ? "selected" : ""
                }`}
                onClick={() => {
                  if (!recentColor) {
                    setShowPicker(!showPicker);
                  } else {
                    setPrimary(recentColor);
                  }
                }}
              >
                {primary === recentColor ? (
                  <Checkmark isLight={primary.includes("#fff")} />
                ) : !recentColor ? (
                  <div>{addColorBtn}</div>
                ) : null}
              </button>
              {recentColor && (
                <button
                  onClick={() => {
                    setShowPicker(!showPicker);
                  }}
                  className="link-text"
                >
                  Edit color
                </button>
              )}
            </div>
            <ColorHuePicker
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              isRecommended={isRecommended}
              color={recentColor || primary}
              setColor={setPrimary}
            />
          </MutatorSection>
        </div>
        <div className="flex center color-dropdown">
          {fontIcon}
          <div className="pivot-label">
            <span>Theme Font</span>
            <div className="pivot-subtext">Helvetica</div>
          </div>
          <div className="pivot-chevron">{chevronDownIcon}</div>
        </div>
      </aside>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
