import '../sass/style.scss';
import { loadFinished } from './common';
import { runAnimation } from './animation';
import { page_type_criteria } from './common';
import { moreButton } from './more';

window.addEventListener('load', loadFinished);

document.addEventListener('DOMContentLoaded', () => {
    runAnimation();    
    if ( page_type_criteria.list ) {
        moreButton();
	}
})