// AudioContext.js
import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';

export const AudioContext = createContext();

const PAGE_FLIP_SOUNDS = [
  '/../src/assets/sounds/pageFlips/pageFlip1.wav',
  '/../src/assets/sounds/pageFlips/pageFlip2.wav',
  '/../src/assets/sounds/pageFlips/pageFlip3.wav',
  '/../src/assets/sounds/pageFlips/pageFlip4.wav',
  '/../src/assets/sounds/pageFlips/pageFlip5.wav',
]

const BG_SOUND = '/../src/assets/sounds/ambience.mp3';

const MOON_SOUNDS = [
  '/../src/assets/sounds/moon/open.mp3',
  '/../src/assets/sounds/moon/close.wav',
]

const PENCIL_SCRATCH_SOUND = '/../src/assets/sounds/pencil1.wav';

export const AudioProvider = ({ children }) => {
  const [useSound, setUseSound] = useState(false);
  const pageFlipAudiosRef = useRef([]);
  const currentSoundIndexRef = useRef(0);
  const bgSoundRef = useRef(null);
  const moonOpenRef = useRef(null);
  const moonCloseRef = useRef(null);
  const pencilRef = useRef(null);

  

  useEffect(() => {
    // Preload all audio files
    pageFlipAudiosRef.current = PAGE_FLIP_SOUNDS.map(sound => new Audio(sound));
    bgSoundRef.current = new Audio(BG_SOUND);
    moonOpenRef.current = new Audio(MOON_SOUNDS[0]);
    moonCloseRef.current = new Audio(MOON_SOUNDS[1]);
    pencilRef.current = new Audio(PENCIL_SCRATCH_SOUND);
    pencilRef.current.loop = true;
    pencilRef.current.volume = 0.5;

    // Play background music
    bgSoundRef.current.loop = true;

    return () => {
      if (bgSoundRef.current) {
        bgSoundRef.current.pause();
        bgSoundRef.current.currentTime = 0;
      }
      if (pencilRef.current) {
        pencilRef.current.pause();
      }
    }
  }, []);

  useEffect(() => {
    if (useSound) {
      bgSoundRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else {
      bgSoundRef.current.pause();
      bgSoundRef.current.currentTime = 0;
    }
  }, [useSound]);

  useEffect(() => {
    if (useSound) {
      bgSoundRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else {
      bgSoundRef.current.pause();
      bgSoundRef.current.currentTime = 0;
    }
  }, [useSound]);

  const toggleSound = useCallback(() => {
    setUseSound(prevUseSound => !prevUseSound);
  }, []);


  const playRandomPageFlip = useCallback(() => {
    if (useSound && pageFlipAudiosRef.current.length > 0) {
      const audio = pageFlipAudiosRef.current[currentSoundIndexRef.current];
      audio.currentTime = 0; // Reset to start
      audio.volume = 0.2;
      audio.play();

      // Move to the next sound, loop back to the beginning if at the end
      currentSoundIndexRef.current = (currentSoundIndexRef.current + 1) % pageFlipAudiosRef.current.length;
    }
  }, [useSound]);

  const playMoonOpen = useCallback(() => {
    if (useSound) {
      moonOpenRef.current.currentTime = 0; // Reset to start
      moonOpenRef.current.volume = 0.06;
      moonOpenRef.current.play();
    }
  }, [useSound]);

  const playMoonClose = useCallback(() => {
    if (useSound) {
      moonCloseRef.current.currentTime = 0; // Reset to start
      moonCloseRef.current.volume = 0.03;
      moonCloseRef.current.play();
    }
  }, [useSound]);

  const playPencilScratch = useCallback(() => {
    if (useSound && pencilRef.current) {
      pencilRef.current.volume = 1;
      pencilRef.current.play().catch(e => console.error("Pencil scratch audio play failed:", e));
    }
  }, [useSound]);

  const stopPencilScratch = useCallback(() => {
    if (pencilRef.current) {
      pencilRef.current.pause();
      pencilRef.current.currentTime = 0;
    }
  }, []);


  const contextValues = {
    useSound,
    toggleSound,
    playRandomPageFlip,
    playMoonOpen,
    playMoonClose,
    playPencilScratch,
    stopPencilScratch
  };

  return (
    <AudioContext.Provider value={contextValues}>
      {children}
    </AudioContext.Provider>
  );
};