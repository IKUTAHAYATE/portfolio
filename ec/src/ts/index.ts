import '../sass/style.scss';
import { loadFinished } from './common';
import { runAnimation } from './animation';

window.addEventListener('load', loadFinished);

document.addEventListener('DOMContentLoaded', () => {
    runAnimation();    
})