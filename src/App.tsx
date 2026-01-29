import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import './darkApp.css'

export default function App() {
    // create timer object with id
    const [timers, setTimers] = useState([{ id: Date.now() }])
    const [isLight, setIsLight] = useState(true)

    function addTimer() {
        const timerArrayCopy = timers.slice()
        timerArrayCopy.push({ id: Date.now() })
        setTimers(timerArrayCopy)
    }
    function deleteTimer(id: number) {
        const updatedArray = timers.filter((item) => item.id !== id)
        setTimers(updatedArray)
    }

    function switchColorModes() {
        if (isLight) {
            setIsLight(false)
        } else {
            setIsLight(true)
        }
    }

    // returns an add button and loops and renders entire timer grid
    return (
        <div className={isLight ? 'light' : 'dark'}>
            <nav className="navbar">
                <h1 className="logo">TimerBricks</h1>
                <div className="nav-controls">
                    <GeneralButton btnText="+ Add Timer" onClick={addTimer} />
                    <GeneralButton btnText={isLight ? '🌙' : '☀️'} onClick={switchColorModes} />
                </div>
            </nav>

            <div className="timer-grid">
                <AnimatePresence>
                    {
                        /* renders each timer component */
                        timers.map((timer) => (
                            <ModuleBlock key={timer.id} onClick={() => deleteTimer(timer.id)} />
                        ))
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

function ModuleBlock({ onClick }: { onClick: () => void }) {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState('Average Timer')
    function formatTime(sec: number) {
        const hours = Math.floor(sec / 3600)
        const minutes = Math.floor((sec % 3600) / 60)
        const seconds = sec % 60
        // uses 0 as filler/padding
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
    function startStopButtonOnClick() {
        setIsRunning(!isRunning)
    }
    function resetTimer() {
        setIsRunning(false)
        setSeconds(0)
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
    // render element depending on editing status
    let nameElement
    if (isEditing) {
        nameElement = (
            <input
                autoFocus
                type="text"
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setIsEditing(false)
                    }
                }}
            />
        )
    } else {
        nameElement = <h3 onClick={() => setIsEditing(true)}>{name}</h3>
    }
    return (
        <motion.div
            className="module-block"
            layout
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, layout: { duration: 0.3 } }}
        >
            <div className="x-container">
                {nameElement}
                <button className="delete-btn" onClick={onClick}>
                    x
                </button>
            </div>
            <div id="functionality-container">
                <div className="time-container">
                    <h3 className="time-text">{formattedTime}</h3>
                </div>
                <div className="btn-container">
                    <GeneralButton btnText={isRunning ? 'Stop' : 'Start'} onClick={startStopButtonOnClick} />
                    <GeneralButton btnText="Reset" onClick={resetTimer} />
                </div>
            </div>
        </motion.div>
    )
}
function GeneralButton({ btnText, onClick }: { btnText: string; onClick: () => void }) {
    return (
        <button className="module-btn" onClick={onClick}>
            {btnText}
        </button>
    )
}
