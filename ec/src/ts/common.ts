const isActive = 'is-active';

// ページタイプの条件
const page_type = document.getElementsByTagName('body')[0].getAttribute("id");
export const page_type_criteria = {
	top: page_type === 'page-top',
	list: page_type === 'page-list',
	detail: page_type === 'page-detail'
}

// ローディング
export const loadFinished = () => {
    const loder = document.getElementsByClassName('c-loader');
    return loder[0].classList.add(isActive);
}