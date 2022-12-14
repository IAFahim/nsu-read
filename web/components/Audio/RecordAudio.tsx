import React, { useState, useRef } from 'react';

export  default function RecordAudio() {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [error, setError] = useState(null);
    const audioRef = useRef();

    const startRecording = () => {
        navigator.mediaDevices
            .getUserMedia({audio: true})
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                const audioChunks = [] as any;
                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener('stop', () => {
                    const audioBlob = new Blob(audioChunks, {type: 'audio/mpeg'});
                    // @ts-ignore
                    setAudioBlob(audioBlob);

                    const audioUrl = URL.createObjectURL(audioBlob);
                    // @ts-ignore
                    audioRef.current.src = audioUrl;
                });

                setRecording(true);
                setError(null);
            })
            .catch(error => {
                setError(error);
            });
    };

    const stopRecording = () => {
        setRecording(false);
    }

    return (
        <div>
            <h1>Record Audio</h1>
            <button onClick={startRecording} disabled={recording}>Start</button>
            <button onClick={stopRecording} disabled={!recording}>Stop</button>
            <audio
            // @ts-ignore
                ref={audioRef} controls />
            {error && <p>{
            // @ts-ignore
                error.message
            }</p>}
        </div>
    );
}

