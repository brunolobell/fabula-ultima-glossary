import '@testing-library/jest-dom';

// jsdom does not implement scrolling; pages call it on navigation.
window.scrollTo = (() => {}) as typeof window.scrollTo;
