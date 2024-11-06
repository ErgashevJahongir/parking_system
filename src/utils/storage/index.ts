export function loadState(key: string) {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage", error);
    return undefined;
  }
}

export function saveState<T>(key: string, state: T) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage", error);
  }
}

export function loadSessionState(key: string) {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from sessionStorage", error);
    return undefined;
  }
}

export function saveSessionState<T>(key: string, state: T) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error saving state to sessionStorage", error);
  }
}
