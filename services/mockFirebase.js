// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuth = {
  register: async (data) => {
    await delay(800);
    const user = { id: Math.random().toString(36).substr(2, 9), name: data.name, email: data.email };
    localStorage.setItem('psy_user', JSON.stringify(user));
    return user;
  },
  login: async (data) => {
    await delay(600);
    const user = { id: 'u1', name: data.email.split('@')[0], email: data.email };
    localStorage.setItem('psy_user', JSON.stringify(user));
    return user;
  },
  logout: () => {
    localStorage.removeItem('psy_user');
  },
  getCurrentUser: () => {
    const data = localStorage.getItem('psy_user');
    return data ? JSON.parse(data) : null;
  }
};

export const mockDb = {
  getFavorites: () => {
    const favs = localStorage.getItem('psy_favorites');
    return favs ? JSON.parse(favs) : [];
  },
  saveFavorite: (id, isAdding) => {
    const favs = mockDb.getFavorites();
    const updated = isAdding ? [...favs, id] : favs.filter(f => f !== id);
    localStorage.setItem('psy_favorites', JSON.stringify(updated));
    return updated;
  }
};