export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
export const uid = () => Math.random().toString(36).slice(2,9);