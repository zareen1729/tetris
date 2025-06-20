# Tetris Game

A fully functional Tetris game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Classic Tetris gameplay** with all 7 tetromino pieces (I, O, T, S, Z, J, L)
- **Responsive design** that works on desktop and mobile
- **Score system** with level progression
- **Line clearing** with proper scoring (40, 100, 300, 1200 points for 1-4 lines)
- **Increasing difficulty** - pieces fall faster as level increases
- **Next piece preview**
- **Pause functionality**
- **Game over detection**
- **Smooth controls** with keyboard input

## Controls

- **← →** Move piece left/right
- **↓** Soft drop (move piece down faster)
- **↑ / Spacebar** Rotate piece
- **P** Pause/Resume game

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Rules

- **Objective**: Clear horizontal lines by filling them completely with blocks
- **Scoring**: 
  - 1 line = 40 × level points
  - 2 lines = 100 × level points  
  - 3 lines = 300 × level points
  - 4 lines (Tetris) = 1200 × level points
- **Level Up**: Every 10 lines cleared increases the level
- **Speed**: Pieces fall faster at higher levels
- **Game Over**: When pieces reach the top of the board

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   └── page.tsx             # Main page component
├── components/
│   ├── TetrisGame.tsx       # Main game logic and state
│   ├── GameBoard.tsx        # Game board rendering
│   └── GameInfo.tsx         # Score, level, next piece display
└── utils/
    └── tetris.ts            # Game constants and utilities
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management and game logic

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com/new):

```bash
npm i -g vercel
vercel
```

Enjoy playing Tetris! 🎮
