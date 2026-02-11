import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import "./App.css";

// Straw Hat Jolly Roger SVG icon
const JollyRogerIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Skull */}
    <circle cx="50" cy="52" r="22" fill="#e8d5b7" />
    <circle cx="50" cy="52" r="19" fill="#1a1a2e" />
    <circle cx="50" cy="52" r="17" fill="#e8d5b7" />
    {/* Eyes */}
    <circle cx="42" cy="50" r="5" fill="#1a1a2e" />
    <circle cx="58" cy="50" r="5" fill="#1a1a2e" />
    {/* Nose */}
    <ellipse cx="50" cy="56" rx="2" ry="1.5" fill="#1a1a2e" />
    {/* Mouth / Teeth */}
    <rect x="42" y="60" width="4" height="5" rx="1" fill="#1a1a2e" />
    <rect x="48" y="60" width="4" height="5" rx="1" fill="#1a1a2e" />
    <rect x="54" y="60" width="4" height="5" rx="1" fill="#1a1a2e" />
    {/* Crossbones */}
    <rect
      x="15"
      y="72"
      width="70"
      height="6"
      rx="3"
      fill="#e8d5b7"
      transform="rotate(-25 50 75)"
    />
    <rect
      x="15"
      y="72"
      width="70"
      height="6"
      rx="3"
      fill="#e8d5b7"
      transform="rotate(25 50 75)"
    />
    {/* Straw Hat */}
    <ellipse cx="50" cy="36" rx="28" ry="8" fill="#d4a843" />
    <rect x="34" y="22" width="32" height="16" rx="4" fill="#d4a843" />
    <rect x="36" y="28" width="28" height="4" rx="2" fill="#dc3545" />
    <path
      d="M34 36 Q50 42 66 36"
      stroke="#8b6914"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

// Compass icon for input
const CompassIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="#d4a843" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="#d4a843" />
    <polygon points="12,2 13.5,10.5 12,9 10.5,10.5" fill="#dc3545" />
    <polygon points="12,22 13.5,13.5 12,15 10.5,13.5" fill="#e8d5b7" />
    <polygon points="2,12 10.5,10.5 9,12 10.5,13.5" fill="#e8d5b7" />
    <polygon points="22,12 13.5,10.5 15,12 13.5,13.5" fill="#dc3545" />
  </svg>
);

class App extends Tasks {
  state = { tasks: [], currentTask: "" };

  render() {
    const { tasks, currentTask } = this.state;
    const completedCount = tasks.filter((t) => t.completed).length;

    return (
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <div className="header-icon">
              <JollyRogerIcon />
            </div>
            <div>
              <h1>Straw Hat TODO</h1>
              <div className="header-subtitle">Grand Line Task Manager</div>
            </div>
          </div>
        </header>

        {/* Main */}
        <div className="main-content">
          <Paper elevation={0} className="todo-container">
            {/* Input form */}
            <form onSubmit={this.handleSubmit} className="task-form">
              <div className="input-wrapper">
                <div className="input-icon">
                  <CompassIcon />
                </div>
                <TextField
                  variant="outlined"
                  size="small"
                  className="task-input"
                  value={currentTask}
                  required={true}
                  onChange={this.handleChange}
                  placeholder="Write your next adventure..."
                />
              </div>
              <Button
                className="add-task-btn"
                variant="contained"
                type="submit"
              >
                ⚓ Set Sail
              </Button>
            </form>

            {/* Task counter */}
            {tasks.length > 0 && (
              <div className="task-counter">
                <span className="counter-label">Treasure Log</span>
                <span className="counter-badge">
                  {completedCount} / {tasks.length} completed
                </span>
              </div>
            )}

            {/* Task list */}
            <div className="tasks-list">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🏴‍☠️</div>
                  <p>No adventures yet, Captain!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <Paper
                    key={task._id}
                    className={
                      "task-item" + (task.completed ? " completed-item" : "")
                    }
                    elevation={0}
                  >
                    <Checkbox
                      checked={task.completed}
                      onClick={() => this.handleUpdate(task._id)}
                      color="primary"
                    />
                    <div
                      className={
                        task.completed ? "task-text completed" : "task-text"
                      }
                    >
                      {task.task}
                    </div>
                    <Button
                      onClick={() => this.handleDelete(task._id)}
                      className="delete-task-btn"
                    >
                      ✕
                    </Button>
                  </Paper>
                ))
              )}
            </div>
          </Paper>
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-quote">
            "I'm gonna be King of the Pirates!" — Monkey D. Luffy
          </div>
          <div className="footer-credit">
            Straw Hat TODO • One Piece Edition
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
