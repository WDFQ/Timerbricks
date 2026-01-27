import { useState } from 'react'
import './App.css'

function createTimer(name: string) {
    return {
        id: Date.now(),
        name: name,
        time: 0,
        isRunning: false,
    }
}

export default function App() {
    const [timer, setTimer] = useState([createTimer('average stopwatch')])

    function addTimer() {
        const timerArrayCopy = timer.slice()
        timerArrayCopy.push(createTimer('average stopwatch'))
        setTimer(timerArrayCopy)
    }

    function deleteTimer(id: number) {
        const updatedArray = timer.filter((item) => item.id !== id)
        setTimer(updatedArray)
    }

    // returns an add button and loops and renders entire timer grid
    return (
        <div>
            {/* <button onClick={addTimer}>+ Add timer</button> */}
            <GeneralButton btnText="add timer" onClick={addTimer} />
            <div className="timer-grid">
                {
                    /* renders each timer component */
                    timer.map((timer) => (
                        <ModuleBlock key={timer.id} name={timer.name} time={timer.time} onClick={() => deleteTimer(timer.id)} />
                    ))
                }
            </div>
        </div>
    )
}

function ModuleBlock({ name, time, onClick }: { name: string; time: number; onClick: () => void }) {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    return (
        <div className="module-block">
            <button className="delete-btn" onClick={onClick}></button>
            <span>{name}</span>
            <div className="time-container">
                <h3 className="time-text">{time}</h3>
            </div>
        </div>
    )
}
function GeneralButton({ btnText, onClick }: { btnText: string; onClick: () => void }) {
    return (
        <button className="module-btn" onClick={onClick}>
            {btnText}
        </button>
    )
}
