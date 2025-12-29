import React, { useRef } from 'react';
import Junimo6 from '@media/Junimo6.png';

interface ViewerProps {
    onFileChange: (file: File) => void;
    isLoading?: boolean;
    error?: string | null;
}

const Viewer = ({ onFileChange, isLoading, error }: ViewerProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
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
            </div>
            <div id="Players"></div>
        </div>
    );
};

export default Viewer;
