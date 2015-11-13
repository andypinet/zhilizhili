declare module utils {
    function css(element: any, style: any): void;
    function getElmentWidth(element: any): number;
    function getChildrenLength(element: HTMLElement): number;
    function getTranslateX(element: any): number;
    function debounce(func: any, wait: any, immediate: any): () => any;
}