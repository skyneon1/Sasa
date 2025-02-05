import React, { useState, useRef } from 'react';
import './Main.css'; // Import the CSS file

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFrames, setIsOpenFrames] = useState(false);
  const [isOpenHighlights, setIsOpenHighlights] = useState(false);
  const [isOpenBackground, setIsOpenBackground] = useState(false);
  const [isOpenDraw, setIsOpenDraw] = useState(false);
  const [isOpenText, setIsOpenText] = useState(false);
  const [isOpenStickers, setIsOpenStickers] = useState(false);
  const [activeComponent, setActiveComponent] = useState('frames');
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setHistory([...history, file]);
    setFile(URL.createObjectURL(uploadedFile));
    setIsUploaded(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'gallery':
        setIsOpen(!isOpen);
        break;
      case 'frames':
        setIsOpenFrames(!isOpenFrames);
        break;
      case 'highlights':
        setIsOpenHighlights(!isOpenHighlights);
        break;
      case 'background':
        setIsOpenBackground(!isOpenBackground);
        break;
      case 'draw':
        setIsOpenDraw(!isOpenDraw);
        break;
      case 'text':
        setIsOpenText(!isOpenText);
        break;
      case 'stickers':
        setIsOpenStickers(!isOpenStickers);
        break;
      default:
        break;
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoList([file, ...redoList]);
      setFile(lastState);
      setHistory(history.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoList.length > 0) {
      const nextState = redoList[0];
      setHistory([...history, file]);
      setFile(nextState);
      setRedoList(redoList.slice(1));
    }
  };

  const handleClearAll = () => {
    setHistory([...history, file]);
    setFile(null);
    setRedoList([]);
  };

  const showFrames = () => {
    setActiveComponent('frames');
    setSelectedContent('frames'); // Add this line
  };

  const showDevices = () => {
    setActiveComponent('devices');
    setSelectedContent('devices'); // Add this line
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <aside>
            <div className="inaside2">
              <div className="inaside11">
                <h3>
                  <button
                    type="button"
                    onClick={(event) => {
                      toggleDropdown('frames');
                      handleDropdownClick(event);
                    }}
                  >
                    <div className="insidebutton">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_1_21599)">
                          <path d="M0 4.47705H24" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                          <path d="M0 19.5232H24" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                          <path d="M2.09814 2.3401V21.6599" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                          <path d="M21.9019 2.3401V21.6599" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                        </g>
                        <path d="M18.9805 16.75H5.01953V7.25003H18.9805V16.75Z" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                      </svg>
                      <h3>Frames</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpenFrames ? 'rotate' : ''}`}>
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </div>
                    {isOpenFrames && (

                      <div class="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                        <div class="inside-drop-content">
                          <div class="flex">
                            <button className={`button ${activeComponent === 'frames' ? 'active' : ''}`} id="frames-button" onClick={showFrames}>
                              <p>Frames</p>
                            </button>
                            <button className={`button ${activeComponent === 'devices' ? 'active' : ''}`} id="devices-button" onClick={showDevices}>
                              <p>Devices</p>
                            </button>
                          </div>
                          <div id="frames-container" className={`frames-container ${activeComponent === 'frames' ? 'active' : 'inactive'}`}>
                            <button class="custom-button custom-button-1">
                              <div class="inner-div inner-div-1">
                                <div class="nested-div nested-div-1"></div>
                              </div>
                            </button>
                            <button class="custom-button-2">
                              <div class="inner-button-2">
                                <div class="nested-div-2">
                                  <div class="deep-nested-div">
                                    <div class="deepest-div"></div>
                                  </div>
                                </div>
                              </div>
                            </button>


                          </div>
                        </div>
                      </div>

                    )}
                  </button>
                </h3>
              </div>
            </div>
          </aside>




          <div className="rightpart">
            <div className="rupper">
              <div className="flex rounded">
                <div className="sticky top-0 flex flex-col w-full h-full" style={{ height: '70vh' }}>
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <button className="button undo" onClick={handleUndo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw h-4 w-4">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                          <path d="M3 3v5h5"></path>
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                          <path d="M16 16h5v5"></path>
                        </svg>
                        <span>Undo</span>
                      </button>
                      <button className="button redo" onClick={handleRedo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw h-4 w-4">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                          <path d="M21 3v5h-5"></path>
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                          <path d="M8 16H3v5"></path>
                        </svg>
                        <span>Redo</span>
                      </button>
                      <button className="button clear" onClick={handleClearAll}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 h-4 w-4">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                        <span>Clear all</span>
                      </button>
                    </div>
                  </div>

                  <div className="canvas-container">
                    <div className="canvas-content">
                      <div className="konvajs-content" role="presentation" style={{ position: 'relative', userSelect: 'none' }}>
                        {!file && <canvas width="2000" height="1125" style={{ padding: 0, margin: 0, border: 0, background: 'transparent', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}></canvas>}
                        {file && <img src={file} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}

                        {selectedContent === 'frames' && (
                          <div className="centered-content">
                            <p>Frames Content</p>
                          </div>
                        )}
                        {selectedContent === 'devices' && (
                          <div className="centered-content">
                            <p>Devices Content</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isUploaded && (
                      <div className={`upload-container ${isUploaded ? 'hidden' : ''}`} style={{ position: 'absolute' }}>
                        <div className="upload-box">
                          <div className="upload-content">
                            <button className="upload-button" onClick={handleButtonClick}>
                              <span>Choose from files</span>
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" accept=".mp4, .jpg, .jpeg, .png, .gif" onChange={handleFileUpload} />
                            <p className="upload-text">Drag and drop or click to upload</p>
                            <p className="upload-text">Accepts .jpg, .png, .gif, .mp4</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="actions-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
