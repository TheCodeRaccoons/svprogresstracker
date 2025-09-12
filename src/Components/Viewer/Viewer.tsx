import React, { useRef } from 'react';
import Junimo6 from '@media/Junimo6.png';
import useLoadSaveFile from '@hooks/useLoadSaveFile';

const Viewer = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fileData, isLoading, error, selectFile } = useLoadSaveFile();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            selectFile(file);
        }
    };

    return (
        <div className="file-container">
            <div className="file-instructions">
                <span className="instructions">Find your file</span>
                <div className="filepath">
                    Path: C:\Users\<span className="red-hl">Your user</span>\AppData\Roaming\StardewValley\Saves
                </div>
            </div>
            <div className="file-drop">
                <span className="instructions drop">Find your file</span>
                <div className="dropbox" id="dropbox">
                    <img src={Junimo6} alt="drop files" />
                    <div className="default">Drag & drop your save file <br /> or Click to search</div>
                    <input
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                {isLoading && <div className="loader loader-active">Loading...</div>}
                {error && <div className="error">{error}</div>}
            </div>
            <div id="Players"></div>
            {/* For now, just log the parsed JSON. You can display it here if needed. */}
            {/* {fileData && <pre>{JSON.stringify(fileData, null, 2)}</pre>} */}
        </div>
    );
};

export default Viewer;
