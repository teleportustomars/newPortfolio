import React, { useContext } from "react";
import { AudioContext } from "../../AudioContext";

const AudioController = () => {
    const { useSound, toggleSound } = useContext(AudioContext);

    return (
        <div className="audio-control">
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={useSound} 
                    onChange={toggleSound}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default AudioController;