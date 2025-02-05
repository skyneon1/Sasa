import React, { useState, useRef } from 'react';
import './Main.css';

function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFrames, setIsOpenFrames] = useState(false);
    const [isOpenHighlights, setIsOpenHighlights] = useState(false);
    const [isOpenBackground, setIsOpenBackground] = useState(false);
    const [isOpenDraw, setIsOpenDraw] = useState(false);
    const [isOpenText, setIsOpenText] = useState(false);
    const [isOpenStickers, setIsOpenStickers] = useState(false);

    const [activeComponent, setActiveComponent] = useState('frames');

    const showFrames = () => setActiveComponent('frames');
    const showDevices = () => setActiveComponent('devices');


    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

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
        // setIsOpen(!isOpen);
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
    const [history, setHistory] = useState([]);
    const [redoList, setRedoList] = useState([]);

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


    return (
        <>
            <div className="main">
                <div className="container">
                    <aside>
                        <div className="inaside">
                            <div className="inaside1">
                                <div className="inaside11">
                                    <h3><button
                                        type="button"
                                        onClick={(event) => {
                                            toggleDropdown('gallery');
                                            handleDropdownClick(event);
                                        }}
                                    >
                                        <div className="insidebutton">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                                                <path d="M3.27209 18.7279L9.86863 12.1314C10.2646 11.7354 10.4627 11.5373 10.691 11.4632C10.8918 11.3979 11.1082 11.3979 11.309 11.4632C11.5373 11.5373 11.7354 11.7354 12.1314 12.1314L18.6839 18.6839M13 13L15.8686 10.1314C16.2646 9.73535 16.4627 9.53735 16.691 9.46316C16.8918 9.3979 17.1082 9.3979 17.309 9.46316C17.5373 9.53735 17.7354 9.73535 18.1314 10.1314L21 13M9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7ZM5.8 19H16.2C17.8802 19 18.7202 19 19.362 18.673C19.9265 18.3854 20.3854 17.9265 20.673 17.362C21 16.7202 21 15.8802 21 14.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <h3>Gallery</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpen ? 'rotate' : ''}`}>
                                                <path d="m6 9 6 6 6-6"></path>
                                            </svg>
                                        </div>
                                        {isOpen && (
                                            <div className="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                                                <span >Choose a file or Dropdown</span>

                                            </div>
                                        )}
                                    </button>
                                    </h3>
                                </div>
                            </div>
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
                                                                <button class="custom-button-3">
                                                                    <div class="inner-button-3">
                                                                        <div class="nested-div-3">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>

                                                                <button class="custom-button-4">
                                                                    <div class="inner-button-4">
                                                                        <div class="nested-div-4">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div></button>

                                                                <button class="custom-button-5">
                                                                    <div class="inner-button-5">
                                                                        <div class="nested-div-5">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                <button class="custom-button-6">
                                                                    <div class="inner-button-6">
                                                                        <div class="nested-div-6">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                <button class="custom-button-7">
                                                                    <div class="inner-button-7">
                                                                        <div class="nested-div-7">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                <button class="custom-button-8">
                                                                    <div class="inner-button-8">
                                                                        <div class="nested-div-8">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                <button class="custom-button-9">
                                                                    <div class="inner-button-9">
                                                                        <div class="nested-div-9">
                                                                            <div class="deep-nested-div">
                                                                                <div class="deepest-div"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                            <div id="devices-container" className={`devices-container ${activeComponent === 'devices' ? 'active' : 'inactive'}`}>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
                                                                    </div>
                                                                </button>
                                                                <button className="custom-button custom-button-1">
                                                                    <div className="inner-div inner-div-1">
                                                                        <img alt="" srcSet="" src="https://img.freepik.com/premium-photo/digital-art-selected_899870-9122.jpg?semt=ais_hybrid"></img>
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
                            
                            <div className="inaside3">
                                <div className="inaside11">
                                    <h3><button
                                                type="button"
                                                onClick={(event) => {
                                                    toggleDropdown('highlights');
                                                    handleDropdownClick(event);
                                                }}
                                            >
                                            <div className="insidebutton">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_970_2378)">
                                                        <g mask="url(#mask0_970_2378)">
                                                            <path d="M20.778 2.4927L22.8036 4.68711C23.4802 5.41995 23.4828 6.54879 22.8098 7.28487L12 19.1082L6 13.1082L18.0917 2.35995C18.8738 1.66484 20.0684 1.72386 20.778 2.4927Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M4.125 18.7332L0.703125 22.1082H5.25L6.375 20.9832L4.125 18.7332Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M6.37498 20.9832C7.06226 20.2959 8.07133 20.001 9.04348 20.244C9.93326 20.4665 10.893 20.2152 11.5616 19.5465L12 19.1082L5.99998 13.1082L5.56155 13.5465C4.90296 14.2052 4.63821 15.161 4.8641 16.0647C5.09984 17.0076 4.83354 18.0246 4.12498 18.7332C4.12029 18.7378 4.06123 18.6694 6.37498 20.9832Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M12.75 22.1082H19.5" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </g>
                                                    </g>
                                                    <defs><clipPath id="clip0_970_2378"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
                                                </svg>
                                                <h3>Highlights</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpenHighlights ? 'rotate' : ''}`}>
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </div>
                                            {isOpenHighlights && (
                                                <div className="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                                                    <span>Choose a file or Dropdown</span>
                                                </div>
                                            )}
                                        </button>
                                    </h3>
                                </div>
                            </div>

                            <div className="inaside4">
                                <div className="inaside11">
                                    <h3><button
                                                type="button"
                                                onClick={(event) => {
                                                    toggleDropdown('background');
                                                    handleDropdownClick(event);
                                                }}
                                            >
                                            <div className="insidebutton">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_9_6917)">
                                                        <path d="M19.3125 20.4375H4.6875V3.5625H19.3125V20.4375Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M4.6875 20.4375H2.8125C1.78125 20.4375 0.9375 19.5938 0.9375 18.5625V5.4375C0.9375 4.40625 1.78125 3.5625 2.8125 3.5625H4.6875" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M19.3125 3.5625H21.1875C22.2188 3.5625 23.0625 4.40625 23.0625 5.4375V18.5625C23.0625 19.5938 22.2188 20.4375 21.1875 20.4375H19.3125" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M19.3125 9.1875H23.0625" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M23.0625 14.8125H19.3125" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M4.6875 14.8125H0.9375" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M0.9375 9.1875H4.6875" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M10.125 9.1875V14.8125L14.8125 12L10.125 9.1875Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </g>
                                                    <defs><clipPath id="clip0_9_6917"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
                                                </svg>
                                                <h3>Background</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpenBackground ? 'rotate' : ''}`}>
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </div>
                                            {isOpenBackground && (
                                                <div className="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                                                    <span>Choose a file or Dropdown</span>
                                                </div>
                                            )}
                                        </button>
                                    </h3>
                                </div>
                            </div>

                            <div className="inaside5">
                                <div className="inaside11">
                                    <h3><button
                                                type="button"
                                                onClick={(event) => {
                                                    toggleDropdown('draw');
                                                    handleDropdownClick(event);
                                                }}
                                            >
                                            <div className="insidebutton">
                                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.99997 10.2221L11.7778 13.9999M6.97485 19.9748C5.60801 21.3416 3 20.9999 1 20.9999C2.0251 18.9999 0.658265 16.3919 2.0251 15.0251C3.39194 13.6582 5.60801 13.6582 6.97485 15.0251C8.34168 16.3919 8.34168 18.608 6.97485 19.9748ZM10.9216 14.9245L20.0587 5.05647C20.8635 4.1873 20.8375 2.83752 19.9999 1.99993C19.1624 1.16234 17.8126 1.13639 16.9434 1.94117L7.07534 11.0783C6.5654 11.5504 6.31043 11.7865 6.16173 12.0383C5.80514 12.6421 5.79079 13.3885 6.12391 14.0055C6.26283 14.2628 6.50853 14.5085 6.99995 14.9999C7.49136 15.4913 7.73707 15.737 7.99438 15.876C8.6114 16.2091 9.35781 16.1947 9.96157 15.8381C10.2134 15.6894 10.4494 15.4345 10.9216 14.9245Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <h3>Draw</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpenDraw ? 'rotate' : ''}`}>
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </div>
                                            {isOpenDraw && (
                                                <div className="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                                                    <span>Choose a file or Dropdown</span>
                                                </div>
                                            )}
                                        </button>
                                    </h3>
                                </div>
                            </div>

                            <div className="inaside6">
                                <div className="inaside11">
                                    <h3>
                                    <button
                                                type="button"
                                                onClick={(event) => {
                                                    toggleDropdown('text');
                                                    handleDropdownClick(event);
                                                }}
                                            >
                                            <div className="insidebutton">
                                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 5H4.2C3.0799 5 2.51984 5 2.09202 5.21799C1.71569 5.40973 1.40973 5.71569 1.21799 6.09202C1 6.51984 1 7.0799 1 8.2V11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.07989 15 4.2 15H12M16 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V11.8C21 12.9201 21 13.4802 20.782 13.908C20.5903 14.2843 20.2843 14.5903 19.908 14.782C19.4802 15 18.9201 15 17.8 15H16M16 19L16 1M18.5 1.00001L13.5 1M18.5 19L13.5 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <h3>Text</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpenText ? 'rotate' : ''}`}>
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </div>
                                            {isOpenText && (
                                                <div className="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                                                    <div className="text-container">
                                                        <div className="input-container">
                                                            <div className="input-wrapper">
                                                                <input type="text" className="input-text" placeholder="Your text here" value="" />
                                                                <button className="submit-button">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                                                                        <path d="M20 6 9 17l-5-5"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="options-container">
                                                        <div className="text-style-container">
                                                            <label className="label">Text style</label>
                                                            <div className="buttons-container">
                                                                <button className="text-style-button">Aa</button>
                                                                <button className="text-style-button">
                                                                    <div className="background-color">Aa</div>
                                                                </button>
                                                                <button className="text-style-button text-stroke">Aa</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="colors-container">
                                                        <label className="label">Colors</label>
                                                        <div className="color-buttons-container">
                                                            <button className="color-button"></button>
                                                        </div>
                                                    </div>

                                                    <div className="size-font-container">
                                                        <div className="size-container">
                                                            <label className="label">Size</label>
                                                            <div className="slider-container">
                                                                <input type="range" min="1" max="20" value="5" className="slider" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="font-container">
                                                        <label className="label">Font</label>
                                                        <button className="font-button">
                                                            <span>Satisfy</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-down">
                                                                <path d="m6 9 6 6 6-6"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </h3>
                                </div>
                            </div>

                            {/* <div className="inaside7">
                                <div className="inaside11">
                                    <h3><button
                                                type="button"
                                                onClick={(event) => {
                                                    toggleDropdown('stickers');
                                                    handleDropdownClick(event);
                                                }}
                                            >
                                            <div className="insidebutton">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <g clipPath="url(#clip0_9_6941)">
                                                        <mask id="mask0_9_6941" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                            <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white"></path>
                                                        </mask>
                                                        <g mask="url(#mask0_9_6941)">
                                                            <path d="M12 0.703127C5.78681 0.703127 0.703125 5.78681 0.703125 12C0.703125 18.2132 5.78681 23.2969 12 23.2969C12.5654 23.2969 13.121 23.2552 13.6639 23.1747L23.1747 13.6639C23.2552 13.121 23.2969 12.5654 23.2969 12C23.2969 5.78681 18.2132 0.703127 12 0.703127Z" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                                                            <path d="M13.6639 23.1747C13.4958 22.5406 13.4062 21.8745 13.4062 21.1875C13.4062 16.9159 16.9159 13.4063 21.1875 13.4063C21.8745 13.4063 22.5406 13.4958 23.1747 13.6639" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                                                            <path d="M13.7642 18.8081C13.2005 18.9537 12.6093 19.0312 12 19.0312C9.11671 19.0312 6.6388 17.2958 5.55383 14.8125" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                                                            <path d="M9.1875 9.89062C9.1875 11.0556 8.55788 12 7.78125 12C7.00462 12 6.375 11.0556 6.375 9.89062C6.375 8.72564 7.00462 7.78125 7.78125 7.78125C8.55788 7.78125 9.1875 8.72564 9.1875 9.89062Z" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                                                            <path d="M17.625 9.89062C17.625 11.0556 16.9954 12 16.2188 12C15.4421 12 14.8125 11.0556 14.8125 9.89062C14.8125 8.72564 15.4421 7.78125 16.2188 7.78125C16.9954 7.78125 17.625 8.72564 17.625 9.89062Z" stroke="black" strokeWidth="2" strokeMiterlimit="10"></path>
                                                        </g>
                                                    </g>
                                                    <defs><clipPath id="clip0_9_6941"><rect width="24" height="24" fill="white"></rect></clipPath></defs>
                                                </svg>
                                                <h3>Stickers</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${isOpenStickers ? 'rotate' : ''}`}>
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </div>
                                            {isOpenStickers && (
                                                <div className="dropdown-contents" onClick={(e) => e.stopPropagation()}>
                                                    <span>Choose a file or Dropdown</span>
                                                </div>
                                            )}
                                        </button>
                                    </h3>
                                </div>
                            </div> */}

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

