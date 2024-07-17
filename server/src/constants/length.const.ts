const LENGTH = {
  NAME: {
    min: 3,
    max: 25,
  },
  USERNAME: {
    min: 3,
    max: 25,
  },
  PASSWORD: {
    min: 8,
    max: 50,
  },
} as const;

export default LENGTH;
