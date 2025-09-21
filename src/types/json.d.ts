// TypeScript declaration file for importing .json modules
// Allows: import data from './file.json';
declare module '*.json' {
  const value: any;
  export default value;
}
