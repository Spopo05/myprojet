export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('users');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };