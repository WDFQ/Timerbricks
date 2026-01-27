import { useEffect, useState } from 'react'
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
                        <ModuleBlock key={timer.id} name={timer.name} onClick={() => deleteTimer(timer.id)} />
                    ))
                }
            </div>
        </div>
    )
}

function ModuleBlock({ name, onClick }: { name: string; onClick: () => void }) {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    function formatTime(sec: number) {
        const date = new Date(sec * 1000)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}`
    }

    function startStopButtonOnClick() {
        setIsRunning(!isRunning)
    }

    // timing effect
    useEffect(() => {
        if (!isRunning) {
            return
        }

        function addSecond() {
            setSeconds((prev) => prev + 1)
        }

        // skip one second wait after btn press
        addSecond()

        // runs add second every second
        const interval = setInterval(addSecond, 1000)

        // stop setInterval from firing
        return () => {
            clearInterval(interval)
        }
    }, [isRunning])

    const formattedTime = formatTime(seconds)

    return (
        <div className="module-block">
            <button className="delete-btn" onClick={onClick}></button>
            <span>{name}</span>
            <div className="time-container">
                <h3 className="time-text">{formattedTime}</h3>
                <GeneralButton btnText={isRunning ? 'Stop' : 'Start'} onClick={startStopButtonOnClick} />
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
