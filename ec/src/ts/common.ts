const isActive = 'is-active';
const loder = document.getElementsByClassName('c-loader');

// ローディング
export const loadFinished = () => {
    return loder[0].classList.add(isActive);
}