export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const display_score = document.getElementById('score_val')
export const restart = document.querySelector('.btn-restart');
export const startButt = document.querySelector('.btn-start')

export const cells = 20
export const W = canvas.width = 400;
export const H = canvas.height = 400;
export const cellSize = W / cells;