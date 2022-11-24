import '../sass/style.scss';
import { loadFinished, page_type_criteria } from './common';
import { runAnimation } from './animation';
import { moreButton } from './more';
import { addItems } from './item';
import { storage } from './storage';

window.addEventListener('load', loadFinished);

document.addEventListener('DOMContentLoaded', () => {
    runAnimation();
    addItems();
    storage();
    
    if ( page_type_criteria.list ) {
        moreButton();
	}
})